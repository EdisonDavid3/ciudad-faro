/* ---------- Bucle principal ---------- */
let last = performance.now(), acc = 0;
const DT = 1000 / 60;
const clearPressed = () => { for (const k in pressed) pressed[k] = 0; };
function loop(now){
  requestAnimationFrame(loop);
  const dt = Math.min(250, now - last); last = now;
  if (state === 'play' && !paused){
    acc += dt; let n = 0;
    while (acc >= DT && n < 5){ step(); clearPressed(); acc -= DT; n++; if (state !== 'play') break; }
    if (n >= 5) acc = 0;
  } else { acc = 0; clearPressed(); }
  const showTouch = immersive && state === 'play';
  if (touch.hidden === showTouch) touch.hidden = !showTouch;
  if (showTouch && els.shoot && p) els.shoot.style.setProperty('--c', Math.round(Math.min(1, p.charge / 100) * 100));
  draw();
}

