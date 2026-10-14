/* ---------- Sonido ---------- */
let actx = null, muted = false;
try { muted = localStorage.getItem('cf-muted') === '1'; } catch (_) {}
function initAudio(){
  if (!actx){ try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { actx = null; } }
  if (actx && actx.state === 'suspended') actx.resume().catch(() => {});
}
function tone(freq, dur, type, vol, slide){
  if (!actx || muted) return;
  const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, vol){
  if (!actx || muted) return;
  const len = Math.floor(actx.sampleRate * dur), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = actx.createBufferSource(), g = actx.createGain(); g.gain.value = vol;
  s.buffer = buf; s.connect(g).connect(actx.destination); s.start();
}
function sfx(n){
  switch (n){
    case 'shot': tone(880, .06, 'square', .03, -300); break;
    case 'big': tone(300, .25, 'sawtooth', .06, -150); break;
    case 'solar': tone(520, .12, 'triangle', .05, 300); break;
    case 'jump': tone(300, .1, 'square', .03, 200); break;
    case 'dash': noise(.12, .05); break;
    case 'hit': tone(220, .05, 'square', .04, -100); break;
    case 'tink': tone(1500, .04, 'square', .02); break;
    case 'hurt': tone(500, .2, 'sawtooth', .06, -400); break;
    case 'boom': noise(.3, .08); break;
    case 'land': noise(.22, .1); break;
    case 'heal': tone(600, .15, 'triangle', .05, 400); break;
    case 'charge': tone(400, .3, 'triangle', .03, 500); break;
    case 'die': tone(400, .6, 'sawtooth', .07, -350); break;
    case 'door': tone(120, .3, 'square', .06, -40); break;
    case 'eshot': tone(260, .08, 'square', .025, -80); break;
    case 'switch': tone(700, .05, 'square', .03); tone(1050, .07, 'square', .02); break;
    case 'alarm': tone(880, .16, 'square', .04, -200); break;
    case 'item': tone(500, .12, 'triangle', .06, 300); tone(750, .25, 'triangle', .05, 500); break;
    case 'blip': tone(1200, .02, 'square', .012); break;
  }
}

