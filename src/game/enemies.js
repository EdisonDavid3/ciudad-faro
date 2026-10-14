/* ---------- Enemigos ---------- */
function updateEnemies(){
  for (const e of enemies){
    if (e.dead) continue;
    if (e.x < camX - 48 || e.x > camX + W + 48) continue;
    e.t++; if (e.flash > 0) e.flash--;
    if (e.type === 'walker'){
      e.vy = Math.min(e.vy + .25, 5); e.vx = e.face * .6; move(e);
      if (e.hitX) e.face *= -1;
      else if (e.ground && !solidAtPx(e.face > 0 ? e.x + e.w + 1 : e.x - 1, e.y + e.h + 2)) e.face *= -1;
      if (e.y > H + 40) e.dead = true;
    } else if (e.type === 'flyer'){
      const dx = p.x - e.x;
      if (Math.abs(dx) < 150 && !p.dead){
        e.x += Math.sign(dx) * .55; if (dx) e.face = Math.sign(dx);
        e.by = clamp(e.by + Math.sign(p.y - 4 - e.by) * .25, 24, 140);
      }
      e.y = e.by + Math.sin(e.t / 14) * 10;
    } else {
      e.face = p.x < e.x ? -1 : 1;
      e.cd--;
      if (e.cd <= 0 && Math.abs(p.x - e.x) < 200 && !p.dead){
        e.cd = 110;
        const dx = (p.x + 5) - (e.x + 7), dy = (p.y + 9) - (e.y + 4), d = Math.hypot(dx, dy) || 1;
        ebullets.push({kind:'orb', x:e.x + 4, y:e.y + 1, w:6, h:6, vx:dx/d*1.7, vy:dy/d*1.7, dmg:2}); sfx('eshot');
      }
    }
    if (!p.dead && ov(e, p)) hurtPlayer(2, e.x + e.w/2);
  }
}
function updatePickups(){
  for (const k of pickups){
    k.vy = Math.min(k.vy + .2, 4); move(k); k.life--;
    if (k.life <= 0 || k.y > H + 20) k.gone = true;
    if (!k.gone && !p.dead && ov(k, p)){
      k.gone = true;
      if (k.kind === 'en'){ wEnergy.solar = Math.min(28, wEnergy.solar + 8); sfx('heal'); burst(k.x + 4, k.y + 4, 6, [C.solar, '#FFF2C2']); }
      else { p.hp = Math.min(p.max, p.hp + 4); sfx('heal'); burst(k.x + 4, k.y + 4, 6, [C.cyan, C.cyanL]); }
    }
  }
  pickups = pickups.filter(k => !k.gone);
}
function updateParts(){
  for (const q of parts){ q.x += q.vx; q.y += q.vy; q.vy += q.g; q.life--; }
  parts = parts.filter(q => q.life > 0);
}

