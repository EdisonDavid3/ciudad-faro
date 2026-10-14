/* ---------- Progreso guardado ---------- */
const SAVE_KEY = 'cf-save-v1';
let save = { cleared: [], weapons: [], hearts: [], boots: false };
try { const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (s && typeof s === 'object') save = Object.assign(save, s); } catch (_) {}
function persist(){ try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (_) {} }
const maxHp = () => 16 + 4 * save.hearts.length;
const weaponsAvail = () => ['base'].concat(save.weapons.includes('solar') ? ['solar'] : []);
const curWeapon = () => { const a = weaponsAvail(); return a[wIdx % a.length]; };
const weaponColor = () => curWeapon() === 'solar' ? C.solar : C.cyan;

