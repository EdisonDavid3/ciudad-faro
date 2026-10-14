# TECHNICAL_AUDIT — Ciudad Faro: El Último Eco

Fase 0. Estado del proyecto al 14/10/2026 (commit `493e5d0`). Este documento describe lo que existe, sin cambios al código.

---

## 1. Resumen ejecutivo

El juego funciona y es jugable de principio a fin en una estación. Tiene buenas bases de control (dash, pared, disparo cargado), un jefe con estados, guardado, música propia y controles táctiles editables.

Pero está construido como **un prototipo de un solo archivo**, con un **nivel lineal horizontal de altura fija** y un **mundo dibujado a una escala que ya no corresponde al protagonista**. Los tres problemas impiden crecer hacia un Metroidvania sin una refactorización previa.

**Recomendación:** conservar el motor propio (Canvas 2D + JavaScript, sin dependencias) y **evolucionarlo**, no migrar de motor. Separar en módulos, cambiar la escala del mundo y reemplazar el nivel lineal por un sistema de **salas conectadas**.

---

## 2. Arquitectura actual

| Sistema | Implementación actual | Estado |
|---|---|---|
| Distribución | Un archivo HTML de 554 KB (1 391 líneas), con el atlas del piloto embebido en base64. Se publica como artefacto y como `index.html` en GitHub (`EdisonDavid3/ciudad-faro`). | Funciona, pero no escala |
| Render | Canvas 2D. Mundo lógico de 320×192 px escalado ×3. Escenario en pixel art dibujado por código (rectángulos). Piloto HD dibujado con suavizado. | Mezcla de estilos |
| Bucle | Paso fijo a 60 Hz con acumulador (máx. 5 pasos por cuadro). | Bien |
| Físicas | Gravedad 0,25; caída máx. 5,5; salto −5,4 con corte a −1,6; carrera 1,5 / rápida 3; dash 24 cuadros a 3,2; deslizamiento en pared 1,2; impulso de pared 10 cuadros. | Funcional, sin pulir |
| Colisiones | Cuadrícula de tiles de 16 px (`#` sólido, `=` plataforma, `^` pinchos, `D` puerta). AABB contra tiles, eje X y luego Y. | Bien, pero acoplada al arte |
| Nivel | Generado en código (`buildLevel`): **196 × 12 tiles**, una sola franja horizontal. | **Bloqueante** para Metroidvania |
| Cámara | Seguimiento horizontal con suavizado; fija en vertical; bloqueo en la arena del jefe. | Insuficiente |
| Animación | Atlas WebP (47 cuadros, 5 639×135 px) + metadatos `[x, y, w, h, ancla]`. Selección de cuadro por condiciones dentro de `drawPlayer`. | Funciona; falta máquina de estados |
| Enemigos | 3 tipos hardcodeados (rodador, dron, torreta) con lógica en un `if/else`. | Rudimentario |
| Jefe | Heliostato: máquina de estados (`warn → drop → talk → fill → idle/hop/fan/charge/stun → dead → gone`). | Buena base |
| Armas | Disparo base (3 niveles de carga) y Rayo Solar con energía. | Bien |
| Diálogos | Texto escrito dentro de las funciones (`say([...])`). | Mezclado con la lógica |
| Audio | Síntesis WebAudio: efectos y 4 temas chiptune programados como notas. | Funciona; estilo no acorde al arte HD |
| Guardado | `localStorage`: `cf-save-v1` (progreso), `cf-ctrl-v1` (controles), `cf-name`, `cf-muted`. | Sin versiones ni migración |
| Entrada | Teclado + capa táctil en pantalla completa con 3 esquemas, editor de posiciones, tamaño y vibración. | Muy completo |
| Depuración | No existe. | Falta |

---

## 3. Defectos encontrados

### Críticos (rompen la experiencia)
1. **El disparo no alcanza a los enemigos de tierra.** El disparo sale a 22 px del suelo y el rodador mide 14 px de alto. Causa: el mundo y los enemigos se diseñaron para el robot anterior de 20 px; el piloto actual mide 43 px.
2. **Escala del mundo incoherente.** Tiles de 16 px y enemigos de 14 px junto a un personaje de 43 px. Se ve como un collage.
3. **Nivel de altura fija (12 tiles = 192 px).** No permite exploración vertical, salas, ni regresar con habilidades nuevas.

### Importantes
4. **Sin coyote time ni jump buffering.** Los saltos se sienten injustos en los bordes.
5. **Control aéreo instantáneo y sin aceleración.** El movimiento es correcto, pero rígido.
6. **El corte del salto es brusco** (la velocidad salta a −1,6 de golpe).
7. **Hitbox del piloto (12×30) fija** para todas las poses: el dash y el agachado usan la misma caja.
8. **Selección de animación por cadena de `if`.** Difícil de mantener y de depurar.
9. **Enemigos sin anticipación de ataque** (la torreta parpadea poco antes de disparar; los demás no avisan).
10. **El dibujo de la escena es código de rectángulos.** No hay tileset ni fondos ilustrados.
11. **Diálogos, niveles y enemigos hardcodeados.** Añadir contenido implica editar lógica.

### Menores
12. Los cuadros de pared de la hoja 3 perdieron parte de la mano al borrar el muro dibujado.
13. El HUD tapa la zona del Núcleo de reserva en la esquina superior izquierda.
14. Las poses de daño, victoria y derrota no se verificaron en la última prueba.
15. GitHub Pages: el repositorio está listo, pero falta confirmar que el usuario activó Pages.
16. El atlas embebido en base64 obliga a republicar 0,5 MB por cada cambio de código.

---

## 4. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Archivo único creciendo sin control | Alto | Separar en módulos y datos (Fase 1) |
| Producción de arte (el cuello de botella real) | Alto | Lista de recursos priorizada; generarlos por tandas con textos estandarizados |
| Inconsistencia del arte generado por IA entre tandas | Medio | Hoja de referencia canónica, escala fija, revisión antes de integrar |
| Ambición (8 regiones, 8–12 h) frente a recursos reales | Alto | Primera versión = Ciudad Faro pequeña + Desierto Solar completo (30–45 min) |
| Bloqueos de progresión en el mapa | Medio | Validador de rutas en las herramientas de depuración |
| Rendimiento en celulares con fondos HD | Medio | Capas de fondo prerenderizadas, opción de efectos reducidos |
| Guardados viejos incompatibles con el nuevo mundo | Bajo | Versión de guardado + migración |

---

## 5. Qué conservar y qué refactorizar

**Conservar (con ajustes):**
- Bucle de paso fijo, colisiones AABB contra cuadrícula.
- Controles táctiles y editor (se adaptan al nuevo formato de pantalla).
- Sistema de atlas con metadatos del piloto.
- Máquina de estados de Heliostato, sistema de armas y energía.
- Guardado (con versión nueva), diálogos (formato), música (como base hasta tener audio definitivo).

**Refactorizar:**
- Estructura en módulos: `engine/` (bucle, entrada, cámara, físicas, render, audio), `game/` (jugador, enemigos, jefes, armas), `data/` (salas, enemigos, diálogos, textos), `assets/` (atlas, fondos, tilesets).
- Nivel: de franja única a **salas** con transiciones y cámara con límites por sala.
- Escala: nueva resolución lógica y tamaño de tile (ver propuesta en DEVELOPMENT_ROADMAP, Fase 1).
- Animación: máquina de estados explícita (`idle`, `run`, `jump`, `fall`, `dash`, `wall`, `hurt`…) con cuadros y velocidades definidos en datos.
- Colisión desacoplada del arte: capa de colisión independiente de la capa visual.

**Reemplazar:**
- El escenario y los enemigos dibujados con rectángulos, por arte ilustrado en el estilo del piloto.

---

## 6. Decisión sobre el motor

No se recomienda migrar a otro motor por ahora. Razones:
- El juego ya funciona en el navegador y en celular sin instalación, que es su mayor ventaja.
- El código propio es pequeño y comprensible; los problemas son de estructura y escala, no del motor.
- Canvas 2D soporta sin problema fondos ilustrados por capas y sprites HD a 60 FPS.

Se reconsideraría (por ejemplo, PixiJS para render por WebGL) solo si las pruebas de rendimiento con el arte definitivo no alcanzan 60 FPS en un celular de gama media.
