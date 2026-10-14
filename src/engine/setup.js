(() => {
'use strict';
const SCALE = 3, W = 320, H = 192, T = 16, ROWS = 12, COLS = 196;
const ARENA = 176;
const CPS = [3, 101, 172];
const C = { red:'#D62839', redD:'#8E1B2B', redL:'#F05A6A', dark:'#23262F', white:'#EDEDED', gold:'#F2B134', goldD:'#B8791C',
  cyan:'#3CE6D2', cyanL:'#B8FFF6', orange:'#FF8C1A', orangeD:'#C45F0C', solar:'#FFB347' };
const FONT = '"Pixelify Sans", ui-monospace, monospace';
const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cv = document.getElementById('game');
cv.width = W * SCALE; cv.height = H * SCALE;
const ctx = cv.getContext('2d');

