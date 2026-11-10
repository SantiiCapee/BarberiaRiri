# Errores conocidos — BarberíaRiri

> Errores comunes a prevenir (GOT) y registro de bugs reales (ERR). Revisar antes de cerrar cualquier tarea.

## Usabilidad

| ID | Error | Solución |
|---|---|---|
| GOT-01 | Al volver un paso de la reserva se borra lo que el usuario eligió (le pasa a Graciela) | El estado vive en el objeto `borrador`, guardado en `br:borrador`. "Volver" solo cambia de paso. |
| GOT-02 | Mostrar un estado solo con color | Libre, ocupado, seleccionado y error llevan también texto o ícono: "Ocupado" tachado, check, ícono de error. |
| GOT-03 | Textos con jerga técnica | Usar siempre el rotulado de `glosario.md` §3. |
| GOT-04 | Precios y fechas en otro formato | `Intl` en `es-AR`: "$12.000", "sáb 14/11", 24 horas. |
| GOT-05 | Errores del formulario que aparecen recién al enviar | Validar al salir de cada campo y mostrar el error debajo, con ícono y texto. |

## Contraste en modo claro

| ID | Error | Solución |
|---|---|---|
| GOT-06 | Dorado `#C9A227` usado como texto sobre crema: **2,3:1**, no cumple | El dorado va solo como fondo, con texto `#1C1917` encima (7,2:1). |
| GOT-07 | Rojo en botones | El rojo significa error. "Cancelar turno" es un botón secundario con borde, y la confirmación la da el modal. |
| GOT-08 | Usar un color nuevo sin medirlo | Medir el contraste antes de usarlo y agregarlo a la tabla de `convenciones.md`. |

## Foco y teclado

| ID | Error | Solución |
|---|---|---|
| GOT-09 | Elementos clickeables que no son `<button>` ni `<a>` | Usar siempre etiquetas reales; nunca un `div` con evento de clic. |
| GOT-10 | En los modales el foco se escapa o no cierran con Esc | Funciones comunes `abrirModal` y `cerrarModal`: atrapan el foco, cierran con Esc y devuelven el foco al elemento que abrió el modal. |
| GOT-11 | El anillo de foco no aparece porque el CDN de Tailwind no genera clases concatenadas (`'ring-' + c`) | Escribir los nombres de clase completos. |
| GOT-12 | Al cambiar de vista, el foco queda en una vista oculta | El router mueve el foco al `<h1>` de la vista nueva (`tabindex="-1"`). |

## Responsive en el celular

| ID | Error | Solución |
|---|---|---|
| GOT-13 | La grilla de horarios o el resumen desbordan a 360px | Grilla de 3 columnas con `min-w-0` y `break-words`. Buscar el elemento que desborda en lugar de tapar el problema con `overflow-x: hidden`. |
| GOT-14 | La barra inferior tapa el botón "Confirmar turno" | Dejar un `padding-bottom` en `<main>` igual a la altura de la barra más `env(safe-area-inset-bottom)`. |
| GOT-15 | Zonas táctiles menores a 48px | Usar `min-h-12` y `min-w-12` en todos los controles. |
| GOT-16 | Parpadeo del modo claro al cargar con el modo oscuro guardado | Aplicar la clase `dark` con un script corto en el `<head>`. |

## Técnicos

| ID | Error | Solución |
|---|---|---|
| GOT-17 | Leer o escribir `localStorage` sin `try/catch` | Usar solo `leerStorage` y `guardarStorage`; si fallan, la app sigue sin persistencia. |
| GOT-18 | Fechas corridas por la zona horaria | Guardar las fechas como `AAAA-MM-DD` y las horas como `HH:MM`, sin `Date` en UTC. |
| GOT-19 | Un elemento con `hidden` igual se ve porque tiene `flex`/`grid`/`inline-flex` de Tailwind | `style.css` fuerza `[hidden] { display: none !important; }`. |

## Registro de bugs

_Sin bugs registrados todavía._ Formato: `ERR-XXX · fecha · síntoma · causa raíz · fix · prevención`.
