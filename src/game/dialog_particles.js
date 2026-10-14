/* ---------- Diálogos y avisos ---------- */
function say(lines, onEnd){ dialog = {lines, i:0, n:0, onEnd}; }
function updateDialog(){
  const d = dialog, line = d.lines[d.i];
  if (d.n < line.text.length){ d.n++; if (d.n % 3 === 0) sfx('blip'); }
  if (pressed.jump || pressed.shoot || pressed.enter){
    if (d.n < line.text.length) d.n = line.text.length;
    else { d.i++; d.n = 0; if (d.i >= d.lines.length){ const cb = d.onEnd; dialog = null; if (cb) cb(); } }
  }
}
function showBanner(t, s){ banner = {t, s, life:220}; }

/* ---------- Partículas ---------- */
function burst(x, y, n, cols, sp = 1.6){
  for (let i = 0; i < n; i++){ const a = rnd(0, Math.PI*2), s = rnd(.4, sp);
    parts.push({x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, g:.04, life:30, max:30, c:cols[i % cols.length], s:2}); }
}
const boom = (x, y, n) => burst(x, y, n, ['#FFD27A', '#FF8C1A', '#FFFFFF', '#D62839'], 2.2);
const dust = (x, y) => parts.push({x, y, vx:rnd(-.3,.3), vy:-.3, g:0, life:16, max:16, c:'#E8C29A', s:2});

