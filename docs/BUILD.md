# Construcción y pruebas de Ciudad Faro

## Estructura
El juego se publica como **un solo archivo autónomo**, `index.html` (GitHub Pages lo sirve desde `main`). Ese archivo **se genera**: el código fuente está repartido así:

| Carpeta | Contenido |
|---|---|
| `src/shell/` | Esqueleto HTML: `<head>`, marcado del cuerpo, cierre |
| `src/styles/` | CSS |
| `src/engine/` | Base del motor: configuración y canvas, estado y física, actualización, dibujo, bucle, sonido y música |
| `src/game/` | Juego: guardado, nivel del Desierto, jugador, objetos, disparos, enemigos, jefe Heliostato, diálogos y partículas |
| `src/ui/` | Controles táctiles, editor de controles, pantallas y teclado |
| `src/manifest.txt` | Orden en que se ensamblan las piezas |
| `assets/atlas/` | Atlas del piloto: `piloto.webp` (imagen) y `piloto.json` (recortes) |
| `tools/build.py` | Ensamblador |
| `tools/tests/` | Pruebas de humo (Playwright) |

Todo el JavaScript vive dentro de la misma función autoejecutable, repartida entre archivos que se concatenan en orden. Por eso **el orden del manifiesto importa**: una pieza puede usar lo que declaran las anteriores.

## Generar `index.html`
```bash
python3 tools/build.py            # escribe index.html
python3 tools/build.py --check    # comprueba que index.html coincide con src/ (no escribe)
```
- Solo usa la biblioteca estándar de Python 3.
- Es determinista: las mismas entradas dan los mismos bytes, y la salida muestra el sha256.
- **No edites `index.html` a mano.** Edita `src/` o `assets/`, ejecuta el build e incluye en el commit el `index.html` resultante.
- La copia del juego que se publicaba antes como artefacto de Claude ya no es la fuente; la fuente es este repositorio.

## Pruebas de humo
Requieren Node 18+ y Chromium. En este entorno se usa el Chromium preinstalado de Playwright.
```bash
cd tools/tests
npm install
node smoke.mjs ../../index.html                      # un archivo: escenarios
node smoke.mjs /ruta/version-anterior.html ../../index.html   # dos archivos: además compara
```
- **Escenarios:**
  - **Escritorio, 1280×900:** título, nombre, estaciones, inicio, diálogo con Enter, mover, saltar y disparar con teclado, pausa con P y «Seguir», recarga con partida avanzada (estación marcada, equipo y guardado intactos).
  - **Celular, 844×390 táctil:** modo inmersivo, controles táctiles, salto, stick flotante, botón de pausa, editor de controles (tamaño) y recarga con la configuración conservada.
  - **Siempre:** sin errores de consola ni de página.
- **Determinismo:** reloj falso de Playwright (pausado; solo avanza con `runFor`), `Math.random` con semilla fija y fuentes de Google bloqueadas (se usan las de respaldo). Ejecutar dos veces el mismo archivo da capturas idénticas byte a byte.
- **Comparación:** con dos archivos, cada captura y el contenido de `localStorage` deben ser idénticos. Un cambio de un solo tono en el cielo ya produce capturas distintas.
- **Límites:** solo se compara lo que aparece en las capturas tomadas. Un cambio que no se ve en esos momentos (por ejemplo, un color que solo usa el jefe) no se detecta. El sonido no se compara.
- Los resultados quedan en `tools/tests/out/` (no se suben al repositorio).
