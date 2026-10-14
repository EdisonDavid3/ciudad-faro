# DEVELOPMENT_ROADMAP — Ciudad Faro: El Último Eco

Plan incremental. Cada fase termina con: resumen de cambios, archivos modificados, instrucciones de prueba, errores conocidos y pendientes. Ninguna fase se da por terminada solo porque el código funciona.

**Meta de la primera versión de calidad (hito «La primera luz»):** Ciudad Faro introductoria **antes** del Desierto Solar + Desierto Solar completo + Heliostato memorable + un encuentro con Sable + una revelación + regreso a la ciudad con cambios visibles.
**Duración objetivo (aprobada, pendiente de medir en partidas reales):** 35–45 minutos de ruta principal; 50–65 minutos con exploración opcional.
**Diseño del mundo:** `WORLD_MAP.md` y `docs/design/ISSUE-1_TOPOLOGIA_DEL_MUNDO.md` (IDs de salas, banderas y casos de prueba).

---

## FASE 0 — Auditoría ✅ (este entregable)
- TECHNICAL_AUDIT.md, GAME_BIBLE.md, WORLD_MAP.md, DEVELOPMENT_ROADMAP.md.
- Diagnóstico y propuesta del Desierto Solar.
- **Criterio:** el usuario aprueba la dirección antes de tocar el código.

---

## FASE 1 — Fundamentos

### 1.1 Estructura del proyecto
Separar el archivo único en módulos sin cambiar el comportamiento:
```
index.html
src/engine/   loop.js · input.js · camera.js · physics.js · render.js · audio.js · save.js
src/game/     player.js · weapons.js · enemies/ · bosses/ · items.js · hud.js · dialog.js
src/data/     rooms/ · enemies.json · dialogs/es.json · weapons.json
assets/       atlas/ · tilesets/ · backgrounds/ · audio/
tools/        build.py (empaqueta un solo HTML para el artefacto)
```
**Criterio:** el juego se comporta igual que antes; el artefacto se sigue publicando como un solo archivo generado.

### 1.2 Nueva escala (propuesta para aprobar)
| Valor | Actual | Propuesto |
|---|---|---|
| Resolución lógica | 320×192 (5:3) | **480×270 (16:9)** |
| Tile de colisión | 16 px | **24 px** |
| Altura visible del piloto | 43 px | **~64 px** (≈ 2,6 tiles) |
| Hitbox del piloto | 12×30 | **18×44** (en dash: 26×30) |
| Altura del salto | ~58 px (3,6 tiles) | ~96 px (4 tiles) |
| Altura del disparo | 22 px del suelo | ~30 px; enemigos de tierra ≥ 36 px de alto |

El jugador ve lo mismo del nivel (unos 20×11 tiles), pero todo está en proporción con el piloto, y el 16:9 llena mejor un celular en horizontal.

### 1.3 Sensación de control
- Aceleración y frenado (no instantáneos), con control aéreo un poco menor que en tierra.
- Coyote time: 6 cuadros. Jump buffer: 6 cuadros. Corte del salto suavizado.
- Dash con respuesta en el mismo cuadro y cancelación coherente.
- Hitbox por estado (de pie, dash, pared).
- Retroalimentación de impacto: congelado breve al golpear (2–3 cuadros), destello, retroceso, sacudida de cámara moderada.

### 1.4 Cámara
Seguimiento en ambos ejes, zona muerta, mirada hacia adelante al correr, límites por sala y transición suave entre salas.

### 1.5 Animación
Máquina de estados explícita, con cuadros, velocidad y bucle definidos en datos. Prioridades claras (daño > pared > dash > aire > suelo).

### 1.6 Herramientas de depuración (tecla F1 / botón oculto en celular)
Ver hitboxes y colisiones, estado de animación actual, puntos de aparición, límites de sala, FPS, y teletransporte a cualquier sala.

### 1.7 Datos de salas, banderas y validador de rutas
- Las salas y sus conexiones se describen en datos con los IDs estables de `WORLD_MAP.md` (`city/P1`, `desert/C3`, `link/L1`…).
- Banderas de mundo guardadas (`F_lila`, `F_intro`, `F_porton`, `F_valvula`, `F_reja`, `F_ascensor_d3`, `F_desierto`, `F_paneles`, `F_sable`…), con guardado automático al activarse.
- **Formato de guardado versionado** con migración desde las partidas actuales; nunca se rompen guardados existentes sin migrarlos.
- **Validador de rutas:** recorre el grafo para cada conjunto de habilidades y banderas y comprueba que toda sala obligatoria sea alcanzable y tenga regreso a un relé. **Hasta que se ejecute, no se afirma que no haya bloqueos.**

### 1.8 Sala de pruebas
Una sala con: suelo, escalones de 1–4 tiles, huecos de 3–6 tiles, paredes para trepar, techo bajo, pinchos, enemigos de prueba de cada altura y un muñeco de prácticas.

**Criterios de aceptación de la Fase 1:**
- El disparo impacta a todos los enemigos de prueba, de pie, corriendo, en el aire y en la pared.
- Cada animación corresponde a su estado (verificado con el depurador).
- Saltar en el borde de una plataforma funciona con coyote time; pulsar salto justo antes de aterrizar salta.
- Se cruzan todos los obstáculos de la sala de pruebas sin trabarse en colisiones.
- 60 FPS estables en computadora y en un celular de gama media.
- Los controles táctiles funcionan en el nuevo formato.
- El validador de rutas se ejecuta sobre el grafo del hito y su resultado queda registrado.
- Una partida guardada con la versión anterior se carga sin perder progreso.

---

## FASE 2 — Experiencia vertical: «La primera luz» (Ciudad introductoria + Desierto Solar)

### 2.0 Ciudad Faro introductoria (va primero)
Salas `city/T0` → `T1` → `M1` → `BA1` → `P1` → muelles, más la Cisterna (`city/CI1`). Aparecen solo Lila y Nox.
- **Encuentro obligatorio con Lila** en `city/BA1`: ruta lineal M1 → BA1 → P1 y portón M1 ↔ P1 que solo se abre desde la plaza (`F_intro` implica `F_lila`).
- **Muelle Este cerrado solo en la demo** ("barcaza en reparación"); en el diseño final está abierto tras la introducción.
- Tramo de Los Bajos `bajos/B1`–`B3` para cerrar `loop-west` (válvula de `desert/C3` + reja de `bajos/B1`).
- Regreso a la ciudad con cambios según `F_desierto` y `F_paneles`, y cameo de Silas en el primer regreso.

### 2.0b Sistemas nuevos en versión mínima (decisión del usuario, 14-10-2026)
Se incluyen en «La primera luz» **solo en versión mínima**, después de los fundamentos de la Fase 1. Los sistemas completos se diseñan en sus Issues, en este orden: #7 (carácter) → #5 (mascotas) → #6 (tiendas).

| Sistema | En el primer hito | Después (fuera del hito) |
|---|---|---|
| **Mascota** (Issue #5) | Una mascota base de diseño propio: **Núli**, de la especie Fanal (nombre y aspecto aprobados; diseño en `docs/design/ISSUE-5_MASCOTAS_EVOLUTIVAS.md`): acompaña, ataca sola, gasta energía, se cansa, se retira y descansa; IA básica robusta, animaciones legibles, guardado, celular y 60 FPS | Ocho formas desbloqueables que se alternan en relés (opción A aprobada; no hay colección), núcleos de afinidad, habilidades de exploración opcionales |
| **Tienda** (Issue #6) | Puesto de emergencia en `city/M1`, accesible desde la introducción en cualquier orden: 3–4 artículos (botiquín, mejora sencilla equilibrada, artículo para mascota, accesorio cosmético). Diseño propuesto en `docs/design/ISSUE-6_TIENDAS_ECONOMIA.md` | Mercado mayor, varias tiendas, moneda definitiva, inventario avanzado, taberna |
| **Personalidad del piloto** (Issue #7) | Humor seco, sarcasmo y relación problemática con el alcohol, moderados, en diálogos, descansos y ambientación, según GAME_BIBLE §4 (ficha y reglas) y §9 (escenas 1, 2, 3 y 5). Sin comando ni mecánica jugable de consumo; la petaca es solo un detalle visual | Taberna, alcohol como objeto del mundo, escenas opcionales completas |

**Reglas que no cambian:** beber no da ventajas, nunca es obligatorio y la dependencia no se romantiza (público adulto). Los añadidos son pequeños y no crean misiones obligatorias largas. Los nombres de especies, moneda y taberna no están aprobados.

**Prioridad y plan de contingencia:** primero control, combate, cámara, rendimiento, guardado, mapa y Heliostato. Si la mascota base compromete la estabilidad del hito, se activa en un hito inmediatamente posterior (sin posponer el sistema indefinidamente), se registra el motivo y el ajuste se somete al usuario.

### 2.1 Arte necesario (lo genera el usuario con textos estándar)
| Recurso | Cantidad | Prioridad |
|---|---|---|
| Tileset de la ciudad introductoria (pontones, metal, faroles) y de Los Bajos (B1–B3) | 1–2 hojas | Alta |
| Tileset del desierto (arenisca, metal, vidrio, plataformas, pinchos) | 1 hoja | Alta |
| Fondos por capas del exterior, la tormenta, las cámaras y el corazón | 4 juegos de 3–4 capas | Alta |
| Enemigos de mantenimiento solar | 5 tipos, 4–8 cuadros cada uno | Alta |
| Heliostato (2 fases, ataques, daño, derrota) | 1 hoja grande | Alta |
| Sable (retrato + sprite básico) | 1 hoja | Media |
| Robot farolero (NPC de las cámaras) | 1 hoja corta | Media |
| Lila, Nox, Dante y Silas (sprites de NPC; Lila según la descripción aprobada en GAME_BIBLE §4) | 4 hojas cortas | Media |
| Núli, forma base (≈ 55 cuadros: reposo, caminar, correr, saltar, atacar, cansarse, subir a la mochila, dormir), según la lámina aprobada | 1 hoja | Alta |
| Puesto de emergencia y sus 3–4 artículos (iconos) | 1 hoja corta | Media |
| Retratos de diálogo (Piloto, Lila, Nox, Dante, Silas, Sable, Heliostato) | 7–10 | Media |
| Objetos (cápsulas, núcleo, fragmento, espejos, puertas) | 1 hoja | Media |

### 2.2 Enemigos de mantenimiento solar (propuesta)
| Enemigo | Comportamiento | Lo que enseña |
|---|---|---|
| **Recolector** | Camina recogiendo arena; si te ve, embiste tras una pausa visible | Leer la anticipación y saltar |
| **Espejo errante** | Panel móvil que refleja tus disparos de frente; vulnerable por detrás | Rodear con dash o salto |
| **Dron de limpieza** | Vuela en patrones y suelta chorros de arena hacia abajo | Moverse sin quedarse quieto |
| **Concentrador** | Torreta que apunta con un láser de aviso y luego dispara un rayo | Romper la línea de tiro |
| **Escarabajo de panel** | Se esconde bajo paneles solares; sale al acercarte | Disparar abajo desde plataformas |

### 2.3 Heliostato
- **Introducción:** la estación se apaga, los paneles giran hacia ti y él desciende.
- **Diálogo previo:**
  > **Heliostato:** Reserva crítica. Prioridad: supervivencia a largo plazo.
  > **Piloto:** Curiosa forma de sobrevivir. Apagando a todos.
  > **Heliostato:** El sufrimiento inmediato es estadísticamente aceptable.
  > **Piloto:** Sí. Siempre que lo sufra otro.
- **Fase 1:** salto con ondas, abanico, embestida (los actuales, con mejor anticipación).
- **Fase 2 (50 %):** se conecta a los paneles de la arena, que concentran rayos. El jugador puede destruir paneles para debilitar ataques, pero eso reduce la energía recuperada después.
- **Tras la derrota:** descubres que protegía una reserva para un refugio que no aparece en los mapas.
- **Aviso antes de decidir:** placa en `desert/D3`, medidor "Reserva recuperable" en la fase 2 y una línea de Lila al romper el primer panel.

### 2.4 Decisión moral
Enviar toda la energía a Ciudad Faro de inmediato, o mantener el suministro del refugio oculto (Dante) aunque la ciudad se recupere más lento. Las consecuencias combinan la decisión (`F_desierto`) y los paneles intactos (`F_paneles`), y se ven al regresar a la ciudad dentro de este mismo hito.
**Posponer a Heliostato está permitido:** con `F_desierto = pendiente`, la ciudad no cambia por el desierto y la decisión sigue esperando. El hito no se considera completo sin vencerlo.

**Criterios de aceptación de la Fase 2:**
- El hito se juega de principio a fin sin bloqueos: **validador de rutas ejecutado** y una partida completa registrada.
- Ruta principal medida en una partida real (incluidos los sistemas mínimos); meta 35–45 minutos (50–65 con exploración). Si no se cumple, se informa la cifra real, no la meta.
- Casos de prueba CP-01 a CP-07 superados (encuentro con Lila, portón, válvula, reja, regreso por Los Bajos en variantes pendiente y resuelta, persistencia de banderas).
- `loop-west` funciona en ambos sentidos.
- El puesto de emergencia es accesible desde la introducción y vende sus 3–4 artículos aunque `F_desierto = pendiente`; las compras se guardan.
- La mascota base ataca, se cansa, descansa y recupera su estado tras recargar la partida, sin tapar la visión ni los controles táctiles, y sin bajar de 60 FPS en el celular de referencia (o se aplica el plan de contingencia de §2.0b).
- La personalidad del piloto aparece en diálogos y descansos sin comando ni mecánica jugable de consumo; las escenas opcionales no alteran estadísticas, salud, progreso ni finales.
- Los 5 enemigos y Heliostato usan arte ilustrado del mismo estilo que el piloto.
- Hay al menos 4 secretos con contenido.
- Puntos de control cada 3–5 minutos de juego.
- El progreso, las mejoras, los secretos, las banderas y la decisión se guardan y se recuperan.
- Los controles táctiles y el rendimiento en celular siguen funcionando en todo el hito.

---

## FASE 3 — Ciudad Faro completa
La ciudad introductoria ya existe desde la Fase 2. Aquí crece: taller de Lila, mercado abierto, habitantes con historias que avanzan entre estaciones (Silas en adelante), mapa y mejoras.
**Criterio:** cada regreso muestra cambios concretos en luces, personajes y diálogos según las banderas de las estaciones.

## FASE 4 — Mundo interconectado
Mapa global, relés del faro y viaje rápido, Muelle Este abierto, Fábrica de Engranajes, Los Bajos completo (B1–B6) con identidad propia, Plataforma Hundida y regreso al desierto con habilidades nuevas.
**Criterio:** el validador confirma que no hay bloqueos; al menos 3 secretos del desierto solo se alcanzan al volver.

## FASE 5 — Campaña completa
Los ocho guardianes, Sable recurrente (estados `F_sable`), Kaela en el Reactor Helado, Madre Faro, los ocho fragmentos y los dos finales. Se agregan regiones de a una, cada una con su ciclo completo de arte, enemigos, jefe y pruebas.

## FASE 6 — Pulido
Equilibrio de combate y dificultad, accesibilidad (remapeo, daño reducido, ayudas visuales), audio definitivo, efectos, tiempos de carga y estabilidad.

---

## Dependencias y orden de trabajo recomendado
1. Aprobar la escala (1.2) → sin eso no se puede pedir arte.
2. Fase 1 completa con arte provisional en la sala de pruebas, incluidos datos de salas, banderas, guardado versionado y validador.
3. En paralelo a la Fase 1: el usuario genera el tileset, el primer fondo y los 5 enemigos.
4. Fase 2 en orden: ciudad introductoria → Desierto por áreas (A → B → C → D) → tramo de Los Bajos → regreso a la ciudad, probando cada parte antes de seguir.
