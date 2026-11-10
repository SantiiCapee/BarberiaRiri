# Flujo de trabajo — BarberíaRiri

## 1. DCU + SDD

El ciclo de Diseño Centrado en el Usuario (ISO 9241-210) se recorre con las fases de Spec-Driven Development:

| Fase DCU | Fase SDD | Qué se hace | Fuente |
|---|---|---|---|
| 1. Entender el contexto de uso | **explore** | Repasar las personas (Tomás, Graciela, Riri), el código actual y los errores conocidos | `arquitectura.md`, `errores-conocidos.md` |
| 2. Especificar los requisitos | **propose** | Spec con Why/How, reglas de negocio involucradas y criterios de aceptación | `glosario.md`, `decisiones.md` |
| 3. Diseñar soluciones | **tasks** + **apply** | Desglosar en tareas y maquetar fiel al frame de Figma, con los 5 estados | Figma, `convenciones.md` |
| 4. Evaluar contra los requisitos | **verify** | Checklist de Listo y recorrido de la tarea "en la piel" de cada persona | §3 |

Si la evaluación falla, se vuelve a la fase que corresponda: es un ciclo, no una cascada.

## 2. Camino adaptativo

| Alcance | Camino |
|---|---|
| Ajuste acotado a un componente o vista (un texto, un estilo, un bug puntual) | **Fast-Path**: apply → verify → resumen breve |
| Vista o flujo nuevo, cambios en varias vistas, o reglas de negocio | **SDD completo** (§1). Hay que esperar aprobación en *propose* si se tocan reglas de negocio |
| Cambio importante (arquitectura, paleta, framework, borrado de archivos) | Pedir **autorización explícita** → aplicar → registrar una ADR |

## 3. Checklist de Listo (DoD)

- [ ] Es fiel al frame de Figma correspondiente.
- [ ] A 360px (F12) no hay scroll horizontal.
- [ ] Se puede usar al 100% con teclado: Tab, Enter y Esc.
- [ ] Cumple el contraste WCAG AA en los modos claro y oscuro.
- [ ] Los flujos funcionan de punta a punta:
  - reserva con seña,
  - cancelación con aviso a la lista de espera,
  - "Repetir mi último corte".
- [ ] Botones, tarjetas y horarios tienen los 5 estados.
- [ ] No hay errores en la consola.
- [ ] Los textos usan el rotulado de `glosario.md`.
- [ ] No aparece ninguno de los GOT de `errores-conocidos.md`.
- [ ] El código está limpio: sin `console.log`, sin código muerto y sin estilos inline.
- [ ] Si se tomó alguna decisión, quedó registrada como ADR.

## 4. Plan de construcción

1. Estructura HTML y navegación entre vistas.
2. Sistema de diseño: tokens, tipografía y componentes base con sus 5 estados.
3. Flujo de reserva completo.
4. Mis turnos, lista de espera y turno liberado.
5. Vista del barbero y del dueño.
6. Modo oscuro y responsive.
7. Revisión de accesibilidad.

## 5. Sesiones

- **Al empezar:** leer la memoria y `docs/contexto/`.
- **Al terminar:** actualizar los documentos afectados, registrar las ADR y guardar los aprendizajes en la memoria.
