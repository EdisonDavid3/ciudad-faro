# Issue #6 — Tiendas, economía, consumibles, ropa y artefactos

**Versión:** 2 (corrige la primera revisión de Chad; ver §11).
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
2. **Explorar paga más que repetir.** La mayor parte del dinero sale de secretos, cajas y encargos. Todas las fuentes son **finitas**, incluidos los enemigos (§2.2), así que no se puede farmear.
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
| Enemigos | 1–3 | **Una sola vez en toda la partida:** cada enemigo colocado en el mapa tiene un identificador fijo y paga solo la primera vez que muere. Cuando reaparece (por ejemplo, después de descansar), ya no da nada |
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
- **Descanso:** funciona como un relé para Núli: recuperación completa **gratis**, sin comprar nada.
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
| **Mejoras de vida** | *Fragmento de núcleo*: 4 fragmentos forman un núcleo que da **+4 de vida máxima al piloto** ("energía" es la barra de vida del piloto, como en el Núcleo de reserva de `desert/S1`) | Permanente | 4 fragmentos por región; la tienda vende **1** y los otros 3 se encuentran explorando. Es aparte del Núcleo de reserva de `desert/S1`, que sigue siendo un secreto completo que solo se encuentra |
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
- **Durante el juego** (exploración, combate, diálogos con retrato) se ve siempre la ropa que eligió el jugador, y se guarda.
- **Solo las cinemáticas predefinidas** usan el diseño canónico, para no multiplicar su arte. El menú de ropa lo avisa con una línea: «Las cinemáticas muestran el traje original».
- **Costo de arte:** la mayoría son cambios de paleta sobre el mismo sprite, que es barato. Los adornos son capas pequeñas.

### 4.2 Artefactos: apoyo con límite
- **Ranuras:** 2 al empezar y hasta 4 en total (decisión 5). Las ranuras extra se encuentran, no se compran.
- **Efectos pequeños y legibles,** por ejemplo:
  - **Imán de chispas:** recoge el dinero a más distancia.
  - **Brújula de secretos:** marca en el mapa los secretos de la sala.
  - **Amortiguador:** reduce el daño de caída.
  - **Farol compartido:** la recuperación pasiva de Núli pasa de +1/s a +1,2/s. Mantiene todas las condiciones del documento de mascotas §4: solo a cuestas, sin enemigos en cámara durante 3 s y con tope 40. No da ninguna recarga con un jefe activo y no cambia el umbral de regreso (30).
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

**Presupuesto del primer hito (estimación sin probar, a medir en partidas reales)**

Catálogo completo del puesto, una vez: fragmento 120 + bufanda 60 + 2 bocados 30 + 3 botiquines 90 = **300**.

| Momento | De dónde sale | Ingresos estimados | Qué alcanza |
|---|---|---|---|
| **Primera visita al puesto** (introducción, `city/M1`) | 3 cajas × 10 + 2 enemigos × 2 | **≈ 35** | 1 botiquín, o 2 bocados |
| **Ruta crítica sin secretos** (regreso a la ciudad tras Heliostato) | 5 cajas de la ciudad × 10 + 10 cajas en la ruta del Desierto × 10 + ≈ 40 enemigos × 2 + 1 encargo × 50 | **≈ 280** | Casi todo el catálogo: falta uno de los artículos baratos |
| **Recorrido extendido** (con exploración) | Lo anterior + 6 secretos × 40 + 5 cajas fuera de ruta × 10 + 1 encargo × 50 | **≈ 620** | Todo el catálogo, con margen |

**Objetivo de ajuste** (no un resultado): que la ruta crítica cubra el 80–100 % del catálogo y la exploración lo supere. Que no haga falta farmear para comprar todo **aún no está demostrado**: se medirá con el caso SHOP-14.

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
           openedCrates: ["city/M1#c1", ...],     // cajas ya abiertas (una vez)
           paidEnemies: ["desert/A2#e3", ...] }    // enemigos que ya pagaron (una vez)
```
- **Identificadores:** cada caja y cada enemigo colocado en el mapa tiene un ID fijo `región/sala#cN` o `región/sala#eN`, definido en los datos de salas (DEVELOPMENT_ROADMAP §1.7). Los enemigos que aparecen sin estar colocados (por ejemplo, los que invoca un jefe) no pagan.
- **Migración (política explícita):**
  - El juego actual (menú de 8 estaciones) no tiene cajas, ni moneda, ni IDs de enemigos, así que **no hay forma de saber nada sobre cajas en una partida antigua**, y tampoco puede haber abierto ninguna.
  - Por eso la migración crea el bloque con `currency = 0`, `openedCrates = []` y `paidEnemies = []`: todas las cajas y los enemigos del mapa nuevo quedan disponibles. No se inventa ningún dato.
  - **Idempotente:** si el bloque `economy` ya existe, la migración no lo toca.
- **Guardado:** se guarda al comprar y al descansar.

---

## 7. Primer hito «La primera luz» (alcance mínimo)
| Incluye | Detalle |
|---|---|
| Puesto de emergencia en `city/M1` | **4 artículos:** botiquín, fragmento de núcleo (mejora moderada), bocado de farol y color de bufanda (cosmético) |
| Moneda | Cajas, secretos, 1–2 encargos pequeños y enemigos (cada uno paga una sola vez) |
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
| SHOP-06 | Descansar en un relé, volver y matar al mismo enemigo | Reaparece, pero no da dinero (ya pagó) |
| SHOP-07 | Guardar, cerrar y recargar tras comprar | Dinero, compras y cosméticos intactos |
| SHOP-08 | Partida de una versión anterior; migrar dos veces | Bloque `economy` creado con `openedCrates = []` y `paidEnemies = []`; la segunda migración no cambia nada |
| SHOP-09 | Morir con dinero | No se pierde (si se aprueba la decisión 4) |
| SHOP-10 | Menú de tienda en el celular | Se lee bien, se toca sin errores y oculta los controles de acción |
| SHOP-11 | Completar el hito sin comprar nada | Es posible (validador de rutas y partida real) |
| SHOP-12 | Cambiar la bufanda y jugar | El color elegido se ve en el juego y en los diálogos, y se guarda; solo las cinemáticas predefinidas muestran el canónico |
| SHOP-13 (posterior) | Taberna: obtener todos los rumores pidiendo solo agua | Se obtienen todos |
| SHOP-14 | Medir ingresos en tres partidas (primera visita, ruta crítica, recorrido extendido) | Se registran las cifras reales y se comparan con el presupuesto de §5 |
| SHOP-15 | Equipar «Farol compartido» y pelear contra Heliostato | Núli no recupera nada mientras el jefe está activo |

---

## 9. Costos y riesgos
| Riesgo | Mitigación |
|---|---|
| La tienda trivializa la exploración | Solo 1 de cada 4 fragmentos se vende; las ranuras extra se encuentran |
| Farmeo | Todas las fuentes son finitas: enemigos, cajas y secretos pagan una sola vez |
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

---

## 11. Respuesta a la primera revisión de Chad
| # | Pedido | Cambio |
|---|---|---|
| 1 | Farmeo infinito por relés | §1 y §2.2: cada enemigo paga una sola vez en la partida (ID fijo); SHOP-06 corregido |
| 2 | Presupuesto del primer hito | §5: desglose por momento (primera visita, ruta crítica, recorrido extendido), objetivo de ajuste sin conclusión categórica y SHOP-14 |
| 3 | Guardado y migración | §6.1: IDs de cajas y enemigos, `paidEnemies` en lugar de `dropCycle`, política explícita e idempotente; SHOP-08 |
| 4 | Coherencia con mascotas | §4.2: «Farol compartido» con todas las condiciones y el tope; §3.4: descanso de Núli gratis en la taberna; SHOP-15 |
| 5 | Fragmento de núcleo | §4: vida máxima del piloto, aparte del Núcleo de reserva de `desert/S1`; la progresión central no depende de la tienda |
| 6 | Ropa en el juego y en escenas | §4.1: la ropa elegida persiste en el juego; solo las cinemáticas predefinidas usan el canónico, y el menú lo avisa |
