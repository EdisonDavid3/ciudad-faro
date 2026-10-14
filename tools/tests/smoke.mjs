// Pruebas de humo de Ciudad Faro.
//
// Uso:
//   node smoke.mjs <index.html> [<otro index.html>]
//
// Con un archivo: ejecuta los escenarios y falla si alguno no se cumple.
// Con dos archivos: además compara capturas y estado guardado entre ambos.
// Sirve para comprobar que un cambio "sin efecto visible" no cambió nada.
//
// Determinismo: reloj falso de Playwright (performance.now, requestAnimationFrame,
// temporizadores), Math.random con semilla fija y fuentes externas bloqueadas
// (se usan las fuentes de respaldo del sistema). Resultados en tools/tests/out/.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'out');
const START = new Date('2026-01-01T12:00:00Z');

const SEED_SCRIPT = `(() => {
  let s = 0x2F6E2B1;
  Math.random = function(){ s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
})();`;

function serve(file){
  const html = fs.readFileSync(file);
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      rsp.writeHead(200, {'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store'});
      rsp.end(html);
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}

class Run {
  constructor(label){ this.label = label; this.dir = path.join(OUT, label); this.checks = []; this.shots = []; this.errors = []; }
  ok(name, cond, detail = ''){ this.checks.push({name, ok: !!cond, detail}); }
  async shot(page, name, sel = '#play'){
    const file = path.join(this.dir, name + '.png');
    if (sel) await page.locator(sel).screenshot({path: file, animations: 'disabled'});
    else await page.screenshot({path: file, animations: 'disabled'});   // pantalla visible completa
    this.shots.push(name);
    return fs.readFileSync(file);
  }
}

async function newPage(browser, opts, run, url){
  const ctx = await browser.newContext(opts);
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx.addInitScript(SEED_SCRIPT);
  const page = await ctx.newPage();
  page.on('pageerror', e => run.errors.push('pageerror: ' + e.message));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    if (/fonts\.(googleapis|gstatic)\.com/.test((m.location() || {}).url || '')) return;   // fuentes bloqueadas a propósito
    run.errors.push('console: ' + m.text());
  });
  await page.clock.install({time: START});
  await page.goto(url);
  await page.clock.pauseAt(new Date(START.getTime() + 1000));   // el tiempo solo avanza con runFor
  await page.clock.runFor(500);
  return {ctx, page};
}

const visible = (page, sel) => page.locator(sel).isVisible();
const store = page => page.evaluate(() => {
  const o = {}; for (let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o;
});

async function desktop(browser, url, run){
  const {ctx, page} = await newPage(browser, {viewport: {width: 1280, height: 900}}, run, url);
  run.ok('escritorio: carga con la pantalla de título', await visible(page, '#ov-title'));
  await run.shot(page, 'd1_titulo');

  await page.fill('#hero-name', 'Prueba');
  await page.click('#ov-title button[type=submit]');
  await page.clock.runFor(300);
  run.ok('escritorio: tras «Comenzar» aparece la selección de estaciones', await visible(page, '#ov-select'));
  run.ok('escritorio: hay 8 estaciones', (await page.locator('#stations .st').count()) === 8);
  run.ok('escritorio: el nombre se guarda en localStorage', (await store(page))['cf-name'] === 'Prueba');
  await run.shot(page, 'd2_estaciones');

  await page.locator('#stations .st').first().click();
  await page.clock.runFor(1000);
  run.ok('escritorio: la estación 1 empieza (sin overlays visibles)', !(await visible(page, '#ov-select')) && !(await visible(page, '#ov-title')));
  const s3 = await run.shot(page, 'd3_dialogo_inicial');

  for (let i = 0; i < 3; i++){ await page.keyboard.press('Enter'); await page.clock.runFor(1500); }
  await page.keyboard.down('ArrowRight'); await page.clock.runFor(1500);
  await page.keyboard.press('KeyZ'); await page.clock.runFor(400);
  await page.keyboard.press('KeyX'); await page.clock.runFor(200);
  await page.keyboard.up('ArrowRight'); await page.clock.runFor(300);
  const s4 = await run.shot(page, 'd4_tras_mover_saltar_disparar');
  run.ok('escritorio: el teclado mueve al piloto (la imagen cambia)', !s3.equals(s4));

  await page.keyboard.press('KeyP'); await page.clock.runFor(200);
  run.ok('escritorio: P abre la pausa', await visible(page, '#ov-pause'));
  await run.shot(page, 'd5_pausa');
  await page.click('#pz-resume'); await page.clock.runFor(200);
  run.ok('escritorio: «Seguir» cierra la pausa', !(await visible(page, '#ov-pause')));

  // Guardado: una partida avanzada debe leerse igual y no modificarse al cargar.
  const SAVE = JSON.stringify({cleared: [1], weapons: ['solar'], hearts: ['h1'], boots: true});
  await page.evaluate(v => localStorage.setItem('cf-save-v1', v), SAVE);
  await page.reload(); await page.clock.runFor(500);
  run.ok('escritorio: tras recargar, el nombre guardado vuelve al campo', (await page.inputValue('#hero-name')) === 'Prueba');
  await page.click('#ov-title button[type=submit]'); await page.clock.runFor(300);
  run.ok('escritorio: la estación superada aparece marcada', await page.locator('#stations .st').first().evaluate(e => e.classList.contains('done')));
  const equip = await page.textContent('#sel-equip');
  run.ok('escritorio: el equipo guardado se muestra (botas y Rayo Solar)', /Dash aéreo/.test(equip) && /Rayo Solar/.test(equip), equip);
  run.ok('escritorio: la partida guardada no cambia al cargar', (await store(page))['cf-save-v1'] === SAVE);
  await run.shot(page, 'd6_estaciones_con_guardado');
  run.storeDesktop = await store(page);
  await ctx.close();
}

async function mobile(browser, url, run){
  const opts = {viewport: {width: 844, height: 390}, isMobile: true, hasTouch: true, deviceScaleFactor: 1};
  const {ctx, page} = await newPage(browser, opts, run, url);
  run.ok('celular: carga con la pantalla de título', await visible(page, '#ov-title'));
  await page.click('#ov-title button[type=submit]'); await page.clock.runFor(300);
  run.ok('celular: entra en modo inmersivo', await page.evaluate(() => document.body.classList.contains('immersive')));
  await page.locator('#stations .st').first().click(); await page.clock.runFor(1000);
  run.ok('celular: aparecen los controles táctiles', await visible(page, '#touch'));
  const nBtn = await page.locator('#touch .tbtn').count();
  run.ok('celular: hay botones de salto, disparo y dash', nBtn >= 3, String(nBtn));
  const m1 = await run.shot(page, 'm1_juego_con_controles', null);

  const jump = page.locator('#touch .tbtn[data-k="jump"]');
  for (let i = 0; i < 3; i++){ await jump.tap(); await page.clock.runFor(1500); }   // también avanza el diálogo
  const zone = await page.locator('#touch .tzone').boundingBox();
  const cx = zone.x + zone.width * .4, cy = zone.y + zone.height * .5;
  await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.move(cx + 60, cy, {steps: 4});
  await page.clock.runFor(1200);
  const held = await page.locator('#touch .tring').evaluate(e => e.classList.contains('act'));
  await page.mouse.up(); await page.clock.runFor(300);
  run.ok('celular: el stick flotante se activa al tocar la zona', held);
  await jump.tap(); await page.clock.runFor(500);
  const m2 = await run.shot(page, 'm2_tras_stick_y_salto', null);
  run.ok('celular: los controles táctiles mueven al piloto (la imagen cambia)', !m1.equals(m2));

  await page.locator('#touch .tpause').tap(); await page.clock.runFor(200);
  run.ok('celular: el botón de pausa abre la pausa', await visible(page, '#ov-pause'));
  await page.click('#pz-edit'); await page.clock.runFor(200);
  run.ok('celular: se abre el editor de controles', await visible(page, '#editor'));
  await page.locator('#ed-size').evaluate(e => { e.value = '120'; e.dispatchEvent(new Event('input', {bubbles: true})); });
  await page.click('#ed-done'); await page.clock.runFor(200);
  const cfg = JSON.parse((await store(page))['cf-ctrl-v1'] || 'null');
  run.ok('celular: el tamaño de los controles se guarda', cfg && cfg.size === 1.2, JSON.stringify(cfg && cfg.size));
  await run.shot(page, 'm3_pausa_tras_editor', null);

  await page.reload(); await page.clock.runFor(500);
  const cfg2 = JSON.parse((await store(page))['cf-ctrl-v1'] || 'null');
  run.ok('celular: tras recargar, la configuración táctil se conserva', cfg2 && cfg2.size === 1.2);
  run.storeMobile = await store(page);
  await ctx.close();
}

async function runFile(browser, file, label){
  const run = new Run(label);
  fs.rmSync(run.dir, {recursive: true, force: true}); fs.mkdirSync(run.dir, {recursive: true});
  const srv = await serve(file);
  const url = `http://127.0.0.1:${srv.address().port}/`;
  try {
    await desktop(browser, url, run);
    await mobile(browser, url, run);
  } catch (e){
    run.ok('el escenario termina sin excepciones', false, String(e && e.stack || e));
  } finally { srv.close(); }
  run.ok('sin errores de consola ni de página', run.errors.length === 0, run.errors.join(' | '));
  return run;
}

function report(run){
  console.log(`\n== ${run.label} ==`);
  for (const c of run.checks) console.log(`${c.ok ? 'OK   ' : 'FALLA'} ${c.name}${c.detail && !c.ok ? '  → ' + c.detail : ''}`);
  return run.checks.every(c => c.ok);
}

const files = process.argv.slice(2);
if (!files.length || files.length > 2){ console.error('Uso: node smoke.mjs <index.html> [<otro index.html>]'); process.exit(2); }
const browser = await chromium.launch({args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']});
const info = {browser: 'Chromium ' + browser.version(), date: new Date().toISOString(), files};
const runs = [];
for (let i = 0; i < files.length; i++) runs.push(await runFile(browser, path.resolve(files[i]), files.length === 2 ? ['A', 'B'][i] : 'A'));
await browser.close();

let ok = true;
console.log(`${info.browser} · escritorio 1280×900 · celular 844×390 táctil`);
for (const r of runs) ok = report(r) && ok;
if (runs.length === 2){
  const [a, b] = runs;
  console.log('\n== Comparación A frente a B ==');
  for (const name of a.shots){
    const fa = path.join(a.dir, name + '.png'), fb = path.join(b.dir, name + '.png');
    const same = fs.existsSync(fb) && fs.readFileSync(fa).equals(fs.readFileSync(fb));
    console.log(`${same ? 'IGUAL ' : 'DISTINTA'} captura ${name}`); ok = ok && same;
  }
  const sd = JSON.stringify(a.storeDesktop) === JSON.stringify(b.storeDesktop);
  const sm = JSON.stringify(a.storeMobile) === JSON.stringify(b.storeMobile);
  console.log(`${sd ? 'IGUAL ' : 'DISTINTO'} localStorage (escritorio)`);
  console.log(`${sm ? 'IGUAL ' : 'DISTINTO'} localStorage (celular)`);
  ok = ok && sd && sm;
}
fs.writeFileSync(path.join(OUT, 'resultado.json'), JSON.stringify({info, ok, runs: runs.map(r => ({label: r.label, checks: r.checks, errors: r.errors, shots: r.shots}))}, null, 1));
console.log(ok ? '\nRESULTADO: todo correcto' : '\nRESULTADO: hay fallas');
process.exit(ok ? 0 : 1);
