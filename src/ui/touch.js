/* ---------- Controles táctiles ---------- */
const play = document.getElementById('play'), screenEl = document.getElementById('screen'), touch = document.getElementById('touch');
const isTouch = (window.matchMedia && matchMedia('(pointer: coarse)').matches) || (navigator.maxTouchPoints || 0) > 0;
const BASE = {move:150, jump:84, shoot:74, dash:62, weapon:54};
const LABEL = {move:'Movimiento', jump:'Salto', shoot:'Disparo', dash:'Dash', weapon:'Arma'};
const RING = {jump:'#3CE6D2', shoot:'#F05A6A', dash:'#FF8C1A', weapon:'#F2B134'};
const POS_A = {
  overlay:{move:{x:.14,y:.70,s:1}, jump:{x:.91,y:.77,s:1}, shoot:{x:.78,y:.82,s:1}, dash:{x:.90,y:.48,s:1}, weapon:{x:.77,y:.55,s:1}},
  pocket:{move:{x:.27,y:.52,s:1}, jump:{x:.83,y:.56,s:1}, shoot:{x:.61,y:.75,s:1}, dash:{x:.73,y:.30,s:1}, weapon:{x:.52,y:.18,s:1}}
};
const POS_B = JSON.parse(JSON.stringify(POS_A));
POS_B.overlay.move = {x:.17,y:.66,s:1};
const PRESETS = { A:{screen:'overlay', move:'dpad', pos:POS_A}, B:{screen:'overlay', move:'float', pos:POS_B}, C:{screen:'pocket', move:'dpad', pos:POS_A} };
const CFG_KEY = 'cf-ctrl-v1';
const clone = o => JSON.parse(JSON.stringify(o));
function defaultCfg(){ return {preset:'B', screen:'auto', move:'float', size:1, opacity:.75, vibe:true, pos:clone(POS_B)}; }
let cfg = defaultCfg();
try {
  const s = JSON.parse(localStorage.getItem(CFG_KEY) || 'null');
  if (s && typeof s === 'object'){
    cfg = Object.assign(defaultCfg(), s);
    for (const m of ['overlay', 'pocket']) cfg.pos[m] = Object.assign(clone(POS_B[m]), (s.pos && s.pos[m]) || {});
  }
} catch (_) {}
function saveCfg(){ try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (_) {} }

let immersive = false, editing = false, selKey = null, curMode = 'overlay', area = {x:0, y:0, w:1, h:1}, els = {}, floatAct = null;
function sizeOf(k){ const kf = clamp(Math.min(area.w, area.h) / 360, .75, 1.3); return Math.round(BASE[k] * cfg.size * (cfg.pos[curMode][k].s || 1) * kf); }
function vibe(){ if (cfg.vibe && navigator.vibrate){ try { navigator.vibrate(12); } catch (_) {} } }
function setDir(nx){ keys.left = nx < 0 ? 1 : 0; keys.right = nx > 0 ? 1 : 0; }
function mk(tag, cls, parent){ const e = document.createElement(tag); if (cls) e.className = cls; (parent || touch).appendChild(e); return e; }
function box(el, x, y, w, h){ el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px'; }
function knob(el, x, y){ el.style.setProperty('--kx', x + 'px'); el.style.setProperty('--ky', y + 'px'); }
function stickMove(el, e){
  const R = sizeOf('move') * .32;
  let dx = e.clientX - el._cx, dy = e.clientY - el._cy;
  const d = Math.hypot(dx, dy); if (d > R){ dx *= R / d; dy *= R / d; }
  knob(el, dx, dy); const nx = dx / R; setDir(Math.abs(nx) < .3 ? 0 : nx);
}
const ARROWS = '<svg class="al" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg><svg class="ar" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>';

function layout(){
  if (!immersive){ screenEl.removeAttribute('style'); touch.innerHTML = ''; els = {}; return; }
  const W0 = play.clientWidth, H0 = play.clientHeight;
  curMode = cfg.screen === 'auto' ? (H0 > W0 ? 'pocket' : 'overlay') : cfg.screen;
  let gh = H0;
  if (curMode === 'pocket'){ gh = Math.round(Math.min(W0 * .6, H0 * .5)); area = {x:0, y:gh, w:W0, h:H0 - gh}; }
  else area = {x:0, y:0, w:W0, h:H0};
  const s = Math.min(W0 / 5, gh / 3), cw = Math.floor(s * 5), ch = Math.floor(s * 3);
  screenEl.style.left = Math.floor((W0 - cw) / 2) + 'px';
  screenEl.style.top = Math.floor((gh - ch) / 2) + 'px';
  screenEl.style.width = cw + 'px'; screenEl.style.height = ch + 'px';
  buildTouch();
}
function buildTouch(){
  touch.innerHTML = ''; els = {}; floatAct = null; setDir(0);
  touch.style.setProperty('--op', cfg.opacity);
  touch.classList.toggle('editing', editing);
  if (curMode === 'pocket'){
    const pn = mk('div', 'tpanel'); box(pn, area.x, area.y, area.w, area.h);
    mk('div', 'tlabel', pn).textContent = 'ESTACIÓN 1 · DESIERTO SOLAR';
  }
  const pb = mk('button', 'tc tpause'); pb.type = 'button'; pb.setAttribute('aria-label', 'Pausa'); pb.innerHTML = '<span></span><span></span>';
  pb.style.right = '12px'; pb.style.top = (area.y + 10) + 'px';
  pb.addEventListener('click', () => { if (!editing && state === 'play') setPause(true); });

  if (cfg.move === 'float'){
    const zone = mk('div', 'tc tzone'); box(zone, area.x, area.y + 56, area.w * .5, area.h - 56);
    const ring = mk('div', 'tc tring tfloat'); mk('div', 'knob', ring); els.move = ring;
    zone.addEventListener('pointerdown', e => {
      if (editing || floatAct !== null) return;
      e.preventDefault(); try { zone.setPointerCapture(e.pointerId); } catch (_) {}
      floatAct = e.pointerId; initAudio();
      const pr = play.getBoundingClientRect(), s = sizeOf('move');
      ring.style.left = (e.clientX - pr.left - s / 2) + 'px'; ring.style.top = (e.clientY - pr.top - s / 2) + 'px';
      ring.classList.add('act'); ring._cx = e.clientX; ring._cy = e.clientY; stickMove(ring, e);
    });
    zone.addEventListener('pointermove', e => { if (e.pointerId === floatAct) stickMove(ring, e); });
    const end = e => { if (e.pointerId !== floatAct) return; floatAct = null; ring.classList.remove('act'); knob(ring, 0, 0); setDir(0); positionAll(); };
    zone.addEventListener('pointerup', end); zone.addEventListener('pointercancel', end);
  } else if (cfg.move === 'stick'){
    const st = mk('div', 'tc tring'); mk('div', 'knob', st); els.move = st;
    st.addEventListener('pointerdown', e => {
      if (editing) return; e.preventDefault(); try { st.setPointerCapture(e.pointerId); } catch (_) {} initAudio();
      const r = st.getBoundingClientRect(); st._cx = r.left + r.width / 2; st._cy = r.top + r.height / 2; stickMove(st, e);
    });
    st.addEventListener('pointermove', e => { if (!editing && st.hasPointerCapture && st.hasPointerCapture(e.pointerId)) stickMove(st, e); });
    const end = () => { knob(st, 0, 0); setDir(0); };
    st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end);
  } else {
    const dp = mk('div', 'tc tdpad'); dp.innerHTML = ARROWS; els.move = dp;
    const h = e => {
      const r = dp.getBoundingClientRect(), dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      setDir(Math.abs(dx) < .15 ? 0 : dx); dp.classList.toggle('l', keys.left === 1); dp.classList.toggle('r', keys.right === 1);
    };
    dp.addEventListener('pointerdown', e => { if (editing) return; e.preventDefault(); try { dp.setPointerCapture(e.pointerId); } catch (_) {} initAudio(); vibe(); h(e); });
    dp.addEventListener('pointermove', e => { if (!editing && dp.hasPointerCapture && dp.hasPointerCapture(e.pointerId)) h(e); });
    const end = () => { setDir(0); dp.classList.remove('l', 'r'); };
    dp.addEventListener('pointerup', end); dp.addEventListener('pointercancel', end);
  }
  for (const k of ['jump', 'shoot', 'dash', 'weapon']){
    if (k === 'weapon' && weaponsAvail().length < 2 && !editing) continue;
    const b = mk('button', 'tc tbtn'); b.type = 'button'; b.dataset.k = k; b.textContent = LABEL[k]; b.style.setProperty('--ring', RING[k]); els[k] = b;
    b.addEventListener('pointerdown', e => {
      if (editing) return; e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (_) {}
      if (k !== 'weapon') keys[k] = 1; pressed[k] = 1; if (dialog) pressed.enter = 1;
      b.classList.add('on'); vibe(); initAudio();
    });
    const up = () => { if (k !== 'weapon') keys[k] = 0; b.classList.remove('on'); };
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, up));
    b.addEventListener('contextmenu', e => e.preventDefault());
  }
  for (const k in els) els[k].addEventListener('pointerdown', e => { if (editing) beginDrag(k, e); });
  positionAll(); markSel();
}
function positionAll(){
  for (const k in els){
    if (k === 'move' && floatAct !== null) continue;
    const el = els[k], ps = cfg.pos[curMode][k], s = sizeOf(k);
    box(el, Math.round(area.x + ps.x * area.w - s / 2), Math.round(area.y + ps.y * area.h - s / 2), s, s);
    el.style.fontSize = Math.max(11, Math.round(s * .19)) + 'px';
  }
}
function markSel(){ for (const k in els) els[k].classList.toggle('sel', editing && k === selKey); }
function beginDrag(k, e){
  e.preventDefault();
  selKey = k; markSel(); syncEditor();
  if (!ed.classList.contains('min')){ ed.classList.add('min'); document.getElementById('ed-min').textContent = 'Abrir'; }
  const el = els[k]; try { el.setPointerCapture(e.pointerId); } catch (_) {}
  const ps = cfg.pos[curMode][k], ox = e.clientX, oy = e.clientY, px = ps.x, py = ps.y;
  const mv = ev => { ps.x = clamp(px + (ev.clientX - ox) / area.w, .04, .96); ps.y = clamp(py + (ev.clientY - oy) / area.h, .04, .96); positionAll(); };
  const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); cfg.preset = 'custom'; saveCfg(); syncEditor(); };
  el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
}
function enterImmersive(){
  if (immersive) return;
  immersive = true; document.body.classList.add('immersive');
  try {
    const fs = play.requestFullscreen || play.webkitRequestFullscreen;
    if (fs){ const r = fs.call(play); if (r && r.catch) r.catch(() => {}); }
  } catch (_) {}
  layout();
}
function exitImmersive(){
  immersive = false; document.body.classList.remove('immersive');
  try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (_) {}
  layout();
}
window.addEventListener('resize', () => { if (immersive) layout(); });
document.addEventListener('fullscreenchange', () => { if (immersive) layout(); });

