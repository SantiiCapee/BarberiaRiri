# Arquitectura — BarberíaRiri

> App de turnos de una barbería de barrio en Río Cuarto. El cliente reserva en menos de un minuto (servicio → barbero → horario → seña) y el barbero ve su agenda del día. Ver ADR-003 y ADR-004.

## Stack

| Capa | Tecnología |
|---|---|
| Marcado | HTML5 semántico en `index.html` (ADR-014) |
| Estilos | **Tailwind CSS v3 por CDN** (`darkMode: 'class'`); los tokens son variables RGB en `style.css` que consume `tailwind.config` |
| Lógica | **JavaScript puro** (ES2020+) en `app.js` (`defer`) |
| Fuentes | Google Fonts: Oswald (títulos) e Inter (textos) |
| Datos | Arrays de JS (catálogo) + `localStorage` con prefijo `br:` (turnos, lista de espera, perfil, sellos, tema, borrador) |

## Router SPA

- Ruteo por **hash** (`#/inicio`, `#/reservar/1`…`4`, `#/reservar/confirmado`, `#/mis-turnos`, `#/perfil`, `#/barbero/agenda`…).
- Un `<section data-vista>` por vista; el router muestra una y oculta las demás con `hidden`.
- Al cambiar de vista, el foco pasa al `<h1>` de la vista nueva.
- Funcionan el botón "atrás" del navegador y el del celular.

## Vistas y relación con los frames de Figma

Cada vista corresponde a un frame del prototipo, en dos tamaños: **Mobile 360** y **Desktop 1280**.

| Ruta | Vista | Frame de Figma |
|---|---|---|
| `#/inicio` | Hero "Reservá tu turno en 1 minuto", "Repetir mi último corte", próximo turno, barberos | `01 Inicio` |
| `#/reservar/1` | Paso 1: Servicio | `02 Reservar · Servicio` |
| `#/reservar/2` | Paso 2: Barbero | `03 Reservar · Barbero` |
| `#/reservar/3` | Paso 3: Fecha y hora | `04 Reservar · Fecha y hora` |
| `#/reservar/4` | Paso 4: Tus datos y seña (+ modal de pago simulado) | `05 Reservar · Datos y seña` |
| `#/reservar/confirmado` | Turno confirmado | `06 Turno confirmado` |
| `#/mis-turnos` | Próximos, Historial, detalle del turno y lista de espera | `07 Mis turnos` |
| `#/perfil` | Tarjeta de sellos, preferencias de corte y datos | `08 Perfil` |
| `#/barbero/*` | Agenda, Clientes, Mi galería y Local (solo el dueño) | `09 Barbero · …` |

> Los wireframes low-fi de estos frames (más `05b Modal de pago`) están en `docs/wireframes/` (ADR-013).

**Partes fijas en todas las vistas:**
- Barra superior: logo, alternador de modo claro/oscuro y notificaciones.
- Barra inferior de pestañas (solo en el celular).
- Footer.

## Flujos clave

1. **Reserva con seña:** pasos 1 a 4 → modal simulado de Mercado Pago → se guarda en `br:turnos` → "Turno confirmado".
2. **Cancelación:** se marca el turno como cancelado, se busca quién coincide en `br:espera` y se le avisa con "Turno liberado".
3. **Repetir mi último corte:** se precargan servicio, barbero y datos, y se salta al paso 3.

## Qué NO existe

- **Frameworks:** ni React, Vue o Angular; ni Vite, TypeScript o herramientas de build.
- **Backend:** ni API, Node, Express o Python; ni SQL o Firebase. Tampoco hay login real (ver ADR-007).
- **Integraciones reales:** Mercado Pago, WhatsApp y Google Calendar se simulan (ADR-006).
- **Estilos y librerías:** nada de estilos inline (`style="..."`) ni librerías de JS. Sin telemetría.
