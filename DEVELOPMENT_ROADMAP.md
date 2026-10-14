# DEVELOPMENT_ROADMAP — Ciudad Faro: El Último Eco

Plan incremental. Cada fase termina con: resumen de cambios, archivos modificados, instrucciones de prueba, errores conocidos y pendientes. Ninguna fase se da por terminada solo porque el código funciona.

**Meta de la primera versión de calidad:** Ciudad Faro pequeña + Desierto Solar completo + Heliostato memorable + un encuentro con Sable + una revelación. Entre 30 y 45 minutos pulidos.

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

### 1.7 Sala de pruebas
Una sala con: suelo, escalones de 1–4 tiles, huecos de 3–6 tiles, paredes para trepar, techo bajo, pinchos, enemigos de prueba de cada altura y un muñeco de prácticas.

**Criterios de aceptación de la Fase 1:**
- El disparo impacta a todos los enemigos de prueba, de pie, corriendo, en el aire y en la pared.
- Cada animación corresponde a su estado (verificado con el depurador).
- Saltar en el borde de una plataforma funciona con coyote time; pulsar salto justo antes de aterrizar salta.
- Se cruzan todos los obstáculos de la sala de pruebas sin trabarse en colisiones.
- 60 FPS estables en computadora y en un celular de gama media.
- Los controles táctiles funcionan en el nuevo formato.

---

## FASE 2 — Experiencia vertical: Desierto Solar

### 2.1 Arte necesario (lo genera el usuario con textos estándar)
| Recurso | Cantidad | Prioridad |
|---|---|---|
| Tileset del desierto (arenisca, metal, vidrio, plataformas, pinchos) | 1 hoja | Alta |
| Fondos por capas del exterior, la tormenta, las cámaras y el corazón | 4 juegos de 3–4 capas | Alta |
| Enemigos de mantenimiento solar | 5 tipos, 4–8 cuadros cada uno | Alta |
| Heliostato (2 fases, ataques, daño, derrota) | 1 hoja grande | Alta |
| Sable (retrato + sprite básico) | 1 hoja | Media |
| Robot farolero (NPC de las cámaras) | 1 hoja corta | Media |
| Retratos de diálogo (Piloto, Lira, Sable, Heliostato) | 4–8 | Media |
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

### 2.4 Decisión moral
Enviar toda la energía a Ciudad Faro de inmediato, o mantener el suministro del refugio oculto aunque la ciudad se recupere más lento. Las consecuencias se ven en la Fase 3.

**Criterios de aceptación de la Fase 2:**
- La región se juega de principio a fin en 25–40 minutos sin bloqueos.
- Los 5 enemigos y Heliostato usan arte ilustrado del mismo estilo que el piloto.
- Hay al menos 4 secretos con contenido.
- Puntos de control cada 3–5 minutos de juego.
- El progreso, las mejoras, los secretos y la decisión se guardan y se recuperan.

---

## FASE 3 — Ciudad Faro
Ciudad base pequeña: muelle, taller de Lira, plaza, Barrio Apagado. 3–5 habitantes con historias cortas. Mapa, mejoras y cambios visibles según la energía recuperada y la decisión del desierto.
**Criterio:** volver a la ciudad después del desierto muestra cambios concretos en luces, personajes y diálogos.

## FASE 4 — Mundo interconectado
Mapa global, viaje rápido entre puntos de control, segunda región (Fábrica de Engranajes recomendada) y regreso al desierto con habilidades nuevas.
**Criterio:** el validador confirma que no hay bloqueos; al menos 3 secretos del desierto solo se alcanzan al volver.

## FASE 5 — Campaña completa
Los ocho guardianes, Sable recurrente, Madre Faro, los ocho fragmentos y los dos finales. Se agregan regiones de a una, cada una con su ciclo completo de arte, enemigos, jefe y pruebas.

## FASE 6 — Pulido
Equilibrio de combate y dificultad, accesibilidad (remapeo, daño reducido, ayudas visuales), audio definitivo, efectos, tiempos de carga y estabilidad.

---

## Dependencias y orden de trabajo recomendado
1. Aprobar la escala (1.2) → sin eso no se puede pedir arte.
2. Fase 1 completa con arte provisional en la sala de pruebas.
3. En paralelo a la Fase 1: el usuario genera el tileset, el primer fondo y los 5 enemigos.
4. Fase 2 por áreas (A → B → C → D), probando cada área antes de seguir.
