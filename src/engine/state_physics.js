const atlasImg = new Image(); let atlasWhite = null;
atlasImg.onload = () => {
  const c = document.createElement('canvas'); c.width = atlasImg.width; c.height = atlasImg.height;
  const x = c.getContext('2d'); x.drawImage(atlasImg, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, c.width, c.height);
  atlasWhite = c;
};
atlasImg.src = ATLAS_SRC;
let map = [], spawns = [], items = [];
let p, enemies = [], bullets = [], ebullets = [], parts = [], pickups = [], boss = null, banner = null;
let camX = 0, cam = 0, cpIdx = 0, lives = 2, bossPhase = 0, frame = 0, shake = 0, deadT = 0;
let dialog = null, state = 'title', paused = false, playFrames = 0, deaths = 0;
let heroName = 'Nova', wIdx = 0;
const wEnergy = { solar: 28 };
const keys = {}, pressed = {};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const ov = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const solid = c => c === '#' || c === '=' || c === 'D';
const hsh = (x, y) => ((x * 73856093) ^ (y * 19349663)) >>> 0;
function tileC(tx, ty){ if (tx < 0 || tx >= COLS) return '#'; if (ty < 0 || ty >= ROWS) return '.'; return map[ty][tx]; }
function solidAtPx(x, y){ return solid(tileC(Math.floor(x / T), Math.floor(y / T))); }
function rectScan(x, y, w, h, test){
  const x0 = Math.floor(x / T), x1 = Math.floor((x + w - 0.01) / T), y0 = Math.floor(y / T), y1 = Math.floor((y + h - 0.01) / T);
  for (let ty = y0; ty <= y1; ty++) for (let tx = x0; tx <= x1; tx++) if (test(tileC(tx, ty))) return true;
  return false;
}
const rectSolid = (x, y, w, h) => rectScan(x, y, w, h, solid);
function move(e){
  e.hitX = 0;
  e.x += e.vx;
  if (rectSolid(e.x, e.y, e.w, e.h)){
    if (e.vx > 0){ e.x = Math.floor((e.x + e.w) / T) * T - e.w; e.hitX = 1; }
    else if (e.vx < 0){ e.x = (Math.floor(e.x / T) + 1) * T; e.hitX = -1; }
    e.vx = 0;
  }
  e.ground = false;
  e.y += e.vy;
  if (rectSolid(e.x, e.y, e.w, e.h)){
    if (e.vy > 0){ e.y = Math.floor((e.y + e.h) / T) * T - e.h; e.ground = true; }
    else if (e.vy < 0){ e.y = (Math.floor(e.y / T) + 1) * T; }
    e.vy = 0;
  }
}

