# Estado de producción artística — 14 octubre 2026

**INSTRUCCIÓN DEL USUARIO: CLAU PAUSADO**. No iniciar tareas nuevas de Claude Code, no fusionar PR #13, no modificar `main` mientras se termina el atlas del piloto. Un comentario no detiene automáticamente procesos ya activos; la pausa requiere que el usuario la aplique en la sesión de Claude Code.

## Respaldos existentes
- **Idle (respiración)**: 8 fotogramas aprobados; exportados como PNG RGBA individuales + atlas PNG + JSON, conservados en ZIP local `ciudad_faro_idle_aprobado_v1.zip`.
- **Walk (caminar)**: 8 fotogramas aprobados visualmente; **ahora separados en 8 PNG candidatos** dentro del ZIP local `ciudad_faro_piloto_respaldo_idle_walk.zip`. Los candidatos **no son todavía aptos para motor**: hay residuos rojos de fondo, y partes de bufanda cerca de límites de celda; requieren limpieza y validación.
- **Fall y Death**: bloqueadas hasta reconstrucción de poses y aprobación.
- **GitHub**: esta rama contiene documentación/estado, pero **NO contiene todavía los archivos binarios de los ZIP**. No afirmar que los PNG están versionados en GitHub.
- **Juego**: no se ha sustituido `assets/atlas/piloto.webp`.

## Regla de seguridad
No mezclar candidatos con aprobados; no regenerar una lámina completa al corregir un frame. Prioridad: terminar limpieza de caminar y establecer mecanismo de subida real de binarios. No fusionar sin autorización expresa.
