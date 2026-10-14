/* ---------- Bucle ---------- */
function updateCamera(){
  const target = bossPhase >= 1 ? ARENA * T : p.x + p.w/2 - W/2 + p.face * 20;
  camX += (target - camX) * .1;
  camX = clamp(camX, 0, COLS * T - W);
}
function step(){
  frame++;
  if (banner && --banner.life <= 0) banner = null;
  if (dialog){ updateDialog(); return; }
  if (!p.dead) updatePlayer();
  else { if (deadT === 62 && p.y < H) { deathBurst(); sfx('boom'); } if (--deadT <= 0){ afterDeath(); return; } }
  updateBullets(); updateEnemyBullets(); updateEnemies(); updateBoss(); updatePickups(); updateItems(); updateParts();
  for (let i = cpIdx + 1; i < CPS.length; i++){
    if (p.x > CPS[i] * T){ cpIdx = i; sfx('heal'); burst(CPS[i] * T + 5, 126, 10, [C.cyan, C.cyanL]); }
  }
  if (bossPhase === 0 && !p.dead && p.x > 178 * T) startBoss();
  updateCamera();
  if (shake > 0) shake--;
  if (bossPhase < 2) playFrames++;
}

