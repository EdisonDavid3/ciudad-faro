/* ---------- Dibujo ---------- */
const sky = ctx.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, '#24173A'); sky.addColorStop(.55, '#7A2E4A'); sky.addColorStop(.85, '#E0734A'); sky.addColorStop(1, '#F2A65A');
function circ(x, y, r, c){ ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
function drawBg(){
  ctx.fillStyle = sky; ctx.fillRect(-4, -4, W + 8, H + 8);
  const sx = Math.round(230 - cam * .03), sy = 96;
  circ(sx, sy, 34, '#FFD27A');
  ctx.fillStyle = sky;
  for (let i = 0; i < 6; i++) ctx.fillRect(sx - 36, sy + 6 + i * 7, 72, 1 + Math.floor(i * .6));
  ctx.fillStyle = '#8A3B4E'; ctx.beginPath(); ctx.moveTo(-4, H);
  for (let x = -4; x <= W + 4; x += 4){ const wx = x + cam * .15; ctx.lineTo(x, 118 + Math.sin(wx / 47) * 8 + Math.sin(wx / 19) * 3); }
  ctx.lineTo(W + 4, H); ctx.fill();
  const off = cam * .35; ctx.fillStyle = '#4A2238';
  for (let k = Math.floor(off / 90) - 1; k < Math.floor(off / 90) + 6; k++){
    const x = Math.round(k * 90 - off), hh = 40 + (((k * 53) % 4 + 4) % 4) * 10;
    ctx.fillRect(x + 20, 150 - hh, 4, hh);
    ctx.beginPath(); ctx.moveTo(x + 8, 150 - hh); ctx.lineTo(x + 36, 150 - hh - 8); ctx.lineTo(x + 38, 150 - hh - 2); ctx.lineTo(x + 10, 150 - hh + 6); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#5A2638'; ctx.beginPath(); ctx.moveTo(-4, H);
  for (let x = -4; x <= W + 4; x += 4){ const wx = x + cam * .55; ctx.lineTo(x, 146 + Math.sin(wx / 60) * 5); }
  ctx.lineTo(W + 4, H); ctx.fill();
  ctx.fillStyle = '#2A1420'; ctx.fillRect(-4, 168, W + 8, 30);
}
function drawTiles(){
  const c0 = Math.floor(cam / T), c1 = c0 + Math.ceil(W / T);
  for (let ty = 0; ty < ROWS; ty++) for (let tx = c0; tx <= c1; tx++){
    const ch = tileC(tx, ty); if (ch === '.') continue;
    const x = tx * T - cam, y = ty * T;
    if (ch === '#'){
      ctx.fillStyle = '#B4663A'; ctx.fillRect(x, y, T, T);
      const h = hsh(tx, ty); ctx.fillStyle = '#8C4A2A';
      ctx.fillRect(x + (h % 11) + 2, y + 5 + ((h >> 5) % 7), 3, 1);
      ctx.fillRect(x + ((h >> 9) % 10) + 1, y + 11 + ((h >> 13) % 3), 2, 1);
      ctx.fillStyle = '#9A5530'; ctx.fillRect(x, y + T - 1, T, 1);
      if (!solid(tileC(tx, ty - 1))){ ctx.fillStyle = '#E39A57'; ctx.fillRect(x, y, T, 3); ctx.fillStyle = '#F7C98A'; ctx.fillRect(x, y, T, 1); }
    } else if (ch === '='){
      ctx.fillStyle = '#3B3F52'; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = '#9AA3BF'; ctx.fillRect(x, y, T, 2);
      ctx.fillStyle = '#5D637A'; ctx.fillRect(x, y + 2, T, 1); ctx.fillRect(x + 1, y + 3, 2, 13); ctx.fillRect(x + 13, y + 3, 2, 13); ctx.fillRect(x + 3, y + 8, 10, 2);
    } else if (ch === '^'){
      ctx.fillStyle = '#5D637A'; ctx.fillRect(x, y + 14, T, 2);
      ctx.fillStyle = '#E6E6F0';
      for (let i = 0; i < 4; i++){ ctx.beginPath(); ctx.moveTo(x + i * 4, y + 14); ctx.lineTo(x + i * 4 + 2, y + 7); ctx.lineTo(x + i * 4 + 4, y + 14); ctx.fill(); }
    } else if (ch === 'D'){
      ctx.fillStyle = '#2E3245'; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = '#5D637A'; for (let k = 0; k < 4; k++) ctx.fillRect(x, y + k * 4, T, 2);
      ctx.fillStyle = '#F2B134'; ctx.fillRect(x + 6, y, 4, T);
    }
  }
}
function drawCheckpoints(){
  for (let i = 1; i < CPS.length; i++){
    const x = CPS[i] * T - cam + 4; if (x < -10 || x > W + 10) continue;
    ctx.fillStyle = '#4D5266'; ctx.fillRect(x, 128, 2, 32);
    const on = i <= cpIdx;
    ctx.fillStyle = on ? C.cyan : '#5D637A'; ctx.fillRect(x - 2, 123, 6, 5);
    if (on && (frame >> 4) % 2){ ctx.fillStyle = C.cyanL; ctx.fillRect(x, 124, 2, 2); }
  }
}
function drawItems(){
  for (const it of items){
    const x = Math.round(it.x - cam), y = Math.round(it.y + Math.sin(frame / 12) * 1.5);
    if (x < -30 || x > W + 30) continue;
    if (it.type === 'heart'){
      ctx.globalAlpha = .35 + .25 * Math.sin(frame / 8); circ(x + 6, y + 6, 9, C.cyan); ctx.globalAlpha = 1;
      ctx.fillStyle = C.gold; ctx.fillRect(x + 2, y, 8, 12); ctx.fillRect(x, y + 2, 12, 8);
      ctx.fillStyle = C.cyan; ctx.fillRect(x + 3, y + 3, 6, 6);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x + 4, y + 4, 2, 2);
    } else {
      ctx.fillStyle = '#3B3F52'; ctx.fillRect(x, y + 18, 20, 6);
      ctx.fillStyle = '#9AA3BF'; ctx.fillRect(x, y + 18, 20, 1);
      ctx.globalAlpha = .45; ctx.fillStyle = C.cyanL; ctx.fillRect(x + 3, y + 2, 14, 16); ctx.globalAlpha = 1;
      ctx.fillStyle = C.gold; ctx.fillRect(x + 2, y, 16, 2);
      if ((frame >> 3) % 2){ ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x + 9, y + 6, 2, 8); ctx.fillRect(x + 7, y + 8, 6, 2); }
    }
  }
}
function drawPickups(){
  for (const k of pickups){
    if (k.life < 120 && (frame >> 2) % 2) continue;
    const x = Math.round(k.x - cam), y = Math.round(k.y);
    if (k.kind === 'en'){
      ctx.fillStyle = C.solar; ctx.fillRect(x + 1, y, 6, 8); ctx.fillRect(x, y + 1, 8, 6);
      ctx.fillStyle = '#FFF2C2'; ctx.fillRect(x + 3, y + 2, 2, 4);
    } else {
      ctx.fillStyle = '#EDEDED'; ctx.fillRect(x, y + 1, 8, 6); ctx.fillRect(x + 1, y, 6, 8);
      ctx.fillStyle = C.cyan; ctx.fillRect(x + 3, y + 2, 2, 4); ctx.fillRect(x + 2, y + 3, 4, 2);
    }
  }
}
function drawEnemies(){
  for (const e of enemies){
    if (e.dead) continue;
    const x = Math.round(e.x - cam), y = Math.round(e.y);
    if (x < -20 || x > W + 20) continue;
    const c = k => e.flash > 0 ? '#FFFFFF' : k;
    if (e.type === 'walker'){
      circ(x + 7, y + 10, 4, c('#23262F'));
      ctx.fillStyle = c('#7A8199'); const sp = (e.t >> 3) % 2; ctx.fillRect(x + 6 + sp, y + 9, 2, 2);
      ctx.fillStyle = c('#7E8C4E'); ctx.fillRect(x + 1, y + 2, 12, 7); ctx.fillRect(x + 3, y, 8, 2);
      ctx.fillStyle = c('#A9B86A'); ctx.fillRect(x + 3, y + 1, 6, 1);
      ctx.fillStyle = c('#FF4D4D'); ctx.fillRect(e.face > 0 ? x + 9 : x + 2, y + 4, 3, 2);
    } else if (e.type === 'flyer'){
      ctx.fillStyle = c('#C8D3E8'); const rw = (frame >> 1) % 2 ? 12 : 6; ctx.fillRect(x + 7 - rw / 2, y, rw, 1); ctx.fillRect(x + 6, y + 1, 2, 2);
      ctx.fillStyle = c('#3E5C8A'); ctx.fillRect(x + 1, y + 3, 12, 6); ctx.fillRect(x + 3, y + 9, 8, 1);
      ctx.fillStyle = c('#FFD23F'); ctx.fillRect(e.face > 0 ? x + 9 : x + 2, y + 5, 3, 2);
    } else {
      ctx.fillStyle = c('#4D5266'); ctx.fillRect(x, y + 6, 14, 6);
      ctx.fillStyle = c('#7A8199'); ctx.fillRect(x + 2, y + 2, 10, 5); ctx.fillRect(x + 4, y, 6, 2);
      ctx.fillStyle = c('#23262F'); ctx.fillRect(e.face > 0 ? x + 10 : x - 2, y + 3, 6, 2);
      ctx.fillStyle = e.cd < 20 && (frame >> 2) % 2 ? '#FFFFFF' : c('#FF4D4D'); ctx.fillRect(x + 6, y + 3, 2, 2);
    }
  }
}
function drawBoss(){
  const b = boss; if (!b || b.st === 'gone' || b.st === 'warn') return;
  if (b.st === 'dead' && (frame >> 1) % 2) return;
  const x = Math.round(b.x - cam), y = Math.round(b.y), cx = x + 13, cy = y + 13;
  const white = b.flash > 0 && (b.flash >> 1) % 2 === 0;
  const col = c => white ? '#FFFFFF' : c;
  const wind = b.st === 'charge';
  const spin = wind ? frame * .35 : frame * .04;
  ctx.fillStyle = col('#FFD27A');
  for (let i = 0; i < 8; i++){ const a = spin + i * Math.PI / 4; ctx.fillRect(Math.round(cx + Math.cos(a) * 15) - 2, Math.round(cy + Math.sin(a) * 15) - 2, 4, 4); }
  ctx.fillStyle = col('#2E2A35'); ctx.fillRect(x + 4, y + 23, 6, 7); ctx.fillRect(x + 16, y + 23, 6, 7);
  ctx.fillStyle = col('#5A4F63'); ctx.fillRect(x + 3, y + 28, 8, 2); ctx.fillRect(x + 15, y + 28, 8, 2);
  circ(cx, cy, 12, col('#B8742A')); circ(cx, cy, 10, col('#E0A040')); circ(cx - 2, cy - 3, 5, col('#F4C66A'));
  ctx.fillStyle = col('#1B1620'); ctx.fillRect(x + 5, y + 10, 16, 6);
  const glow = wind && b.t < 35 && (frame >> 1) % 2;
  ctx.fillStyle = white || glow ? '#FFFFFF' : '#FF3B3B';
  ctx.fillRect(cx + b.face * 4 - 2, y + 11, 4, 4);
}
function drawPlayer(){
  if (!atlasImg.complete || !atlasImg.naturalWidth) return;
  if (p.dead && !(deadT > 62 && p.y < H)) return;
  if (!p.dead && p.inv > 0 && p.hurt <= 0 && (frame >> 2) % 2) return;
  let name;
  const shooting = p.shootT > 0 || p.charge > 12;
  if (boss && boss.st === 'gone' && p.ground) name = (frame >> 4) % 2 ? 'win1' : 'win0';
  else if (p.hurt > 0) name = p.hurt > 9 ? 'hurt0' : 'hurt1';
  else if (p.kick > 0) name = 'wallkick';
  else if (p.wall) name = shooting ? 'wallshoot' : 'wall';
  else if (p.dash > 0){
    if (p.air) name = 'airshoot';
    else { const el = 24 - p.dash; name = el < 4 ? 'dash0' : ((el >> 2) % 2 ? 'dash2' : 'dash1'); }
  }
  else if (!p.ground) name = shooting ? (p.vy < 0 ? 'jumpshoot' : 'fallshoot') : (p.vy < 0 ? 'jump' : 'leap');
  else if (p.land > 0) name = 'crouch';
  else if (p.vx !== 0) name = (shooting ? 'runshoot' : 'run') + ((p.anim >> 2) % 8);
  else if (p.charge >= 45) name = p.charge >= 100 ? 'charge2' : p.charge >= 70 ? 'charge1' : 'charge0';
  else if (shooting) name = p.shootT > 6 || p.charge > 12 ? 'shoot0' : 'shoot3';
  else name = 'idle' + ((frame >> 4) % 4);
  if (p.dead) name = 'lose';
  const m = ATLAS_META[name]; if (!m) return;
  const [sx, sy, sw, sh, ax] = m, k = 3;
  const dw = sw / k, dh = sh / k;
  const cx = Math.round(p.x - cam + p.w / 2), by = Math.round(p.y + p.h + 1);
  const face = p.wall ? -p.wall : p.face;
  const flash = p.hurt > 0 && (frame >> 1) % 2 && atlasWhite;
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.translate(cx, by);
  if (face < 0) ctx.scale(-1, 1);
  if (p.dash > 0){
    for (let g = 3; g >= 1; g--){ ctx.globalAlpha = .12 * (4 - g); ctx.drawImage(atlasImg, sx, sy, sw, sh, -ax / k - g * 7, -dh, dw, dh); }
    ctx.globalAlpha = 1;
  }
  ctx.drawImage(atlasImg, sx, sy, sw, sh, -ax / k, -dh, dw, dh);
  if (flash){ ctx.globalAlpha = .75; ctx.drawImage(atlasWhite, sx, sy, sw, sh, -ax / k, -dh, dw, dh); }
  ctx.restore();
  if (p.charge >= 45){
    const hi = p.charge >= 100, solarW = curWeapon() === 'solar';
    for (let i = 0; i < 6; i++){ ctx.fillStyle = solarW || hi ? (i % 2 ? '#FFB347' : '#FFF2C2') : (i % 2 ? C.cyan : '#E8FFFC');
      ctx.fillRect((cx + rnd(-16, 16)) | 0, (by - rnd(0, 44)) | 0, 2, 2); }
  }
}
function ell(cx, cy, rx, ry, c){ ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); }
function drawBullets(){
  for (const b of bullets){
    const cx = b.x + b.w / 2 - cam, cy = b.y + b.h / 2;
    if (b.kind === 'disc'){ circ(cx, cy, 4.5, C.solar); circ(cx, cy, 2.2, '#FFF2C2'); const a = b.t * .5; ctx.fillStyle = '#FFD27A'; ctx.fillRect(Math.round(cx + Math.cos(a) * 6) - 1, Math.round(cy + Math.sin(a) * 6) - 1, 2, 2); }
    else if (b.l === 1){ ell(cx, cy, 3, 2, C.cyan); ell(cx, cy, 1.5, 1, C.cyanL); }
    else if (b.l === 2){ ell(cx, cy, 6, 4, C.cyan); ell(cx, cy, 3.5, 2.5, '#FFFFFF'); }
    else { ell(cx, cy, 10, 7, C.orange); ell(cx, cy, 7, 5, '#FFD27A'); ell(cx, cy, 4, 3, '#FFFFFF'); }
  }
  for (const b of ebullets){
    const x = Math.round(b.x - cam), y = Math.round(b.y);
    if (b.kind === 'orb'){ circ(x + 3, y + 3, 3, '#FF5A3D'); circ(x + 3, y + 3, 1.5, '#FFE08A'); }
    else if (b.kind === 'wave'){ ctx.fillStyle = (frame >> 1) % 2 ? '#FF8C1A' : '#FFB347'; ctx.fillRect(x, y + 3, 8, 7); ctx.fillRect(x + 2, y, 4, 3); ctx.fillStyle = '#FFE08A'; ctx.fillRect(x + 3, y + 5, 2, 4); }
    else { ctx.fillStyle = '#7A4A2A'; ctx.fillRect(x, y, 6, 6); ctx.fillStyle = '#A8693E'; ctx.fillRect(x + 1, y + 1, 3, 2); }
  }
}
function drawParts(){
  for (const q of parts){ ctx.globalAlpha = Math.max(0, q.life / q.max); ctx.fillStyle = q.c; ctx.fillRect(Math.round(q.x - cam), Math.round(q.y), q.s, q.s); }
  ctx.globalAlpha = 1;
}
function drawHUD(){
  ctx.font = '8px ' + FONT; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(12,9,18,0.72)'; ctx.fillRect(4, 4, 104, 22);
  ctx.fillStyle = '#F3EADF'; ctx.fillText(heroName.toUpperCase(), 8, 6);
  ctx.fillStyle = C.orange; ctx.textAlign = 'right'; ctx.fillText('x' + lives, 104, 6); ctx.textAlign = 'left';
  const low = p.hp <= 4 && (frame >> 3) % 2, seg = Math.floor(96 / p.max);
  for (let i = 0; i < p.max; i++){ ctx.fillStyle = i < p.hp ? (low ? '#FF5A5A' : C.cyan) : '#3A2D47'; ctx.fillRect(8 + i * seg, 17, seg - 1, 5); }
  if (weaponsAvail().length > 1){
    const w = curWeapon();
    ctx.fillStyle = 'rgba(12,9,18,0.72)'; ctx.fillRect(4, 28, 104, w === 'solar' ? 20 : 13);
    ctx.fillStyle = weaponColor(); ctx.fillText(w === 'solar' ? 'RAYO SOLAR' : 'DISPARO', 8, 30);
    if (w === 'solar') for (let i = 0; i < 28; i++){ ctx.fillStyle = i < wEnergy.solar ? C.solar : '#3A2D47'; ctx.fillRect(8 + i * 3, 41, 2, 4); }
  }
  if (boss && bossPhase >= 1 && !['warn', 'drop', 'talk', 'gone'].includes(boss.st)){
    const n = boss.st === 'fill' ? Math.floor(boss.fill * boss.max) : boss.hp;
    ctx.fillStyle = 'rgba(12,9,18,0.72)'; ctx.fillRect(W - 120, 4, 116, 22);
    ctx.fillStyle = C.orange; ctx.textAlign = 'right'; ctx.fillText('HELIOSTATO', W - 8, 6); ctx.textAlign = 'left';
    for (let i = 0; i < boss.max; i++){ ctx.fillStyle = i < n ? C.orange : '#3A2D47'; ctx.fillRect(W - 116 + i * 4, 17, 3, 5); }
  }
  if (boss && boss.st === 'warn' && (frame >> 3) % 2){
    ctx.fillStyle = 'rgba(214,40,57,0.85)'; ctx.fillRect(0, 78, W, 30);
    ctx.fillStyle = '#FFFFFF'; ctx.font = '16px ' + FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('¡ALERTA!', W / 2, 93);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.font = '8px ' + FONT;
  }
  if (banner){
    ctx.globalAlpha = Math.min(1, banner.life / 20);
    ctx.fillStyle = 'rgba(12,9,18,0.86)'; ctx.fillRect(W / 2 - 100, 52, 200, 30);
    ctx.fillStyle = C.gold; ctx.fillRect(W / 2 - 100, 52, 200, 1); ctx.fillRect(W / 2 - 100, 81, 200, 1);
    ctx.textAlign = 'center'; ctx.fillText(banner.t, W / 2, 56);
    ctx.fillStyle = '#F3EADF'; ctx.fillText(banner.s, W / 2, 68);
    ctx.textAlign = 'left'; ctx.globalAlpha = 1;
  }
}
function wrap(text, maxW){
  const words = text.split(' '), out = []; let cur = '';
  for (const w of words){ const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur){ out.push(cur); cur = w; } else cur = t; }
  if (cur) out.push(cur); return out;
}
function drawDialog(){
  const d = dialog, line = d.lines[d.i];
  const bx = 8, by = 130, bw = W - 16, bh = 54;
  ctx.fillStyle = 'rgba(14,10,22,0.94)'; ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = line.c; ctx.fillRect(bx, by, bw, 1); ctx.fillRect(bx, by + bh - 1, bw, 1);
  ctx.font = '8px ' + FONT; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  ctx.fillText(line.who, bx + 8, by + 6);
  ctx.fillStyle = '#F3EADF';
  let left = d.n;
  wrap(line.text, bw - 16).forEach((s, i) => { if (left <= 0) return; ctx.fillText(s.slice(0, left), bx + 8, by + 18 + i * 10); left -= s.length + 1; });
  if (d.n >= line.text.length && (frame >> 4) % 2 === 0){
    ctx.fillStyle = line.c; ctx.beginPath(); ctx.moveTo(bx + bw - 14, by + bh - 12); ctx.lineTo(bx + bw - 8, by + bh - 9); ctx.lineTo(bx + bw - 14, by + bh - 6); ctx.fill();
  }
}
function draw(){
  cam = Math.round(camX);
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.imageSmoothingEnabled = false;
  let ox = 0, oy = 0;
  if (shake > 0 && !RM){ ox = (Math.random() * 4 - 2) | 0; oy = (Math.random() * 4 - 2) | 0; }
  ctx.save(); ctx.translate(ox, oy);
  drawBg(); drawTiles(); drawCheckpoints(); drawItems(); drawPickups(); drawEnemies(); drawBoss(); drawPlayer(); drawBullets(); drawParts();
  ctx.restore();
  if (state === 'play'){ drawHUD(); if (dialog) drawDialog(); }
}

