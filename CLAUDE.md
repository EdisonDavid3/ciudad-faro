# Instrucciones para Claude Code — Ciudad Faro

Trabaja junto a ChatGPT mediante GitHub. **No interviene Codex.** El usuario dirige y aprueba.

## Antes de programar
- Leer `docs/AI_HANDOFF.md`, `GAME_BIBLE.md`, `WORLD_MAP.md`, `DEVELOPMENT_ROADMAP.md`, `TECHNICAL_AUDIT.md`.
- Comprobar la Issue asignada y revisar el estado de su Pull Request.
- Si una propuesta contradice la biblia, **documentar la contradicción**, no cambiar silenciosamente la historia.
- Nunca asumir que el trabajo o las pruebas están completos sin verificarlo.

## Flujo
1. Resuelve una Issue por vez, en rama propia distinta de `main`.
2. Primero explica diseño, alcance y criterios de aceptación.
3. Preserva el proyecto funcional, la compatibilidad móvil y los guardados.
4. Crea PR con resumen, pruebas ejecutadas, fallos, riesgos y capturas cuando sean útiles.
5. Actualiza `docs/AI_HANDOFF.md` dentro de la PR con el traspaso.
6. Espera revisión de ChatGPT y decisión final del usuario. Corrige sin hacer merge por tu cuenta.

## Prioridad narrativa / jugable
- Metroidvania genuinamente interconectado, no menú de ocho niveles.
- Ciudad Faro introducida antes del Desierto Solar; transformación visible al regresar.
- Primeros 10–15 minutos memorables; vertical slice de 30–45 minutos pulidos.
- Sable aparece como rival recurrente con motivos; Madre Faro no es simplemente malvada.
- Humor sarcástico mesurado; silencios ante pérdidas. Decisiones con consecuencias.
- HD ilustrado coherente en personaje, enemigos y escenarios. No usar placeholders como arte final.
- Control con precisión: dash, pared, disparo, hitboxes, coyote time, jump buffer, cámara, input táctil.

## Tarea inicial
Ver Issue #1: https://github.com/EdisonDavid3/ciudad-faro/issues/1
**Solo rediseño documental. No cambiar `index.html` ni sistemas jugables hasta que el usuario apruebe el mapa y el plan.**

## Límites
- Nunca escribir en `main` ni hacer auto-merge.
- Nunca incluir tokens o secretos en commits.
- No usar comandos destructivos sin autorización expresa.
- No generar ciclos interminables de revisiones ni llamadas API: detenerse ante conflictos, ambigüedad y consumo excesivo.
