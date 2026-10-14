/* ---------- Pantallas ---------- */
const overlays = ['ov-title', 'ov-select', 'ov-pause', 'ov-over', 'ov-win'].map(id => document.getElementById(id));
function hideOverlays(){ overlays.forEach(o => { o.hidden = true; }); }
function showOverlay(id){
  overlays.forEach(o => { o.hidden = o.id !== id; });
  const el = document.getElementById(id);
  if (el && !isTouch){ const btn = el.querySelector('.primary'); if (btn) btn.focus(); }
  syncEquip();
}
function equipText(){
  const a = ['Disparo cargado', 'Dash', 'Escalar paredes'];
  if (save.boots) a.push('Dash aéreo');
  if (save.weapons.includes('solar')) a.push('Rayo Solar');
  return 'Habilidades: ' + a.join(' · ') + '. Energía máxima: ' + maxHp() + '.';
}
function syncEquip(){ document.getElementById('sel-equip').textContent = equipText(); document.getElementById('pz-equip').textContent = equipText(); }
const STATIONS = [
  {n:1, name:'Desierto Solar', boss:'Heliostato', open:true},
  {n:2, name:'Reactor Helado'}, {n:3, name:'Plataforma Hundida'}, {n:4, name:'Invernadero Biomecánico'},
  {n:5, name:'Fábrica de Engranajes'}, {n:6, name:'Torre de Tormentas'}, {n:7, name:'Mina de Cristal'}, {n:8, name:'Estación Orbital'}
];
function showSelect(){
  state = 'select'; paused = false; dialog = null; syncPause();
  const grid = document.getElementById('stations'); grid.textContent = '';
  for (const s of STATIONS){
    const b = document.createElement('button'); b.type = 'button';
    const done = save.cleared.includes(s.n);
    b.className = 'st' + (done ? ' done' : ''); b.disabled = !s.open;
    const add = (cls, txt) => { const sp = document.createElement('span'); sp.className = cls; sp.textContent = txt; b.appendChild(sp); };
    add('st-n', String(s.n)); add('st-name', s.name); add('st-boss', s.open ? 'Guardián: ' + s.boss : 'Guardián desconocido');
    add('st-tag', !s.open ? 'Próximamente' : done ? 'Restaurada · Jugar' : 'Jugar');
    if (s.open) b.addEventListener('click', () => startStage(s.n));
    grid.appendChild(b);
  }
  document.getElementById('sel-exit').hidden = !immersive;
  showOverlay('ov-select'); playMusic('select'); syncMusicVolume();
}

const pauseBtn = document.getElementById('btn-pause');
function syncPause(){ pauseBtn.textContent = paused ? 'Seguir' : 'Pausa'; pauseBtn.setAttribute('aria-pressed', String(paused)); }
function setPause(v){
  if (state !== 'play' || paused === v) return;
  paused = v; for (const k in keys) keys[k] = 0; syncPause(); syncMusicVolume();
  if (editing) return;
  if (v) showOverlay('ov-pause'); else hideOverlays();
}
pauseBtn.addEventListener('click', () => setPause(!paused));
document.getElementById('pz-resume').addEventListener('click', () => setPause(false));
document.getElementById('pz-edit').addEventListener('click', openEditor);
document.getElementById('pz-exit').addEventListener('click', () => { paused = false; showSelect(); });
document.getElementById('sel-exit').addEventListener('click', () => { exitImmersive(); stopMusic(); state = 'title'; showOverlay('ov-title'); });
document.getElementById('btn-retry').addEventListener('click', () => startStage(1));
document.getElementById('btn-over-sel').addEventListener('click', showSelect);
document.getElementById('btn-win-sel').addEventListener('click', showSelect);
document.getElementById('btn-again').addEventListener('click', () => startStage(1));

const soundBtn = document.getElementById('btn-sound'), pzSound = document.getElementById('pz-sound');
function syncSound(){ const t = muted ? 'Sonido: no' : 'Sonido: sí'; soundBtn.textContent = t; pzSound.textContent = t; soundBtn.setAttribute('aria-pressed', String(!muted)); }
function toggleSound(){ muted = !muted; try { localStorage.setItem('cf-muted', muted ? '1' : '0'); } catch (_) {} if (!muted) initAudio(); syncSound(); syncMusicVolume(); }
soundBtn.addEventListener('click', toggleSound); pzSound.addEventListener('click', toggleSound);
syncSound();

const nameInput = document.getElementById('hero-name');
try { const saved = localStorage.getItem('cf-name'); if (saved) nameInput.value = saved; } catch (_) {}
document.getElementById('ov-title').addEventListener('submit', e => {
  e.preventDefault();
  heroName = (nameInput.value.trim() || 'Nova').slice(0, 10);
  try { localStorage.setItem('cf-name', heroName); } catch (_) {}
  initAudio();
  if (document.activeElement) document.activeElement.blur();
  if (isTouch) enterImmersive();
  showSelect();
});

const KM = {ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',KeyZ:'jump',Space:'jump',KeyK:'jump',ArrowUp:'jump',KeyW:'jump',
  KeyX:'shoot',KeyJ:'shoot',KeyC:'dash',KeyL:'dash',ShiftLeft:'dash',ShiftRight:'dash',KeyQ:'weapon',KeyE:'weapon',Enter:'enter'};
window.addEventListener('keydown', e => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
  if (state !== 'play' || editing) return;
  if (e.code === 'KeyP' || e.code === 'Escape'){ e.preventDefault(); setPause(!paused); return; }
  if (paused) return;
  const k = KM[e.code]; if (!k) return;
  e.preventDefault();
  if (!e.repeat){ keys[k] = 1; pressed[k] = 1; }
});
window.addEventListener('keyup', e => { const k = KM[e.code]; if (k) keys[k] = 0; });
window.addEventListener('blur', () => { if (!editing) setPause(true); });
document.addEventListener('visibilitychange', () => { if (document.hidden && !editing) setPause(true); });
cv.addEventListener('pointerdown', () => { if (state === 'play' && !paused && dialog) pressed.enter = 1; });

resetStage();
requestAnimationFrame(loop);
})();
