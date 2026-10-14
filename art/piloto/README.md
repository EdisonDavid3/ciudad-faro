# Ciudad Faro — taller de sprites del piloto

**Estado:** preparación artística. NO integrado al juego. NO aprobado para merge.

## Fuente canónica
La lámina JPG del piloto aprobada y vuelta a adjuntar por el usuario el 14-10-2026 es la referencia visual obligatoria. No reinterpretar, regenerar la lámina completa ni sustituir por un personaje similar a Zero. **Pendiente subir los bytes del JPG original a `art/piloto/reference/piloto_canon_original.jpg`**; el conector actual solo permite escribir archivos de texto. No declarar que la referencia está en GitHub hasta comprobar su subida.

## Carpetas
- `reference/`: JPG original inmutable, cuando se suba.
- `candidates/<estado>/`: recortes y dibujos sin aprobar.
- `approved/<estado>/<estado>_NNN.png`: PNGs RGBA transparentes de fotogramas aprobados individualmente.
- `output/`: atlas PNG + JSON generados únicamente desde approved.
- `tools/`: generador y validadores.

## Regla de trabajo
1. Un fotograma = un archivo individual. Corregir una pose no modifica las demás.
2. Caída y muerte están **BLOQUEADAS** hasta revisión de secuencia y anatomía. No reciclar fotogramas incorrectos.
3. Verificar transparencia alfa real, pies/anclajes, tamaño y consistencia de bufanda, rostro y armadura.
4. No usar la imagen de tablero de ajedrez como prueba de transparencia: verificar canal alfa.
5. Generar atlas solo con frames aprobados y comprobar animación en navegador y móvil.
6. El atlas existente `assets/atlas/piloto.webp` NO se reemplaza sin PR de integración aparte, pruebas y autorización del usuario.
7. Clau se ocupa de contrato técnico e integración; Chad + usuario aprueban arte. No fusionar esta rama sin permiso expreso.

## Archivos iniciales
Chad preparó un ZIP descargable con el JPG original, recortes de referencia, candidatos de idle, manifiesto y script de ensamblaje. **Los PNG candidatos no están aprobados y el ZIP todavía no se ha subido a GitHub.**