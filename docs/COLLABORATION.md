# Protocolo GitHub: usuario + Claude + ChatGPT

## Arquitectura
**Issue** = trabajo solicitado; **rama** = cambios aislados; **Pull Request** = propuesta revisable; **AI_HANDOFF** = estado compartido persistente; **main** = versión estable.

El usuario es quien aprueba diseño, alcance y la integración. Claude crea cambios en sus propias ramas. ChatGPT revisa PRs y su correspondencia con la biblia narrativa y los criterios técnicos.

## Ciclo de una tarea
1. El usuario decide prioridad. Claude lee Issue y documentos canónicos.
2. Claude deja plan, implementación y pruebas en una PR; actualiza AI_HANDOFF en esa rama.
3. El usuario solicita revisión a ChatGPT con la URL de la PR; ChatGPT lee diff, código y contexto, deja observaciones en GitHub.
4. Claude revisa los comentarios y corrige en el mismo PR. Detenerse si necesita decisión narrativa o si se detectan riesgos.
5. Tras aprobación del usuario se integra por el procedimiento acordado. No hay auto-merge.

## Automatización futura (NO configurada aún)
Puede configurarse GitHub Actions/webhooks + APIs de Anthropic y OpenAI para disparar revisiones, con permisos mínimos, límites de gasto y cuotas, prevención de loops y protección de secretos. Instalar la integración de GitHub de ChatGPT no configura ni inicia ese flujo automáticamente.

## Definition of Done
- Objetivo verificable + archivos incluidos + cambios claros.
- Pruebas ejecutadas y no ejecutadas registradas (no inventar validación visual o de FPS).
- No regresiones evidentes ni pérdidas de progreso.
- Aprobación explícita del usuario.
