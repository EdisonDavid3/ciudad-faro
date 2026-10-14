/* ---------- Nivel: Desierto Solar ---------- */
function buildLevel(){
  map = [];
  for (let y = 0; y < ROWS; y++) map.push(new Array(COLS).fill('.'));
  const fill = (x0, x1, y0, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) map[y][x] = c; };
  fill(0, COLS - 1, 10, 11, '#');
  fill(2, 4, 2, 2, '=');
  fill(14, 16, 8, 9, '#');
  fill(28, 30, 10, 11, '.');
  fill(34, 36, 9, 9, '^');
  fill(41, 44, 8, 9, '#'); fill(43, 44, 7, 7, '#');
  fill(56, 61, 10, 11, '.'); fill(58, 59, 7, 7, '=');
  fill(70, 71, 8, 9, '#');
  fill(74, 93, 6, 9, '#');
  fill(95, 98, 10, 11, '.');
  fill(108, 124, 9, 9, '^');
  fill(110, 111, 7, 7, '='); fill(115, 116, 6, 6, '='); fill(120, 121, 7, 7, '=');
  fill(131, 136, 10, 11, '.'); fill(133, 134, 8, 8, '=');
  fill(144, 146, 8, 9, '#');
  fill(150, 151, 7, 9, '#');
  fill(156, 158, 8, 9, '#');
  fill(172, 174, 3, 3, '=');
  fill(ARENA, ARENA, 0, 7, '#');
  fill(178, 179, 6, 6, '='); fill(192, 193, 6, 6, '=');
  fill(195, 195, 0, 9, '#');
  spawns = [
    {t:'walker',c:22},{t:'walker',c:38},{t:'flyer',c:50,r:5},{t:'walker',c:66},
    {t:'heal',c:76,r:5},{t:'turret',c:81,r:5},{t:'walker',c:86,r:5},{t:'turret',c:91,r:5},
    {t:'flyer',c:105,r:4},{t:'flyer',c:114,r:3},{t:'flyer',c:123,r:4},
    {t:'walker',c:127},{t:'heal',c:129},{t:'flyer',c:140,r:5},{t:'walker',c:148},
    {t:'turret',c:162},{t:'walker',c:166},{t:'flyer',c:170,r:4},{t:'heal',c:169}
  ];
}
function makeItems(){
  items = [];
  if (!save.hearts.includes('h1')) items.push({id:'h1', type:'heart', x:3*T + 2, y:2*T - 12, w:12, h:12});
  if (!save.boots) items.push({id:'boots', type:'capsule', x:173*T - 2, y:3*T - 24, w:20, h:24});
}
function makeEnemy(s){
  const x = s.c * T, r = s.r ?? 9;
  if (s.t === 'walker'){ const h = 14; return {type:'walker',x:x+1,y:(r+1)*T-h,w:14,h,vx:0,vy:0,face:-1,hp:2,flash:0,t:0}; }
  if (s.t === 'flyer'){ const y = r * T; return {type:'flyer',x,y,by:y,w:14,h:10,vx:0,vy:0,face:-1,hp:1,flash:0,t:(Math.random()*100)|0}; }
  const h = 12; return {type:'turret',x:x+1,y:(r+1)*T-h,w:14,h,face:-1,hp:3,flash:0,t:0,cd:60};
}
const makePickup = (x, y, temp, kind = 'hp') => ({x, y, w:8, h:8, vx:0, vy:temp ? -2 : 0, life:temp ? 480 : Infinity, kind});
function makePlayer(c){
  const m = maxHp();
  return {x:c*T+2,y:10*T-30,w:12,h:30,vx:0,vy:0,face:1,ground:false,hp:m,max:m,inv:0,hurt:0,
    dash:0,land:0,air:false,airUsed:false,fast:false,kick:0,wall:0,charge:0,shootT:0,anim:0,dead:false};
}
function resetStage(){
  buildLevel(); makeItems();
  pickups = [];
  enemies = spawns.filter(s => s.t !== 'heal').map(makeEnemy);
  spawns.filter(s => s.t === 'heal').forEach(s => pickups.push(makePickup(s.c*T+4, ((s.r ?? 9)+1)*T-8, false)));
  bullets = []; ebullets = []; parts = []; boss = null; bossPhase = 0; shake = 0;
  p = makePlayer(CPS[cpIdx]);
  camX = clamp(p.x + p.w/2 - W/2 + 20, 0, COLS*T - W);
}
function startStage(){
  initAudio();
  lives = 2; cpIdx = 0; deaths = 0; playFrames = 0; wIdx = 0; wEnergy.solar = 28; banner = null; paused = false;
  resetStage(); state = 'play'; syncPause(); hideOverlays(); layout(); playMusic('stage'); syncMusicVolume();
  say([
    {who:'LIRA',c:C.cyan,text:`${heroName}, ¿me escuchas? Habla Lira, desde Ciudad Faro.`},
    {who:'LIRA',c:C.cyan,text:'La Estación Solar dejó de enviar energía. Su guardián, Heliostato, no responde.'},
    {who:'LIRA',c:C.cyan,text:'Cruza el desierto hasta el núcleo. Y revisa bien cada rincón: la ingeniera escondía cosas para ti.'}
  ]);
}

