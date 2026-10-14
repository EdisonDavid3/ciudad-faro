# Issue #6 — Tiendas, economía, consumibles, ropa y artefactos

**Estado:** propuesta para revisión (Chad) y decisión (usuario). Solo diseño: no modifica código, arte, guardados ni `main`.
**Etiquetas:** **[Aprobado]** = decidido por el usuario · **[Propuesta]** = pendiente de aprobación. Todos los nombres comerciales y de moneda son propuestas, y los precios son ejemplos.
**Relacionado:** WORLD_MAP §2 (puesto de emergencia y mercado mayor) · DEVELOPMENT_ROADMAP §2.0b · GAME_BIBLE §4 (reglas del alcohol) · `docs/design/ISSUE-5_MASCOTAS_EVOLUTIVAS.md` §6 (bocado de farol).

---

## 0. Ya aprobado (no se vuelve a preguntar)
- **Puesto de emergencia** en `city/M1`, accesible desde la introducción en cualquier orden de estaciones, aunque `F_desierto = pendiente`, con 3–4 artículos: curación, mejora moderada, artículo para mascota y cosmético.
- **Mercado mayor**, que se abre o amplía con la energía de la primera estación compatible (`F_desierto ≠ pendiente` o `F_fabrica`).
- **Alcohol:** juego para público adulto. Beber no cura ni da ventajas, nunca es obligatorio, no se romantiza, y en el primer hito no hay ningún comando de consumo. La petaca es solo visual.
- **Fuera del primer hito:** taberna, alcohol a la venta y economía avanzada.
- **Mascota:** el descanso en relés es gratis y completo; no hay micropagos.

---

## 1. Principios de la economía [Propuesta]
1. **Nada obligatorio se compra.** La ruta principal, las habilidades centrales y los finales nunca dependen del dinero.
2. **Explorar paga más que repetir.** La mayor parte del dinero sale de secretos, cajas y encargos; los enemigos dan poco y no se pueden farmear.
3. **Comprar complementa la exploración, no la reemplaza.** Las mejoras permanentes importantes se encuentran; la tienda vende piezas o atajos parciales.
4. **Diegética.** La moneda, los precios y los comerciantes cambian con la energía y las decisiones del mundo.
5. **Sin dinero real**, nunca.

---

## 2. Moneda [Propuesta]

### 2.1 Nombre (decisión 1)
| Opción | Idea |
|---|---|
| **Chispas** (propuesta de Chad) | Pequeñas cargas de energía; suena cercano y fácil |
| **Celdas** | Baterías diminutas usadas como dinero en una ciudad sin energía |
| **Mechas** | Mechas de lámpara; pequeñas, comunes y valiosas a oscuras |

En el resto del documento se usa **«Chispas»** solo como nombre de trabajo.

### 2.2 Cómo se obtiene
| Fuente | Cantidad orientativa | Regla contra el farmeo |
|---|---|---|
| Cajas y restos en salas | 5–15 | Cada caja se abre una sola vez (se guarda) |
| Secretos | 25–60 | Una sola vez |
| Encargos de habitantes | 30–100 | Una sola vez |
| Enemigos | 1–3 | Solo la **primera** vez que muere cada enemigo en cada ciclo de descanso; después no dan nada hasta descansar en un relé |
| Vender chatarra encontrada | 5–20 por pieza | Las piezas son finitas y están colocadas en el mapa |

### 2.3 Muerte (decisión 4)
- **[Propuesta recomendada]** Morir **no** quita dinero. El castigo de la muerte ya es volver al relé, y perder dinero empuja a farmear.
- Alternativa: perder un 10 % que se recupera al volver al lugar de la muerte.

---

## 3. Comerciantes y lugares

### 3.1 Primer hito: puesto de emergencia (`city/M1`) [Aprobado como función; detalle en Propuesta]
- **Quién [Propuesta, decisión 2]:** una vecina mayor que remienda y trueca desde un carrito con un farol a pilas. Nombre provisional: **Tula**. Habla poco y vende lo que hay. Tiene deseos propios: guarda las ganancias para reabrir el taller de su hijo (regla narrativa 8).
- **Ruta física:** está en el mercado apagado, a la vista en el recorrido obligatorio de la introducción (tras el primer combate de `city/M1`). No hace falta desviarse.
- **Cambios con el mundo:** con `F_desierto = pendiente` vende a la luz de su farol; cuando vuelve la energía, se muda al mercado mayor y su puesto se ilumina (sin cambiar su catálogo básico).

### 3.2 Mercado mayor (`city/M1`, después del primer hito)
- Se abre con `F_desierto ≠ pendiente` o con `F_fabrica`.
- 2–3 comerciantes: suministros, ropa y artefactos.
- **Con `F_desierto = refugio`,** Dante aparece para cambiar piezas (WORLD_MAP §2.3) y ofrece un artículo propio del refugio.
- **Con `F_desierto = ciudad`,** el mercado tiene más surtido, pero un comerciante comenta el corte en el asentamiento "fuera de los registros".

### 3.3 Comerciantes regionales (después del primer hito)
- Uno pequeño por región, en un refugio o junto a un relé (por ejemplo, el campamento de Kaela en el Reactor).
- Venden 1–2 artículos propios de su región, por ejemplo una pieza de artefacto o un accesorio para Núli con el tema de la región.

### 3.4 Taberna [Propuesta; fuera del primer hito]
**Nombre (decisión 3):** «La Última Gota» (provisional de Chad) · «La Marea Baja» · «El Farol Ahogado».

**Lugar (decisión 3):**
- (a) en **Los Bajos**, junto al colector (`bajos/B3`), donde vive la comunidad que no aparece en el censo; **recomendado**: da identidad a Los Bajos y llega cuando la reja ya está abierta;
- (b) en el mercado mayor de `city/M1`.

**Qué ofrece:**
- **Rumores:** pistas de secretos y de historias de habitantes.
- **Descanso:** funciona como un relé para Núli.
- **Personajes:** quien atiende la barra (nuevo, nombre por definir) y habitantes que aparecen según el progreso.

**Alcohol en la taberna:**
- El piloto puede pedir una bebida. Paga, se ve una escena corta (una línea, un silencio, una reacción de alguien) y no hay ningún efecto de juego.
- **No es un objeto de inventario** (coherente con la petaca de la decisión P4 de GAME_BIBLE §9).
- **Los rumores y las escenas importantes no requieren beber.** El piloto también puede pedir agua, sopa o solo sentarse; la información es la misma.
- La primera vez que pide agua, quien atiende la barra lo nota sin comentarlo. Es un gesto pequeño que acompaña el arco abierto del hábito (GAME_BIBLE §4).
- No hay contadores, logros ni recompensas por beber o por no beber.

---

## 4. Categorías de artículos [Propuesta]
| Categoría | Ejemplos | Tipo | Límites |
|---|---|---|---|
| **Curación** | Botiquín (cura ~40 % de la vida) | Consumible | Se llevan 3 como máximo; el máximo sube con mejoras |
| **Mejoras de vida** | *Fragmento de núcleo*: 4 fragmentos forman +4 de energía máxima (como el Núcleo de reserva de `desert/S1`) | Permanente | La tienda vende **1** de cada 4 fragmentos por región; los otros 3 se encuentran explorando |
| **Mejora de capacidad** | Bolsa de botiquines (+1 al máximo) | Permanente | 2 en todo el juego |
| **Mascota** | Bocado de farol (+30 de energía a Núli fuera de combate) | Consumible | Se llevan 2 como máximo |
| **Mascota, cosméticos** | Collares de luz, tonos para el farol | Cosmético | Sin efecto de juego |
| **Ropa** | Colores de la bufanda, parches, placas de la armadura | Cosmético | Ver §4.1 |
| **Artefactos** | Imán de chispas, brújula de secretos, amortiguador de caídas | Equipable | Ver §4.2 |
| **Objetos de misión** | Piezas para encargos de habitantes | Clave | No se venden ni se pierden |
| **Alcohol** | Bebida en la taberna | Escena | Ver §3.4; nunca es objeto |

### 4.1 Ropa: mayormente cosmética
- Respeta la **silueta reconocible** del piloto (GAME_BIBLE §6): armadura roja y dorada, bufanda naranja, visor cian y mochila-faro.
- **Se puede cambiar:** el color de la bufanda, los parches, el acabado de las placas y un adorno en la mochila.
- **No se cambia:** la forma de la armadura, el casco abierto ni el visor cian.
- **En escenas clave** se usa siempre el diseño canónico. Así el arte de las escenas no se multiplica.
- **Costo de arte:** la mayoría son cambios de paleta sobre el mismo sprite, que es barato. Los adornos son capas pequeñas.

### 4.2 Artefactos: apoyo con límite
- **Ranuras:** 2 al empezar y hasta 4 en total (decisión 5). Las ranuras extra se encuentran, no se compran.
- **Efectos pequeños y legibles,** por ejemplo:
  - **Imán de chispas:** recoge el dinero a más distancia.
  - **Brújula de secretos:** marca en el mapa los secretos de la sala.
  - **Amortiguador:** reduce el daño de caída.
  - **Farol compartido:** Núli recupera la energía un 20 % más rápido fuera de combate.
- **Ninguno** da invulnerabilidad, sustituye una habilidad central ni es necesario para la ruta obligatoria.
- **Nunca** se venden artefactos de alcohol ni con efectos ligados al alcohol.

---

## 5. Precios de ejemplo (no definitivos) [Propuesta]
| Artículo | Precio | Dónde |
|---|---|---|
| Botiquín | 30 | Puesto de emergencia |
| Fragmento de núcleo | 120 | Puesto de emergencia (1 por región) |
| Bocado de farol | 15 | Puesto de emergencia |
| Color de bufanda | 60 | Puesto de emergencia |
| Bolsa de botiquines | 200 | Mercado mayor |
| Artefacto | 150–300 | Mercado mayor y regionales |
| Bebida en la taberna | 10 | Taberna |
| Agua o sopa en la taberna | 0 | Taberna |

**Comprobación del primer hito (estimación sin probar):**
- **Ingresos:** ciudad introductoria + Desierto completo ≈ 20 cajas × 10 + 6 secretos × 40 + 2 encargos × 50 + enemigos ≈ 60 → **≈ 600 Chispas**.
- **Gasto completo:** comprar todo el catálogo del puesto una vez (fragmento 120 + bufanda 60 + 2 bocados 30 + 3 botiquines 90 = 300) cuesta **la mitad**.
- **Conclusión:** explorando con normalidad se puede comprar todo sin farmear, y sin explorar hay dinero para los básicos.

---

## 6. Menús e inventario [Propuesta]
- **Una sola pantalla de tienda:** lista de artículos a la izquierda y detalle a la derecha (qué hace, cuántos llevas, máximo). Un botón **Comprar** y uno **Salir**.
- **Táctil:**
  - zonas de toque grandes (≥ 44 px reales);
  - la tienda pausa el juego y oculta los controles de acción;
  - se desliza para recorrer la lista.
- **Teclado y mando:** flechas para navegar; confirmar y cancelar con los botones de salto y disparo, igual que en el resto de los menús.
- **Confirmación** solo en compras permanentes o de más de 100. Los consumibles se compran directo.
- **Vender:** solo chatarra, en el mercado mayor. Los objetos de misión no se pueden vender.
- **Inventario del juego:**
  - una pestaña de consumibles (botiquín, bocado) asignables a un botón rápido;
  - una pestaña de artefactos con ranuras;
  - una pestaña de cosméticos.

### 6.1 Guardado [Propuesta]
```
economy: { version: 1, currency: 0,
           consumables: { medkit: 0, petSnack: 0 },
           caps: { medkit: 3, petSnack: 2 },
           purchased: ["frag_city_1", ...],       // compras únicas
           artifacts: { owned: [], equipped: [], slots: 2 },
           cosmetics: { owned: ["scarf_default"], scarf: "scarf_default" },
           openedCrates: ["city/M1#c1", ...],     // cajas abiertas (una vez)
           dropCycle: 0 }                          // ciclo de descanso para los enemigos
```
- **Migración:** las partidas anteriores reciben el bloque con `currency = 0`. Las cajas de salas ya visitadas se consideran cerradas, para no regalar dinero.
- **Guardado:** se guarda al comprar y al descansar.

---

## 7. Primer hito «La primera luz» (alcance mínimo)
| Incluye | Detalle |
|---|---|
| Puesto de emergencia en `city/M1` | **4 artículos:** botiquín, fragmento de núcleo (mejora moderada), bocado de farol y color de bufanda (cosmético) |
| Moneda | Cajas, secretos, 1–2 encargos pequeños y enemigos con límite por ciclo |
| Menú | Pantalla única de tienda e inventario de consumibles con botón rápido |
| Guardado | Bloque `economy` de §6.1 con migración |

**No incluye:** mercado mayor, comerciantes regionales, taberna, alcohol, artefactos, venta de chatarra ni ropa más allá de un color.

---

## 8. Casos de prueba futuros (no ejecutados)
| ID | Prueba | Resultado esperado |
|---|---|---|
| SHOP-01 | Partida nueva, introducción completa | El puesto está a la vista en el recorrido obligatorio y se puede comprar |
| SHOP-02 | Fábrica primero con `F_desierto = pendiente` | El puesto sigue abierto con su catálogo completo |
| SHOP-03 | Comprar más del máximo de botiquines o bocados | No deja; muestra el máximo |
| SHOP-04 | Comprar el fragmento de núcleo dos veces | La segunda vez ya no aparece |
| SHOP-05 | Matar al mismo enemigo dos veces sin descansar | La segunda vez no da dinero |
| SHOP-06 | Descansar en un relé y volver | El enemigo vuelve a dar su pequeña cantidad |
| SHOP-07 | Guardar, cerrar y recargar tras comprar | Dinero, compras y cosméticos intactos |
| SHOP-08 | Partida de una versión anterior | Bloque `economy` creado; cajas de salas visitadas cerradas |
| SHOP-09 | Morir con dinero | No se pierde (si se aprueba la decisión 4) |
| SHOP-10 | Menú de tienda en el celular | Se lee bien, se toca sin errores y oculta los controles de acción |
| SHOP-11 | Completar el hito sin comprar nada | Es posible (validador de rutas y partida real) |
| SHOP-12 | Escena de cambio de bufanda | Las escenas clave usan el diseño canónico |
| SHOP-13 (posterior) | Taberna: obtener todos los rumores pidiendo solo agua | Se obtienen todos |

---

## 9. Costos y riesgos
| Riesgo | Mitigación |
|---|---|
| La tienda trivializa la exploración | Solo 1 de cada 4 fragmentos se vende; las ranuras extra se encuentran |
| Farmeo | Enemigos con límite por ciclo; cajas y secretos de una sola vez |
| El alcohol se vuelve un premio | Sin objeto, sin efecto, sin contador, rumores iguales con agua |
| Arte de ropa | Cambios de paleta; diseño canónico en escenas |
| Ruido en los menús táctiles | Pantalla única que pausa el juego y oculta controles |
| Romper guardados | Bloque `economy` versionado y migración; SHOP-08 |
| Alargar el hito | Un solo puesto con 4 artículos a la vista en la ruta obligatoria |

---

## 10. Decisiones para el usuario (una sola ronda, después de la revisión de Chad)
| # | Decisión | Opciones | Recomendación de Clau |
|---|---|---|---|
| 1 | Nombre de la moneda | Chispas · Celdas · Mechas · otro | **Chispas** (clara y cercana) |
| 2 | Vendedora del puesto de emergencia | Tula, vecina que remienda y trueca · otro nombre o perfil | Tula |
| 3 | Taberna: nombre y lugar | «La Última Gota» · «La Marea Baja» · «El Farol Ahogado» / en Los Bajos (`bajos/B3`) o en el mercado | «La Marea Baja», en **Los Bajos** |
| 4 | ¿Se pierde dinero al morir? | No · 10 % recuperable | **No** |
| 5 | Ranuras de artefactos | 2 → 4 · otro número | **2 → 4** |
| 6 | Alcohol solo como escena en la taberna, sin objeto de inventario | Sí · No | **Sí** |

Los precios, las cantidades y los porcentajes son ejemplos que se ajustarán con pruebas; no requieren aprobación ahora.
