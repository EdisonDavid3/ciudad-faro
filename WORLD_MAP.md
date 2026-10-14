# WORLD_MAP — Ciudad Faro: El Último Eco

Estructura prevista del mundo. Es un esquema de progresión, no un mapa geográfico definitivo.

---

## 1. Vista general

```
                        ┌──────────────────────┐
                        │   ESTACIÓN ORBITAL   │  Zona final
                        │        Cenit         │  (requiere ascensor del faro + Campo)
                        └──────────▲───────────┘
                                   │
                        ┌──────────┴───────────┐
                        │    MINA DE CRISTAL   │  Zona final
                        │        Prisma        │
                        └───▲──────────────▲───┘
                            │              │
          ┌─────────────────┴──┐        ┌──┴─────────────────┐
          │ INVERNADERO BIOMEC.│        │ TORRE DE TORMENTAS │  Rutas avanzadas
          │       Vesper       │◄──────►│       Nimbus       │
          └────────▲───────────┘        └───────────▲────────┘
                   │                                │
          ┌────────┴───────────┐        ┌───────────┴────────┐
          │ PLATAFORMA HUNDIDA │        │   REACTOR HELADO   │  Apertura intermedia
          │      Nereida       │◄──────►│       Boreal       │
          └────────▲───────────┘        └───────────▲────────┘
                   │                                │
          ┌────────┴───────────┐        ┌───────────┴────────┐
          │   DESIERTO SOLAR   │        │ FÁBRICA ENGRANAJES │  Regiones iniciales
          │     Heliostato     │        │     Horologio      │
          └────────▲───────────┘        └───────────▲────────┘
                   │                                │
                   └────────────┬───────────────────┘
                        ┌───────┴────────┐
                        │  CIUDAD FARO   │  Base central
                        └────────────────┘
```

Las flechas dobles (◄──►) son **conexiones entre regiones** que se descubren al explorar, no solo desde la ciudad.

---

## 2. Ciudad Faro (base)

| Zona | Función | Disponible |
|---|---|---|
| Muelle de llegada | Punto de partida hacia las regiones (barcazas, teleférico, ascensor del faro) | Desde el inicio |
| Taller de Lira | Mejoras, conversaciones, mapa | Desde el inicio |
| Plaza del Faro | Centro social; cambia según la energía recuperada | Desde el inicio |
| Barrio Apagado | Familia de Lira; se ilumina (o no) según tus decisiones | Desde el inicio, a oscuras |
| Mercado de pontones | Tienda, misiones de habitantes | Tras la Estación 1 |
| Base del faro | Ascensor a la Estación Orbital | Final |
| Pasadizos bajo los pontones | Secretos, atajos | Con habilidades de movimiento |

**Cambios visibles al recuperar el Desierto Solar:** se encienden faroles de la plaza, abre el mercado, aparece un habitante nuevo; según la decisión moral, el Barrio Apagado recupera luz o una radio anuncia un corte en otro asentamiento.

---

## 3. Habilidades y bloqueos

### Habilidades centrales (garantizan completar el juego)
| Habilidad | Dónde se obtiene | Abre |
|---|---|---|
| Dash, pared, disparo cargado | Desde el inicio | Movimiento básico |
| Botas de impulso (dash aéreo) | Desierto Solar, cámaras de reserva | Huecos anchos, rutas de la tormenta |
| Doble impulso | Fábrica de Engranajes | Paredes altas, segundas mitades de regiones |
| Movilidad submarina | Plataforma Hundida | Zonas inundadas de todo el mapa |
| Anclajes magnéticos | Taller de Lira (tras 4 estaciones) | Techos, cruces largos |
| Atravesar corrientes | Torre de Tormentas | Corrientes de aire y agua |

### Armas de guardianes (rutas alternativas y secretos)
Rayo Solar (derrite bloqueos de vidrio) · Lanza de Escarcha (plataformas de hielo) · Pulso Abisal (compuertas) · Raíz Viva (anclajes orgánicos) · Pulso Magnético (mecanismos) · Arco Voltaico (circuitos) · Haz Prismático (rebotes) · Campo Gravitacional (trayectorias).

### Regla anti-bloqueo
- Toda ruta **obligatoria** se abre solo con habilidades centrales.
- Las armas abren únicamente rutas **opcionales**, atajos y secretos.
- Ninguna puerta se cierra detrás del jugador sin una salida alternativa.
- El validador de depuración comprobará que cada sala obligatoria sea alcanzable con el conjunto de habilidades disponible en ese punto.

---

## 4. Leyenda del mapa en el juego

| Símbolo | Significado |
|---|---|
| Sala iluminada | Visitada |
| Sala gris | Vista pero no visitada |
| Puerta con icono | Bloqueada; el icono indica la habilidad necesaria |
| Ancla dorada | Punto de control y viaje rápido |
| Rombo cian | Secreto encontrado |
| Signo de interrogación | Secreto detectado, no alcanzado |

---

## 5. Desierto Solar (detalle)

Región inicial, 25–40 minutos en una primera partida.

```
        [A1] Llegada ─ [A2] Cementerio de paneles ─ [A3] Vehículos enterrados ─ [A4] Mirador
         │                     │ (secreto ↑ pared)          │                       │
         │                     └── [S1] Núcleo de reserva   │                       │
         │                                                   ▼                       ▼
         │                                        [B1] Refugio de la tormenta ─ [B2] Corredor de vidrio
         │                                                   │                       │ (viento)
         │                                     ruta oculta ──┤                  [B3] Dunas cristalizadas
         │                                                   ▼                       │
         │                                        [C1] Acceso a reservas ◄──────────┘
         │                                                   │
         │                              [C2] Galería de baterías ─ [C3] Refugio civil (robot farolero)
         │                                         │                       │
         │                              [C4] Cápsula de la ingeniera (Botas de impulso)
         │                                         │
         └──── atajo de regreso (requiere Botas) ──┤
                                                   ▼
                                       [D1] Sala de espejos ─ [D2] Encuentro con Sable
                                                   │
                                       [D3] Antesala del corazón (punto de control)
                                                   │
                                       [D4] Arena de Heliostato
                                                   │
                                       [D5] Reserva oculta (revelación + decisión)
```

| Área | Salas | Introduce | Habilidad necesaria |
|---|---|---|---|
| A · Cementerio solar exterior | A1–A4, S1 | Correr, disparar, saltar, dash, pared | Ninguna |
| B · Tormenta de vidrio | B1–B3 | Viento, refugios, enemigos que usan el clima | Ninguna (ruta oculta opcional) |
| C · Cámaras de reserva | C1–C4 | Primera revelación narrativa; Botas de impulso | Ninguna para entrar |
| D · Corazón de la estación | D1–D5 | Espejos de energía, Sable, Heliostato | Botas de impulso para el atajo |

### Secretos del Desierto Solar
| Secreto | Ubicación | Requiere |
|---|---|---|
| Núcleo de reserva (+4 energía) | Sobre A2, subiendo por la pared | Pared |
| Grabación de la ingeniera | Vehículo enterrado en A3 | Rayo Solar (al volver) |
| Fragmento 1 | Bajo las dunas de B3 | Botas de impulso |
| Cámara sellada de vidrio | Junto a C2 | Rayo Solar (derrite el vidrio) |
| Ruta de regreso al Reactor Helado | Fondo de C3 | Lanza de Escarcha (región futura) |
