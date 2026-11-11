# Convenciones — BarberíaRiri

## 1. Colores semánticos

Inspirados en el poste de barbería. Todos los contrastes están medidos con la fórmula de WCAG 2.x (ADR-005).

| Rol | Claro | Oscuro | Uso | Contraste |
|---|---|---|---|---|
| Primario | `#1E3A5F` marino | `#8FB3E0` azul claro | Botones y elementos activos | 11,5:1 (texto blanco) · 8,2:1 (texto carbón) |
| Acento | `#C9A227` dorado | `#D4AF37` | Sellos y estrellas, **solo como fondo** | 7,2:1 · 8,4:1 (texto oscuro encima) |
| Éxito | `#15803D` | `#4ADE80` | Confirmaciones | 5,0:1 · 8,6:1 |
| Error | `#B91C1C` | `#F87171` | Errores, siempre con ícono | 6,1:1 · 5,4:1 |
| Decorativo | `#B91C1C` | — | **Solo** el logo y la franja del poste | — |
| Fondo / superficie | `#FAF7F2` / `#FFFFFF` | `#18181B` / `#27272A` | — | — |
| Texto / secundario | `#1C1917` / `#57534E` | `#F5F5F4` / `#A8A29E` | — | 16,4 · 7,1 / 16,2 · 7,0 |
| Primario hover / activo | `#2B4C77` / `#152B47` | `#A9C5EA` / `#7AA1D4` | Estados del botón primario | 8,7 · 14,3 / 9,9 · 6,6 |
| Primario suave | `#E3EAF3` | `#23344A` | Fondo de lo seleccionado | 9,5 (marino) · 5,8 (azul claro) |
| Superficie 2 | `#F3EEE6` | `#202024` | Bloques "Mañana"/"Tarde", resúmenes | 6,6 · 6,4 (secundario) |
| Borde de control | `#78716C` | `#8B8B94` | Bordes de inputs, tarjetas y horarios | 4,5 · 5,3 (≥3:1) |

> El éxito `#15803D` sobre Superficie 2 da 4,3:1: no usarlo como texto ahí (GOT-08).

## 2. Escala tipográfica

Escala modular de aproximadamente 1,25.

| Nivel | Fuente | Tamaño | Interlineado |
|---|---|---|---|
| h1 | Oswald | 32px | 1.2 |
| h2 | Oswald | 24px | 1.2 |
| h3 | Oswald | 20px | 1.2 |
| Texto | Inter | 16px (mínimo para leer) | 1.5 |
| Texto chico | Inter | 14px | 1.5 |
| Caption | Inter | 12px | 1.5 |

Los precios y los horarios van en **Inter semibold**.

## 3. Los 5 estados de los componentes

| Estado | Botón primario | Tarjeta de servicio o barbero | Horario |
|---|---|---|---|
| **Default** | Marino con `shadow-sm` | Superficie con borde de 1px | Borde y texto de la hora |
| **Hover** | Un tono más claro, `shadow-md` | Borde primario y sombra | Fondo primario suave |
| **Active** | `scale-[0.98]` y un tono más oscuro | `scale-[0.98]` | `scale-[0.98]` |
| **Focus** | `focus-visible`: anillo de 3px con separación de 2px (marino en modo claro, azul claro en oscuro) | Igual | Igual |
| **Disabled** | `opacity-50`, `cursor-not-allowed` | — | `disabled`, tachado y la palabra **"Ocupado"** |
| *Seleccionado* | — | Borde de 2px, ícono de check y `aria-pressed="true"` | Fondo primario y check |

Para los botones, los 5 estados se escriben juntos en la misma lista de clases. Los nombres de clase van **siempre completos**: el CDN de Tailwind no genera clases armadas por concatenación (ver GOT-11).

## 4. Espaciado (Gestalt)

Escala base de 8px: 4 · 8 · 16 · 24 · 32 · 48.

| Principio | Regla |
|---|---|
| **Proximidad** | 8px dentro de un grupo (título y precio), 16px entre elementos de una tarjeta, 24 a 32px entre grupos o secciones. |
| **Semejanza** | Todas las tarjetas de un mismo tipo comparten anatomía, tamaño y orden. Las categorías se distinguen con un badge. Botones, campos y etiquetas usan `CLS` de `app.js` (en el HTML, con `data-cls`). |
| **Región común** | Cada tarjeta es una superficie con borde y `rounded-xl`. Los horarios se agrupan en los bloques "Mañana" y "Tarde". |
| **Continuidad** | La barra de progreso del asistente une los pasos 1 a 4. |
| **Figura y fondo** | Los modales llevan un fondo oscurecido al 50% y la superficie elevada. |

Las zonas táctiles miden **48px como mínimo**. La base de diseño es el celular de 360px.

**Grillas:**
- Tarjetas: 1 columna en el celular, 2 en tablet y 3 en computadora.
- Horarios: 3 columnas en el celular y 6 en computadora.

## 5. Reglas WCAG AA

1. Contraste de **4.5:1** para el texto y de **3:1** para los bordes de controles y los anillos de foco.
2. Ningún estado depende solo del color: se agrega texto o ícono.
3. Todo se puede hacer con el teclado y el foco siempre es visible.
4. Cada campo tiene su `<label>`. Los errores se asocian con `aria-describedby` y se marcan con `aria-invalid`.
5. Las imágenes tienen un `alt` descriptivo (`alt=""` si son decorativas).
6. Se respeta `prefers-reduced-motion`.

## 6. Código

- `<button>` para las acciones y `<a href="#/…">` para la navegación.
- Eventos con `addEventListener`.
- `localStorage` solo a través de `leerStorage` y `guardarStorage`.
- Formatos con `Intl` en `es-AR`: "$12.000", "sáb 14/11", horario de 24 horas.
- Textos de la interfaz con voseo y con las etiquetas de `glosario.md`.
