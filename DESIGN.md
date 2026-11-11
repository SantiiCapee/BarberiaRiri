# Sistema de diseño — BarberíaRiri

Resumen de lo que la app ya usa. El detalle (contrastes medidos, estados, reglas WCAG) está en [`docs/contexto/convenciones.md`](docs/contexto/convenciones.md).

## Dónde vive cada cosa

| Qué | Archivo |
|---|---|
| Colores (tokens `--c-*`, modo claro y oscuro) | `style.css` → `:root` y `.dark` |
| Nombres de color, escala tipográfica y fuentes para Tailwind | `index.html` → `tailwind.config` |
| Componentes (listas de clases) | `app.js` → `FOCO`, `BTN_BASE`, `RECUADRO` y `CLS` |

En el HTML, un elemento toma su componente con `data-cls="nombre"`; en `app.js`, con `${CLS.nombre}`. Si cambiás un componente en `CLS`, se actualiza en toda la app.

## Tokens

**Colores** (se usan como `bg-primario`, `text-error`, `border-borde-control`, etc.):
`fondo` · `superficie` · `superficie-2` · `texto` · `secundario` · `primario` (+ `hover`, `activo`, `suave`) · `sobre-primario` · `acento` · `sobre-acento` · `exito` · `error` · `advertencia` · `borde` · `borde-control`. Los colores del poste (`poste-rojo/azul/blanco`) no cambian con el modo oscuro.

**Tipografía:** Oswald para títulos (`font-titulo`) e Inter para el texto (`font-texto`).

| Clase | Tamaño | Uso |
|---|---|---|
| `text-h1` | 32px | Título de pantalla |
| `text-h2` | 24px | Título de sección, datos destacados |
| `text-body` | 16px | Texto, botones, errores, ayudas y estados vacíos |
| `text-small` | 14px | Datos secundarios, barra inferior, pie |
| `text-caption` | 12px | Badges, contadores, rótulos en mayúsculas |

Pesos: `font-semibold` para acciones y datos, `font-medium` para etiquetas de ajustes, `font-bold` solo para el monto a pagar y el contador de avisos.

**Espaciado:** 4 · 8 · 16 · 24 · 32px (`1`, `2`, `4`, `6`, `8` de Tailwind).

**Radios:** `rounded-xl` (12px) para botones, campos y tarjetas · `rounded-lg` (8px) para horarios y pestañas · `rounded-full` para badges, avatares e interruptores · 20px para los diálogos.

**Sombras:** `shadow-sm` (reposo) → `shadow-md` (hover) · `shadow-lg` para el aviso flotante.

**Movimiento:** 150ms para cambios de estado · 200ms para entradas y salidas (vistas, aviso flotante, diálogos), con `ease-out` al entrar y `ease-in` al salir. Con "reducir movimiento" no se anima nada.

**Breakpoints:** `sm` 640px · `md` 768px (aparece la nav superior y se va la barra inferior) · `lg` 1024px. Se diseña primero para un celular de 360px.

## Componentes (`CLS`)

| Nivel | Componentes |
|---|---|
| **Átomos** | `btnPrimario`, `btnSecundario`, `btnPeligro` (los tres sobre `BTN_BASE`), `btnTexto`, `btnIcono`, `btnIconoBorde`, `campo`, `etiqueta`, `errorCampo`, `badge`, `avatar`, `radio`, `radioNativo`, `interruptor`, `icono()` |
| **Moléculas** | Campo completo (etiqueta + ayuda + `campo` + `errorCampo`), `opcion`, `opcionPunteada`, `opcionRadio`, `dia`, `hora`, `pestania`, `recuadro`, `tarjeta`, `panelLista`, `vacio`, aviso flotante |
| **Organismos** | Barra superior, menú principal (nav o barra inferior), asistente de reserva de 4 pasos, formulario de datos y seña, listas de servicios, barberos y turnos, agenda, diálogos |

Todos los componentes interactivos tienen los estados hover, active, focus (`FOCO`) y disabled.
