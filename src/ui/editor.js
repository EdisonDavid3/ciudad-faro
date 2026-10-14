/* ---------- Editor de controles ---------- */
const ed = document.getElementById('editor');
const edMove = document.getElementById('ed-move'), edScreen = document.getElementById('ed-screen'), edSize = document.getElementById('ed-size'),
  edOp = document.getElementById('ed-op'), edOne = document.getElementById('ed-one'), edOneLabel = document.getElementById('ed-one-label'), edVibe = document.getElementById('ed-vibe');
function syncEditor(){
  ed.querySelectorAll('[data-preset]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.preset === cfg.preset)));
  edMove.value = cfg.move; edScreen.value = cfg.screen;
  edSize.value = Math.round(cfg.size * 100); edOp.value = Math.round(cfg.opacity * 100); edVibe.checked = !!cfg.vibe;
  if (selKey && cfg.pos[curMode][selKey]){ edOne.disabled = false; edOne.value = Math.round((cfg.pos[curMode][selKey].s || 1) * 100); edOneLabel.textContent = 'Tamaño de ' + LABEL[selKey]; }
  else { edOne.disabled = true; edOneLabel.textContent = 'Toca un control'; }
}
function openEditor(){ editing = true; selKey = null; overlays.forEach(o => { o.hidden = true; }); ed.hidden = false; ed.classList.remove('min'); buildTouch(); syncEditor(); }
function closeEditor(){ editing = false; selKey = null; ed.hidden = true; saveCfg(); buildTouch(); showOverlay('ov-pause'); }
ed.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => {
  const pr = PRESETS[b.dataset.preset];
  cfg.preset = b.dataset.preset; cfg.screen = pr.screen; cfg.move = pr.move; cfg.pos = clone(pr.pos);
  saveCfg(); layout(); syncEditor();
}));
edMove.addEventListener('change', () => { cfg.move = edMove.value; cfg.preset = 'custom'; saveCfg(); layout(); syncEditor(); });
edScreen.addEventListener('change', () => { cfg.screen = edScreen.value; cfg.preset = 'custom'; saveCfg(); layout(); syncEditor(); });
edSize.addEventListener('input', () => { cfg.size = edSize.value / 100; positionAll(); saveCfg(); });
edOp.addEventListener('input', () => { cfg.opacity = edOp.value / 100; touch.style.setProperty('--op', cfg.opacity); saveCfg(); });
edOne.addEventListener('input', () => { if (!selKey) return; cfg.pos[curMode][selKey].s = edOne.value / 100; positionAll(); saveCfg(); });
edVibe.addEventListener('change', () => { cfg.vibe = edVibe.checked; saveCfg(); });
document.getElementById('ed-reset').addEventListener('click', () => {
  const pr = PRESETS[cfg.preset] || PRESETS.B;
  cfg.pos = clone(pr.pos); cfg.size = 1; saveCfg(); layout(); syncEditor();
});
document.getElementById('ed-done').addEventListener('click', closeEditor);
document.getElementById('ed-min').addEventListener('click', e => { const m = ed.classList.toggle('min'); e.currentTarget.textContent = m ? 'Abrir' : 'Plegar'; });

