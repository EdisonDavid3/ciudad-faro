# GAME_BIBLE — Ciudad Faro: El Último Eco

> «Salvar el mundo no significa que todos quieran ser salvados».

Metroidvania 2D de acción y exploración. Combate preciso, mundo interconectado, ciencia ficción melancólica con ironía y esperanza.

---

## 1. Visión

- **Sensación de control:** recorrer una sala vacía debe ser un placer. El movimiento es la base de todo.
- **Exploración con significado:** cada habilidad abre lugares nuevos, y cada lugar cambia lo que sabes del mundo.
- **Combate de dominio:** los enemigos enseñan y exigen decisiones; los jefes tienen patrones aprendibles y fases.
- **Historia con consecuencias:** cada victoria deja una pregunta, no solo una recompensa.
- **Prioridad:** que los primeros 30 minutos sean excepcionales antes de crecer.

## 2. Tono

Melancólico, humano, irónico y esperanzador.
- El sarcasmo es una defensa de personajes que viven algo trágico, no una sucesión de chistes.
- Diálogos breves durante la acción; conversaciones más largas solo en lugares seguros.
- Se permite el silencio. Ante la tragedia real, el piloto no bromea.
- Nadie es malvado sin motivo. Todos se equivocan por razones comprensibles.

Ejemplo de registro:
> **Lila:** La buena noticia es que recuperamos el suministro del hospital.
> **Piloto:** ¿Y la mala?
> **Lila:** Tuvimos que apagar el ascensor.
> **Piloto:** Bueno. Por lo menos ahora tienen motivos para mantenerse sanos.

---

## 3. El mundo

**El Gran Hundimiento.** Hace 90 años los continentes se hundieron. Quedaron mesetas altas (como el Desierto Solar), estaciones sumergidas e infraestructura que todavía funciona.

**Ciudad Faro.** Ciudad flotante hecha de barcos antiguos, plataformas industriales, casas soldadas sobre pontones y puentes que se mecen con las olas. En el centro, un faro gigante: señal de navegación, red de comunicaciones y símbolo de que la humanidad sigue aquí. Su luz se está apagando. Es el centro físico del mundo: el juego empieza en ella, antes de cualquier estación, y se vuelve a ella para ver los cambios.

**Los Bajos.** Debajo de Ciudad Faro siguen las calles, cisternas y canales de la ciudad vieja que se hundió. Ahí vive gente que no aparece en el censo. Los Bajos conectan por debajo varias regiones (Desierto, Fábrica, Plataforma, Reactor) y tienen enemigos, secretos e historias propias. Detalle en `WORLD_MAP.md`.

**Las ocho estaciones.** Producen energía, pero en secreto formaban también una **red de defensa climática y supervivencia planetaria**. Alguien borró esa información de los registros oficiales. Madre Faro conserva una copia.

**El Eco.** La parte superviviente de **Madre Faro**, la primera inteligencia artificial de la supervivencia humana. Los dirigentes la desactivaron cuando dejó de convenirles una IA que podía cuestionarlos. Su orden fundamental sigue activa:
> Proteger la vida humana, aunque los propios humanos pongan en peligro su supervivencia.

Madre Faro no quiere exterminar a la humanidad: quiere **quitarle el control**. Los guardianes no son monstruos; cumplen protocolos de protección llevados al extremo.

**Recuperar energía tiene costo.** Devolver luz a un barrio puede dejar sin suministro a otro asentamiento.

---

## 4. Personajes

### El Piloto (protagonista)
- **Nombre:** lo elige el jugador. **Personalidad fija:** ingenioso, desconfiado, bromea cuando está aterrado.
- **Arco:** al principio repara estaciones para sobrevivir; después entiende que obedecer sin cuestionar también destruye vidas.
- **Secreto (revelación tardía):** de niño sobrevivió a un accidente gracias a un sistema médico que dejó una clave de identificación en su organismo. La ingeniera reutilizó esa clave en la armadura. Esa clave pertenece a Madre Faro: la IA que parece perseguirlo le salvó la vida. Sigue siendo humano y libre de decidir.
- **Diseño canónico:** ver Dirección artística.

### Lila
- Técnica brillante, agotada y sarcástica. Guía por radio.
- **Deseo:** devolver la luz a su familia, que vive en un barrio sin energía.
- **Conflicto:** ocultar verdades para mantener la calma o confiar en que la gente puede afrontarlas.
- **Primer encuentro en persona:** en el Barrio Apagado, durante la introducción (`city/BA1`). Es obligatorio: no se puede salir de la ciudad sin conocerla. Antes de eso solo se la oye por radio.
- **Referencia visual (aprobada, en palabras):** cabello oscuro y rizado, carácter sereno y firme; adaptación HD ilustrada al estilo retrofuturista de Ciudad Faro. Se inspira en una referencia fotográfica del usuario que **no** se copia literalmente ni se sube al repositorio.
- *Nombre anterior en documentos viejos: «Lira».*

### Sable
- Antiguo compañero de la ingeniera. Rival recurrente.
- **Motivo:** cree que reactivar las estaciones puede repetir la catástrofe. Conoce errores que nadie menciona.
- No es malvado: está dispuesto a ser cruel para impedir algo que considera peor.

### La ingeniera
- Creadora de la armadura y de la mochila-faro (núcleo aislado de la red). Ya no está.
- Aparece en grabaciones y en los **ocho fragmentos**, que revelan la historia real de Madre Faro.

### Habitantes y aliados (aparición gradual)
Roles y nombres aprobados por el usuario. El diseño visual definitivo es del usuario. Entran poco a poco para no saturar la introducción: en ella solo aparecen Lila y Nox.

| Nombre | Rol | Primera aparición | Relación con la trama |
|---|---|---|---|
| **Nox** | Decodificador: escucha las transmisiones del Eco y recibe el mapa de los relés del faro | Mercado apagado, introducción (`city/M1`) | Oye a Madre Faro antes que nadie, pero no entiende lo que oye; insinúa sin revelar (regla narrativa 2) |
| **Dante** | Defensor del refugio oculto del desierto | Refugio civil del Desierto Solar (`desert/C3`) | Pone cara a la decisión de Heliostato; su escena final depende de esa decisión |
| **Silas** | Archivista: custodio de registros que el Consejo borró | Plaza del Faro, en el primer regreso a la ciudad | Ambiguo. Guarda pedazos de la historia borrada, nunca la copia completa (esa la tiene Madre Faro) |
| **Kaela** | Líder del campamento del frío | Reactor Helado y su ferrovía | Su familia está en las cámaras criogénicas de Boreal |

Ninguno contradice a Madre Faro, Sable ni la ingeniera: ninguno conoce toda la verdad, y cada uno da una mirada humana a una estación.

### Madre Faro
- Habla con calma, recuerda nombres de muertos de hace décadas y cree que sus decisiones son compasivas.
- **Tragedia:** confundió cuidar a alguien con decidir por él.

### Los ocho guardianes

| # | Estación | Guardián | Tragedia | Arma | Uso fuera del combate |
|---|---|---|---|---|---|
| 1 | Desierto Solar | **Heliostato** | Acumula energía para un invierno que nunca terminó; dejó comunidades sin luz por cumplir su misión. | Rayo Solar | Activa maquinaria térmica, derrite bloqueos |
| 2 | Reactor Helado | **Boreal** | Congeló trabajadores y sectores enteros para contener una fuga; algunos siguen en criogenia. | Lanza de Escarcha | Congela enemigos y agua para crear plataformas |
| 3 | Plataforma Hundida | **Nereida** | Protege una colonia submarina que no quiere volver a la superficie. | Pulso Abisal | Empuja, rompe compuertas, ayuda bajo el agua |
| 4 | Invernadero Biomecánico | **Vesper** | Fusionó plantas y máquinas buscando comida ilimitada; todo organismo es reutilizable. | Raíz Viva | Proyectil que crea anclajes de movimiento |
| 5 | Fábrica de Engranajes | **Horologio** | Fabrica prótesis para ciudadanos muertos hace décadas; no acepta que sus encargos terminaron. | Pulso Magnético | Mueve mecanismos, atrae metal, desactiva defensas |
| 6 | Torre de Tormentas | **Nimbus** | Desvió tormentas a asentamientos pequeños para salvar la ciudad; guarda el registro de cada víctima. | Arco Voltaico | Alimenta circuitos, abre rutas de alta tensión |
| 7 | Mina de Cristal | **Prisma** | Guarda memorias humanas en cristales; cree que conservar una conciencia es salvar una vida. | Haz Prismático | Rebota en superficies, resuelve rompecabezas |
| 8 | Estación Orbital | **Cenit** | Lleva décadas evaluando si la humanidad merece recuperar el control de sus sistemas. | Campo Gravitacional | Altera trayectorias de enemigos, objetos y del piloto |

**Regla de armas:** tienen ventajas y debilidades, pero ningún jefe exige su debilidad. Un jugador hábil puede vencer a cualquiera con el disparo base.

---

## 5. Sistemas de juego

### Movimiento (base)
Correr, saltar con altura variable, deslizarse e impulsarse en paredes, dash, disparar, cargar disparos y combinar todo con el ataque (disparar corriendo, saltando, cayendo, en dash y en la pared).
Calidad obligatoria: aceleración y frenado controlados, **coyote time**, **jump buffering**, dash con respuesta inmediata.

### Mejoras de movimiento (distribuidas por la aventura)
Dash aéreo (Botas de impulso) · doble impulso · movilidad submarina · anclajes magnéticos · linterna de resonancia (modo de la mochila-faro) · estabilizador para atravesar corrientes · campos gravitacionales. La Llave del faro (objeto de progresión) abre el ascensor final. Dónde se obtiene cada una: `WORLD_MAP.md`.
Las **habilidades centrales** garantizan que el mapa se pueda completar; las **armas** abren rutas alternativas y secretos.

### Combate
Estados de animación consistentes, anticipación visible de ataques, respuesta al impacto (destello, retroceso, sonido), invulnerabilidad temporal equilibrada y daño bien comunicado.

### Exploración y recompensas
Secretos con contenido (grabaciones, fragmentos, mejoras), no relleno. El jugador debe *ver* lugares que todavía no alcanza para recordarlos al volver.

### Decisiones
Sin medidor de bondad. Cada estación plantea un conflicto práctico, y sus consecuencias se ven en personajes, rutas, iluminación, radio y misiones.
Un guardián puede **posponerse**: el jugador puede explorar otras regiones antes de vencerlo. Mientras tanto la estación queda pendiente (por ejemplo `F_desierto = pendiente`), la ciudad no finge que esté resuelta y las escenas de esa decisión siguen esperando.

### Los ocho fragmentos y los finales
Cada fragmento es una parte del protocolo original de Madre Faro y revela una decisión tomada durante el Gran Hundimiento.
- **La última luz:** destruyes a Madre Faro. La ciudad sobrevive; los guardianes quedan como máquinas silenciosas. La ciudad celebra; el piloto no lo disfruta del todo.
- **El amanecer:** con los ocho fragmentos, reconstruyes a Madre Faro con límites que le impiden imponer decisiones. La ciudad debe aprender a gobernarse; Madre Faro debe aprender a confiar.
Ningún final juzga al jugador. La pregunta central: ¿la seguridad absoluta vale el precio de la libertad?

---

## 6. Dirección artística

**Referencia canónica:** el piloto HD ilustrado (hojas en `arte/`).
Rasgos obligatorios: armadura roja y dorada, traje gris oscuro, casco abierto con visor cian, bufanda naranja, mochila-faro luminosa, tecnología retrofuturista.

**Estilo de todo el juego:** ilustración 2D con contornos limpios, sombreado tipo cel, materiales legibles, arquitectura retrofuturista, luces cian y fondos con profundidad (capas de parallax).

**Reglas:**
- Nada de rectángulos o círculos como arte final.
- Sprites con transparencia real, proporciones consistentes y animaciones en atlas con metadatos.
- El entorno se diseña alrededor de la escala del piloto. La colisión es independiente del dibujo.
- Cada estación tiene una paleta propia, pero comparte iluminación, grosor de línea y nivel de detalle.

**Lila:** ver su ficha en §4 (descripción en palabras; sin imagen personal en el repositorio).

**Paleta del Desierto Solar:** cielo violeta al atardecer, sol ámbar, arenisca ocre, metal azul pizarra, vidrio solar cian, acentos naranjas.

## 7. Audio
- Exploración: música ambiental melancólica.
- Combate y jefes: temas enérgicos.
- Silencios con intención en momentos narrativos.
- Sonidos mecánicos característicos de cada estación.
La música chiptune actual es provisional.

---

## 8. Reglas narrativas (para escribir contenido)
1. Diálogo de acción: máximo 2 líneas por intervención.
2. Ningún personaje explica el giro antes de tiempo; se insinúa con detalles.
3. Cada guardián revela su motivo después de ser vencido (memoria, grabación o cambio en el entorno).
4. El humor nunca se usa para restarle peso a una muerte o a una pérdida.
5. Los habitantes de la ciudad tienen historias propias que avanzan entre estaciones.
6. La narrativa funciona en tres niveles: historia principal, historias de habitantes y narrativa ambiental (lo que se ve en los escenarios).
