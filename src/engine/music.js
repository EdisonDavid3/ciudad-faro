/* ---------- Música original (chiptune generado en el navegador) ---------- */
const _ = 0;
const SONGS = {
  stage: { bpm:140, loop:true, drums:true, leadType:'square', vol:.045,
    lead:[76,_,76,74,72,74,76,_, 77,_,76,74,72,_,69,_, 71,_,71,72,74,_,79,77, 76,_,_,_,74,72,71,_,
          69,72,76,81,79,76,72,76, 77,76,74,72,74,_,77,_, 76,_,72,_,79,_,76,_, 74,_,71,_,74,76,79,_],
    bass:[45,57,45,57,45,57,45,57, 41,53,41,53,41,53,41,53, 43,55,43,55,43,55,43,55, 40,52,40,52,40,52,40,52,
          45,57,45,57,45,57,45,57, 41,53,41,53,41,53,41,53, 48,60,48,60,48,60,48,60, 43,55,43,55,43,55,43,55] },
  boss: { bpm:164, loop:true, drums:true, leadType:'sawtooth', vol:.035,
    lead:[74,_,74,77,_,74,81,80, 79,_,77,_,74,_,72,_, 70,_,70,74,_,77,76,74, 73,_,76,_,79,_,81,_],
    bass:[38,38,50,38,38,50,38,50, 38,38,50,38,38,50,38,50, 34,34,46,34,34,46,34,46, 36,36,48,36,37,49,37,49] },
  select: { bpm:112, loop:true, drums:false, leadType:'triangle', vol:.06,
    lead:[69,72,76,72,69,72,76,72, 65,69,72,69,65,69,72,69, 67,71,74,71,67,71,74,71, 64,67,71,67,64,67,71,76],
    bass:[45,_,_,_,45,_,_,_, 41,_,_,_,41,_,_,_, 43,_,_,_,43,_,_,_, 40,_,_,_,40,_,_,_] },
  win: { bpm:180, loop:false, drums:false, leadType:'square', vol:.05,
    lead:[72,76,79,84,_,79,84,84, 84,_,_,_],
    bass:[48,_,55,_,60,_,48,48, 48,_,_,_] }
};
const music = { song:null, step:0, next:0, timer:null, gain:null, noiseBuf:null };
const midiHz = m => 440 * Math.pow(2, (m - 69) / 12);
function musicOut(){
  if (!actx) return null;
  if (!music.gain){ music.gain = actx.createGain(); music.gain.gain.value = muted ? 0 : 1; music.gain.connect(actx.destination); }
  if (!music.noiseBuf){
    const len = Math.floor(actx.sampleRate * .2); music.noiseBuf = actx.createBuffer(1, len, actx.sampleRate);
    const d = music.noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return music.gain;
}
function mNote(m, t, dur, type, vol){
  const out = musicOut(); if (!out) return;
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.setValueAtTime(midiHz(m), t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur * .95);
  o.connect(g).connect(out); o.start(t); o.stop(t + dur);
}
function mDrum(kind, t){
  const out = musicOut(); if (!out) return;
  if (kind === 'kick'){
    const o = actx.createOscillator(), g = actx.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + .12);
    g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(0.0001, t + .14);
    o.connect(g).connect(out); o.start(t); o.stop(t + .15);
  } else {
    const s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    s.buffer = music.noiseBuf; f.type = 'highpass'; f.frequency.value = kind === 'hat' ? 7000 : 1800;
    const len = kind === 'hat' ? .03 : .1, v = kind === 'hat' ? .025 : .07;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    s.connect(f).connect(g).connect(out); s.start(t); s.stop(t + len + .01);
  }
}
function scheduleMusic(){
  const s = SONGS[music.song]; if (!s || !actx) return;
  const dur = 60 / s.bpm / 2, n = s.lead.length;
  while (music.next < actx.currentTime + .25){
    if (!s.loop && music.step >= n){ stopMusic(); return; }
    const i = music.step % n, t = music.next;
    if (s.lead[i]) mNote(s.lead[i], t, dur * (s.lead[(i + 1) % n] ? 1 : 1.8), s.leadType, s.vol);
    if (s.bass[i % s.bass.length]) mNote(s.bass[i % s.bass.length], t, dur * .9, 'triangle', .09);
    if (s.drums){ if (i % 4 === 0) mDrum('kick', t); if (i % 4 === 2) mDrum('snare', t); mDrum('hat', t); }
    music.next += dur; music.step++;
  }
}
function playMusic(name){
  if (music.song === name && music.timer) return;
  stopMusic(); initAudio(); if (!actx) return;
  music.song = name; music.step = 0; music.next = actx.currentTime + .08;
  scheduleMusic(); music.timer = setInterval(scheduleMusic, 60);
}
function stopMusic(){ if (music.timer) clearInterval(music.timer); music.timer = null; music.song = null; }
function syncMusicVolume(){ if (music.gain) music.gain.gain.value = muted ? 0 : (paused ? .25 : 1); }

