/* ---------- Disparos ---------- */
function hitEnemy(e, d){
  e.hp -= d; e.flash = 6; sfx('hit');
  if (e.hp <= 0){
    e.dead = true; boom(e.x + e.w/2, e.y + e.h/2, 10); sfx('boom');
    const r = Math.random();
    if (r < 0.18) pickups.push(makePickup(e.x + 3, e.y, true, 'hp'));
    else if (save.weapons.includes('solar') && r < 0.36) pickups.push(makePickup(e.x + 3, e.y, true, 'en'));
  }
}
const ACTIVE = new Set(['idle', 'hop', 'fan', 'charge', 'stun']);
function updateBullets(){
  for (const b of bullets){
    b.x += b.vx; b.y += b.vy; b.t++;
    if (--b.life <= 0){ b.gone = true; continue; }
    if ((b.kind === 'buster' && b.l === 3) || (b.kind === 'disc' && b.t % 3 === 0)) if (b.t % 2 === 0) parts.push({x:b.x + b.w/2 - b.vx*2, y:b.y + b.h/2 + rnd(-2, 2), vx:-b.vx*.1, vy:rnd(-.3,.3), g:0, life:12, max:12, c:b.kind === 'disc' ? C.solar : C.orange, s:2});
    if (b.x < camX - 30 || b.x > camX + W + 30 || b.y < -20 || b.y > H + 20){ b.gone = true; continue; }
    if (solidAtPx(b.x + b.w/2, b.y + b.h/2)){ b.gone = true; burst(b.x + b.w/2, b.y + b.h/2, 3, [b.kind === 'disc' ? C.solar : C.cyanL]); continue; }
    for (const e of enemies){
      if (e.dead || !ov(b, e) || b.hits.has(e)) continue;
      hitEnemy(e, b.dmg);
      if (!b.pierce){ b.gone = true; break; }
      b.hits.add(e);
    }
    if (b.gone) continue;
    if (boss && ACTIVE.has(boss.st) && ov(b, boss)){
      if (boss.inv <= 0){
        boss.hp -= b.kind === 'disc' ? 1 : b.dmg; boss.inv = 10; boss.flash = 10; sfx('hit');
        if (boss.hp <= 0){ boss.hp = 0; boss.st = 'dead'; boss.t = 0; bossPhase = 2; ebullets = []; stopMusic(); }
      } else sfx('tink');
      b.gone = true;
    }
  }
  bullets = bullets.filter(b => !b.gone);
}
function updateEnemyBullets(){
  for (const b of ebullets){
    if (b.kind === 'rock') b.vy = Math.min(b.vy + .15, 4);
    b.x += b.vx; b.y += b.vy;
    if (b.kind === 'wave'){
      if (!solidAtPx(b.x + b.w/2, b.y + b.h + 2) || solidAtPx(b.vx > 0 ? b.x + b.w : b.x, b.y + b.h/2)) b.gone = true;
      if (frame % 3 === 0) parts.push({x:b.x + rnd(0, b.w), y:b.y + 2, vx:0, vy:-.4, g:0, life:14, max:14, c:'#FFD27A', s:2});
    } else if (b.y > 0 && solidAtPx(b.x + b.w/2, b.y + b.h/2)){ b.gone = true; if (b.kind === 'rock') for (let i = 0; i < 3; i++) dust(b.x + 3, b.y + 4); }
    if (b.x < camX - 40 || b.x > camX + W + 40 || b.y > H + 20 || b.y < -80) b.gone = true;
    if (!b.gone && !p.dead && ov(b, p)){ hurtPlayer(b.dmg, b.x + b.w/2); b.gone = true; }
  }
  ebullets = ebullets.filter(b => !b.gone);
}

