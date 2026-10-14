/* ---------- Objetos secretos ---------- */
function updateItems(){
  for (const it of items){
    if (it.gone || p.dead || !ov(it, p)) continue;
    it.gone = true; sfx('item'); burst(it.x + it.w/2, it.y + it.h/2, 14, [C.gold, C.cyanL, '#FFFFFF']);
    if (it.type === 'heart'){
      save.hearts.push(it.id); persist(); p.max = maxHp(); p.hp = p.max;
      showBanner('NÚCLEO DE RESERVA', '+4 de energía máxima');
    } else {
      say([
        {who:'INGENIERA (grabación)',c:C.gold,text:'Si estás escuchando esto, el Eco ya despertó y yo ya no estoy para ayudarte.'},
        {who:'INGENIERA (grabación)',c:C.gold,text:'Te dejo unas Botas de impulso para la armadura. Pulsa Dash en el aire para avanzar sin caer.'},
        {who:'INGENIERA (grabación)',c:C.gold,text:`La armadura solo responde a ti, ${heroName}. Algún día sabrás por qué.`}
      ], () => { save.boots = true; persist(); showBanner('BOTAS DE IMPULSO', 'Dash en el aire desbloqueado'); });
    }
  }
  items = items.filter(i => !i.gone);
}

