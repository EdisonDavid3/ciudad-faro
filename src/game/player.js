/* ---------- Jugador y armas ---------- */
function fire(l){
  if (curWeapon() === 'solar'){ fireSolar(l >= 2); return; }
  if (l === 1 && bullets.filter(b => b.kind === 'buster' && b.l === 1).length >= 3) return;
  const d = p.face, s = [null, {w:6,h:4,v:4.5,dmg:1}, {w:12,h:8,v:5,dmg:2}, {w:20,h:14,v:5.5,dmg:4}][l];
  const bx = d > 0 ? p.x + p.w + 12 : p.x - 12 - s.w;
  bullets.push({kind:'buster', x:bx, y:p.y + 8 - s.h/2, w:s.w, h:s.h, vx:d*s.v, vy:0, dmg:s.dmg, l, pierce:l === 3, t:0, life:999, hits:new Set()});
  p.shootT = 14; sfx(l === 1 ? 'shot' : 'big');
}
function fireSolar(big){
  const cx = p.x + p.w/2 + p.face * 18, cy = p.y + 8;
  const disc = (vx, vy, dmg, life) => bullets.push({kind:'disc', x:cx - 4, y:cy - 4, w:8, h:8, vx, vy, dmg, pierce:true, t:0, life, hits:new Set()});
  if (big){
    if (wEnergy.solar < 4){ sfx('tink'); return; }
    wEnergy.solar -= 4;
    for (let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2; disc(Math.cos(a) * 3.2, Math.sin(a) * 3.2, 3, 50); }
  } else {
    if (wEnergy.solar < 1){ sfx('tink'); return; }
    if (bullets.filter(b => b.kind === 'disc').length >= 6) return;
    wEnergy.solar -= 1;
    for (const a of [-0.32, 0, 0.32]) disc(p.face * Math.cos(a) * 3.6, Math.sin(a) * 3.6, 2, 36);
  }
  p.shootT = 14; sfx('solar');
}
function hurtPlayer(d, srcX){
  if (p.inv > 0 || p.dead) return;
  p.hp -= d; p.inv = 75; p.hurt = 18;
  p.face = srcX < p.x + p.w/2 ? -1 : 1;
  p.vy = -2; p.dash = 0; p.air = false; p.fast = false; p.kick = 0; p.charge = 0;
  sfx('hurt'); burst(p.x + 5, p.y + 9, 6, [C.white, C.red]);
  if (p.hp <= 0) killPlayer();
}
function killPlayer(){
  if (p.dead) return;
  p.dead = true; p.hp = 0; deadT = 110; deaths++; sfx('die');
}
function deathBurst(){
  for (let i = 0; i < 16; i++){ const a = i / 16 * Math.PI * 2;
    parts.push({x:p.x+6, y:p.y+15, vx:Math.cos(a)*1.6, vy:Math.sin(a)*1.6, g:0, life:60, max:60, c:i%2 ? C.red : C.gold, s:3}); }
}
function afterDeath(){
  if (lives > 0){ lives--; resetStage(); playMusic('stage'); }
  else { state = 'over'; stopMusic(); showOverlay('ov-over'); }
}
function updatePlayer(){
  const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  const wasGround = p.ground;
  if (p.inv > 0) p.inv--;
  if (p.land > 0) p.land--;
  if (p.shootT > 0) p.shootT--;
  if (pressed.weapon){ const av = weaponsAvail(); if (av.length > 1){ wIdx = (wIdx + 1) % av.length; p.charge = 0; sfx('switch'); } }
  if (pressed.dash && p.hurt <= 0){
    if (p.ground){ p.dash = 24; p.air = false; p.fast = true; sfx('dash'); }
    else if (save.boots && !p.airUsed && !p.wall){ p.dash = 18; p.air = true; p.airUsed = true; p.fast = true; p.vy = 0; p.kick = 0; sfx('dash'); }
  }
  if (p.dash > 0){ p.dash--; if (!p.ground && !p.air) p.dash = 0; }
  if (p.dash <= 0) p.air = false;
  if (pressed.jump && p.hurt <= 0){
    if (p.ground){ p.vy = -5.4; p.ground = false; p.fast = p.dash > 0 || !!keys.dash; p.dash = 0; p.air = false; sfx('jump'); }
    else if (p.wall){ p.vy = -5.2; p.kick = 10; p.face = -p.wall; p.fast = !!keys.dash; p.wall = 0; sfx('jump');
      for (let i = 0; i < 3; i++) dust(p.face > 0 ? p.x : p.x + p.w, p.y + rnd(4, 16)); }
  }
  if (!keys.jump && p.vy < -1.6 && p.kick <= 0) p.vy = -1.6;
  const spd = p.fast ? 3 : 1.5;
  if (p.hurt > 0){ p.hurt--; p.vx = -p.face; }
  else if (p.kick > 0){ p.kick--; p.vx = p.face * (p.fast ? 3 : 1.8); }
  else if (p.dash > 0){ p.vx = p.face * 3.2; if (dir === -p.face){ p.dash = 0; p.air = false; } if (frame % 3 === 0) parts.push({x:p.face > 0 ? p.x : p.x + p.w, y:p.y + (p.air ? 9 : p.h - 1), vx:0, vy:0, g:0, life:12, max:12, c:p.air ? C.gold : '#E8C29A', s:2}); }
  else { p.vx = dir * spd; if (dir) p.face = dir; }
  if (p.air && p.dash > 0) p.vy = 0;
  else p.vy = Math.min(p.vy + 0.25, 5.5);
  p.wall = 0;
  if (!p.ground && dir !== 0 && p.vy > 0 && p.hurt <= 0 && p.kick <= 0 && !p.air){
    const px = dir > 0 ? p.x + p.w + 1 : p.x - 1;
    if (solidAtPx(px, p.y + 4) && solidAtPx(px, p.y + p.h - 4)){
      p.wall = dir; p.face = -dir; p.vy = Math.min(p.vy, 1.2); p.fast = false; p.airUsed = false;
      if (frame % 6 === 0) dust(dir > 0 ? p.x + p.w : p.x, p.y + p.h - 2);
    }
  }
  move(p);
  if (p.ground){ p.airUsed = false; if (p.dash <= 0) p.fast = false; if (!wasGround){ p.land = 6; dust(p.x + 2, p.y + p.h - 1); dust(p.x + p.w - 2, p.y + p.h - 1); } }
  p.anim = p.ground && p.vx !== 0 ? p.anim + 1 : 0;
  if (pressed.shoot) fire(1);
  if (keys.shoot){ p.charge++; if (p.charge === 45) sfx('charge'); }
  else { if (p.charge >= 45) fire(p.charge >= 100 ? 3 : 2); p.charge = 0; }
  if (rectScan(p.x + 1, p.y + p.h - 6, p.w - 2, 6, c => c === '^')){ hurtPlayer(4, p.x + p.w/2 + p.face); if (!p.dead) p.vy = -4; }
  if (p.y > H + 8) killPlayer();
}

