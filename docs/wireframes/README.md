# Wireframes low-fi — BarberíaRiri

Un solo archivo: **`wireframes-flujo-lowfi.svg`**. Tiene 10 pantallas Mobile en cajas grises (sin textos reales ni estilo) unidas por flechas, para ver **el flujo** de la app.

## Cómo pasarlo a Figma

1. Arrastrá `wireframes-flujo-lowfi.svg` al lienzo de Figma.
2. Cada pantalla es un grupo con su nombre (`01 Inicio`…) y las flechas están en el grupo `Flujo`. Los textos vienen **convertidos a contornos** (vectores): así Figma no los parte ni los encima. Para cambiar un rótulo, borrá ese vector y escribí encima con la herramienta Texto (`T`).
3. Opcional: seleccioná una pantalla → clic derecho → **Frame selection** (`Ctrl+Alt+G`) para hacerla frame y prototipar.

## Flujo

| Desde | Acción | Hacia |
|---|---|---|
| 01 Inicio | Reservar turno | 02 Servicio → 03 Barbero → 04 Fecha y hora → 05 Datos y seña |
| 01 Inicio | Repetir mi último corte (atajo) | 04 Fecha y hora |
| 05 Datos y seña | Confirmar turno → Pagar | 05b Pago (simulado) → 06 Turno confirmado |
| 06 Turno confirmado | Ir a Mis turnos | 07 Mis turnos |
| 07 Mis turnos | Pestaña Perfil | 08 Perfil |
| 08 Perfil | Soy barbero | 09 Barbero · Agenda |

Flecha llena = acción principal · flecha punteada = atajo o pestaña.
