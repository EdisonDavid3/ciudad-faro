/* ---------- Jefe: Heliostato ---------- */
function startBoss(){
  bossPhase = 1;
  map[8][ARENA] = 'D'; map[9][ARENA] = 'D'; sfx('door');
  boss = {x:188*T, y:-40, w:26, h:30, vx:0, vy:0, hp:28, max:28, st:'warn', t:0, face:-1, inv:0, flash:0, ground:false, last:'', fill:0, hops:0, hvx:0};
}
function updateBoss(){
  const b = boss; if (!b) return;
  if (b.inv > 0) b.inv--; if (b.flash > 0) b.flash--;
  b.t++;
  const pc = p.x + p.w/2, bc = b.x + b.w/2, half = b.hp <= b.max / 2;
  const grav = () => { b.vy = Math.min(b.vy + .3, 7); move(b); };
  const toIdle = () => { b.st = 'idle'; b.t = 0; b.vx = 0; };
  const startHop = () => { b.vy = -6.5; b.hvx = clamp((pc - bc) / 48, -2.6, 2.6); b.t = 0; b.st = 'hop'; };
  switch (b.st){
    case 'warn': if (b.t === 1) stopMusic(); if (b.t === 60) playMusic('boss'); if (b.t % 20 === 1 && b.t < 60) sfx('alarm'); if (b.t >= 90){ b.st = 'drop'; b.t = 0; } break;
    case 'drop':
      b.vx = 0; grav();
      if (b.ground){ shake = 20; sfx('land'); b.st = 'talk';
        say([
          {who:'HELIOSTATO',c:C.orange,text:'ORDEN ANTIGUA ACTIVA. PROTEGER LA CIUDAD A CUALQUIER COSTO.'},
          {who:'HELIOSTATO',c:C.orange,text:'HUMANO CON NÚCLEO DESCONOCIDO. ELIMINAR.'},
          {who:'LIRA',c:C.cyan,text:`¡${heroName}, está fuera de control! Detenlo antes de que apague la estación.`}
        ], () => { b.st = 'fill'; b.t = 0; });
      }
      break;
    case 'fill': b.fill = Math.min(1, b.t / 45); if (b.t >= 50) toIdle(); break;
    case 'idle':
      b.vx = 0; grav(); b.face = pc < bc ? -1 : 1;
      if (b.t > (half ? 22 : 40)){
        const o = ['hop', 'fan', 'charge'].filter(s => s !== b.last), n = o[(Math.random() * o.length) | 0];
        b.last = n; b.t = 0;
        if (n === 'hop'){ b.hops = half ? 2 : 1; startHop(); } else b.st = n;
      }
      break;
    case 'hop':
      b.vx = b.hvx; grav();
      if (b.ground && b.t > 4){
        shake = 10; sfx('land');
        ebullets.push({kind:'wave', x:bc - 4, y:b.y + b.h - 10, w:8, h:10, vx:-2.2, vy:0, dmg:3});
        ebullets.push({kind:'wave', x:bc - 4, y:b.y + b.h - 10, w:8, h:10, vx:2.2, vy:0, dmg:3});
        if (--b.hops > 0) startHop(); else toIdle();
      }
      break;
    case 'fan': {
      b.vx = 0; grav();
      const shots = half ? [20, 40, 60, 80] : [20, 45, 70];
      if (shots.includes(b.t)){
        const ang = Math.atan2((p.y + 9) - (b.y + 13), pc - bc), n = half ? 7 : 5;
        for (let i = 0; i < n; i++){ const a = ang + (i - (n - 1) / 2) * .2;
          ebullets.push({kind:'orb', x:bc - 3, y:b.y + 10, w:6, h:6, vx:Math.cos(a)*1.9, vy:Math.sin(a)*1.9, dmg:2}); }
        sfx('eshot');
      }
      if (b.t > shots[shots.length - 1] + 25) toIdle();
      break;
    }
    case 'charge':
      if (b.t < 35){ b.vx = 0; grav(); if (b.t < 20) b.face = pc < bc ? -1 : 1; }
      else {
        b.vx = b.face * 4.2; grav();
        if (frame % 2 === 0) dust(bc - b.face * 12, b.y + b.h - 2);
        if (b.hitX){ shake = 16; sfx('land'); b.st = 'stun'; b.t = 0;
          for (let i = 0; i < 3; i++) ebullets.push({kind:'rock', x:(177 + rnd(1, 16)) * T, y:-10 - i * 30, w:6, h:6, vx:0, vy:0, dmg:2}); }
      }
      break;
    case 'stun': b.vx = 0; grav(); if (b.t > 45) toIdle(); break;
    case 'dead':
      b.vx = 0;
      if (b.t % 6 === 0){ boom(b.x + rnd(0, b.w), b.y + rnd(0, b.h), 6); sfx('boom'); shake = 6; }
      if (b.t === 100){ b.st = 'gone'; boom(b.x + 13, b.y + 15, 40); shake = 24; sfx('boom'); }
      break;
    case 'gone':
      if (b.t === 160) say([
        {who:'HELIOSTATO',c:C.orange,text:'...la señal... se apaga... ¿quién... eres...?'},
        {who:'LIRA',c:C.cyan,text:'¡Lo lograste! La Estación Solar vuelve a encender.'},
        {who:'LIRA',c:C.cyan,text:'La linterna de tu armadura absorbió la energía de Heliostato. Ahora puedes usar su Rayo Solar.'},
        {who:'LIRA',c:C.cyan,text:`Quedan siete estaciones, ${heroName}. Cada guardián te hará más fuerte.`}
      ], win);
      break;
  }
  if (ACTIVE.has(b.st) && !p.dead && ov(b, p)) hurtPlayer(3, bc);
}
function win(){
  state = 'win'; playMusic('win');
  const first = !save.weapons.includes('solar');
  if (!save.cleared.includes(1)) save.cleared.push(1);
  if (first) save.weapons.push('solar');
  persist();
  const s = Math.floor(playFrames / 60);
  document.getElementById('win-time').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  document.getElementById('win-deaths').textContent = deaths;
  document.getElementById('win-title').textContent = first ? 'Arma obtenida: Rayo Solar' : 'Estación Solar restaurada otra vez';
  document.getElementById('win-desc').textContent = first
    ? 'Cambia de arma con Q, E o el botón Arma. Toca disparo para un abanico de tres soles que atraviesan enemigos; mantén y suelta para la Corona solar. Gasta energía de arma.'
    : 'Prueba a terminarla más rápido o con menos caídas.';
  showOverlay('ov-win');
}

