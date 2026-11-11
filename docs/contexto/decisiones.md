# Decisiones — BarberíaRiri

> Registro **numérico y cronológico**, con formato `[ADR-XXX] · [AAAA-MM-DD HH:mm]` (hora de Argentina).
> Todo requerimiento o ajuste acordado se registra acá.
> **Guard:** los cambios importantes (arquitectura, paleta semántica, framework, borrado de archivos, reglas de negocio) necesitan **autorización explícita** antes de aplicarse.

---

**[ADR-001] · [2026-11-10 15:56] — Operating System del proyecto** · Aprobada
6 reglas basadas en Gentle-AI, guardadas en `.agents/rules/antigravity_rules.md` (always_on). El Master Context vive en `docs/contexto/`.

**[ADR-002] · [2026-11-10 15:56] — Stack con Vite y TypeScript** · *Reemplazada por ADR-003*
SPA con Vite, TypeScript y Tailwind, y persistencia en IndexedDB o LocalStorage.

**[ADR-003] · [2026-11-10 16:02] — Un solo index.html con JavaScript puro y Tailwind por CDN** · Aprobada
- **Why:** es una entrega académica limitada a lo visto en clase, y debe poder abrirse sin pasos de build.
- **How:** Tailwind v3 por CDN (`darkMode: 'class'`), Google Fonts y `localStorage`. Lo que está prohibido figura en "Qué NO existe" de `arquitectura.md`.
- **Trade-off:** no hay chequeo de tipos, y el CDN compila en el navegador, lo que sirve para la entrega pero no para producción.

**[ADR-004] · [2026-11-10 16:02] — Barra inferior en el celular y ruteo por hash** · Aprobada
- **Why:** Tomás usa el celular con una mano; Graciela necesita poder volver atrás.
- **How:** pestañas inferiores fijas en lugar del menú hamburguesa, y el botón "atrás" funcionando gracias al hash.

**[ADR-005] · [2026-11-10 16:02] — Paleta inspirada en el poste de barbería** · Aprobada · Ajustada por ADR-019 (rojo de borde en botones destructivos)
- **Why:** identidad de barbería clásica, sin que el rojo choque con su significado de error.
- **How:** marino como primario. El rojo queda solo para el logo, la franja decorativa y los errores, y nunca en botones. El dorado va solo como fondo. Los tokens están en `convenciones.md`.

**[ADR-006] · [2026-11-10 16:02] — Integraciones simuladas** · Aprobada
- **Mercado Pago:** modal de demostración.
- **WhatsApp:** link `wa.me` con texto prearmado.
- **Calendario:** archivo `.ics` o link de Google Calendar.
- **Cómo llegar:** link a Google Maps.
- **Notificaciones:** dentro de la app.

**[ADR-007] · [2026-11-10 16:02] — Vista del barbero sin login** · Propuesta → *aprobada en ADR-010*
"Soy barbero" abre un selector de barbero (Riri, Nico o Lucho); si se elige al dueño (Riri), aparece la pestaña "Local". Es solo una demostración, sin seguridad real.

**[ADR-008] · [2026-11-10 16:02] — Reglas de negocio iniciales (RN-01 a RN-09)** · Aprobada
Surgen de la entrevista UX. El detalle está en `glosario.md` §2.

**[ADR-009] · [2026-11-10 16:07] — Reglas de negocio RN-10 a RN-15** · Aprobada
Se aprueban las propuestas P-01 a P-06: bloques consecutivos, política de cancelación, tarjeta de sellos, ventana de reserva, turno liberado y reprogramación. El detalle está en `glosario.md` §2.

**[ADR-010] · [2026-11-10 16:08] — Aprobación del ADR-007** · Aprobada
El acceso a la vista del barbero sin login queda aprobado.

**[ADR-011] · [2026-11-10 16:10] — Reestructuración del Master Context** · Aprobada
- **Cambios en los documentos:**
  - Cada documento se lee en menos de 2 minutos.
  - Las ADR llevan fecha y hora.
  - Las reglas de negocio pasan a `glosario.md`.
  - Se agrega el ciclo DCU al flujo de trabajo.
  - Se agrega el espaciado Gestalt a las convenciones.
  - Se agrega el mapa de frames de Figma a la arquitectura.
- **Contenido del producto:** sin cambios.

**[ADR-012] · [2026-11-10 19:19] — Poda de la biblioteca de skills** · Aprobada (pedido explícito del usuario)
- **Why:** de 2.860 skills, casi todas apuntaban a tecnologías que no existen en el proyecto (React, Node, Python, apps nativas, etc.).
- **How:** se conservan 38 skills de Tailwind, diseño, accesibilidad WCAG, UX, JavaScript puro y SDD. También se borró la infraestructura del repositorio (plugins y app Node/Supabase). (Actualizado por ADR-023: quedan 18 skills en `.claude/skills/`.)
- **Trade-off:** el `.git` del clon (85 MB) se conserva para poder restaurar cualquier skill.

**[ADR-013] · [2026-11-10 16:29] — Wireframes low-fi de las pantallas principales** · Aprobada (pedido explícito del usuario)
- **Why:** la entrega pide wireframes low-fi en Figma que respeten Gestalt y jerarquía visual.
- **How:** un solo SVG importable a Figma (`docs/wireframes/wireframes-flujo-lowfi.svg`) con 10 pantallas en cajas grises (01 a 09, más 05b el modal de pago) unidas por flechas de flujo. A pedido del usuario se simplificó: sin textos de detalle ni notas, sólo para ver el flujo. Los nombres de frame confirman la tabla de `arquitectura.md`.
- **Trade-off:** sólo Mobile 360; Desktop 1280 queda para el mid-fi.

**[ADR-014] · [2026-11-10 17:23] — Maquetación del wireframe en index.html + style.css + app.js** · Aprobada (pedido explícito del usuario)
- **Why:** el usuario pidió entregar el código separado en tres archivos; se gana legibilidad sin sumar herramientas de build.
- **How:** ajusta ADR-003. Sigue sin build: Tailwind v3 por CDN y JS puro. `style.css` define los tokens como variables RGB (claro y `.dark`) que `tailwind.config` consume, más lo que Tailwind CDN no resuelve (safe-area, `prefers-reduced-motion`, `::backdrop`). Los modales usan `<dialog>` nativo. Las 10 pantallas del wireframe (01 a 09 + 05b) quedan como vistas del router por hash.
- **Trade-off:** hay que servir los tres archivos juntos; abrir `index.html` con doble clic también funciona.

**[ADR-015] · [2026-11-11 16:30] — Ajustes por la Clase 1 (Mindset del Desarrollador UX)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión contra la Clase 1 marcó 4 puntos sin cumplir: formularios, texto legible, textos sin errores y acciones destructivas.
- **How:**
  - Teléfono de Perfil con la misma ayuda y validación que el Paso 4.
  - Textos informativos de 11px suben a 12px.
  - "mostrarles".
  - "Cancelar turno" pasa a botón de texto, con menos peso que "Reprogramar".
  - En el diálogo de cancelación, "No, mantener turno" es el principal y va primero.
  - Mientras se procesa el pago, el diálogo no se puede cerrar; si se cierra igual, el pago se anula.
- **Trade-off:** se respeta ADR-005, así que la distinción es por jerarquía y orden, no por color rojo.

**[ADR-016] · [2026-11-11 17:30] — Ajustes por la Clase 2 (Usabilidad y Accesibilidad)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión WCAG marcó botones deshabilitados con contraste de 2.8:1, indicadores que dependían solo del color, un salto de títulos y el enlace "Saltar al contenido" roto.
- **How:**
  - Los botones deshabilitados dejan `opacity-50` y usan `superficie-2`/`secundario` con borde `borde-control`: 6.4:1 o más en los dos modos.
  - La pestaña activa se marca con píldora rellena (celular) y subrayado (escritorio).
  - La pestaña seleccionada de Mis turnos lleva borde `primario`.
  - Los avisos nuevos muestran el texto "Nuevo".
  - Los turnos de Mis turnos pasan de h3 a h2.
  - "Saltar al contenido" enfoca el título de la vista sin cambiar de ruta.
- **Trade-off:** no cambia ningún token de la paleta; todos los colores de texto ya cumplían 4.5:1.

**[ADR-017] · [2026-11-11 18:15] — Ajustes por la Clase 3 (Modelos mentales y Affordance)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó botones de texto sin forma, dos acciones principales en Mis turnos, íconos sin tooltip o con doble significado, vocabulario interno, posiciones inconsistentes y selecciones que no se reflejaban.
- **How:**
  - Los botones de texto van subrayados siempre.
  - "Reservar" del recuadro de Mis turnos pasa a secundario.
  - Los botones de ícono llevan `title`.
  - "No vino" usa el ícono de alerta (la X queda para cerrar) y "Soy barbero" pierde la tijera (queda para reservar/corte).
  - "Franja" → "Horario".
  - En "¿Cancelar el turno?", confirmar va arriba y descartar abajo, con `autofocus` en la opción segura. Ajusta el orden de ADR-015.
  - La barra de los Pasos 1 y 2 muestra lo elegido.
  - La lista de espera se ordena por fecha.
- **Trade-off:** no cambia ningún color ni el foco; se mantiene ADR-005.

**[ADR-018] · [2026-11-11 19:57] — Ajustes por la Clase 4 (Gestalt y Jerarquía Visual)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó espaciados fuera de la escala de 8px, botones y campos copiados con diferencias, desalineación en el Paso 2, datos clave chicos, demasiados primarios en la Agenda y un recuadro arriba del h1 en Mis turnos.
- **How:**
  - Layout en la escala 4·8·16·24·32: 16px entre tarjetas y botones, 24px entre campos, 32px entre secciones y arriba de cada vista.
  - Botones, campos y etiquetas del HTML toman su clase de `CLS` con `data-cls` (una sola definición).
  - "Mañana/Tarde" de la Agenda y "Tarjeta de sellos" pasan a 24px, igual que los demás títulos de sección.
  - Jerarquía por tamaño: Total del Paso 4, "Día y hora" de Confirmado (primera fila) y la fecha de cada turno.
  - Perfil: "Guardar preferencias" es el primario; "Soy barbero" deja de ocupar todo el ancho.
  - Agenda: "Llegó" pasa a secundario y "No vino" a texto.
  - Mis turnos: el h1 va primero y "¿Otro corte?" baja debajo de los turnos.
- **Trade-off:** las acciones destructivas siguen sin rojo por ADR-005 (decisión del usuario); se distinguen por jerarquía, orden y estilo de texto.

**[ADR-019] · [2026-11-11 17:11] — Ajustes por la Clase 5 (Estética funcional)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó acciones destructivas en el color primario, un "Llegó" en azul, avisos informativos con el ✓ de éxito, una advertencia en gris, hex sueltos, tamaños de letra fuera de escala y estilos de botón copiados.
- **How:**
  - Nuevo `btnPeligro` (borde y texto rojo de error, sin relleno) para "Cancelar turno" y "Sí, cancelar turno". **Reemplaza la regla "nunca rojo en botones" de ADR-005**: el rojo sigue sin usarse como relleno, y la opción segura sigue siendo el primario con el foco.
  - "Llegó" del historial pasa a verde de éxito; el toast distingue `exito` / `error` / `info`.
  - Nuevo token `advertencia` (#B45309 / #FBBF24) para "Faltan menos de 2 horas".
  - Tokens `poste-azul` y `poste-blanco` y una constante para `theme-color`.
  - Escala `text-h1/h2/body/caption` en la configuración de Tailwind; se eliminan 14px, 18px, 20px, 30px y 48px. Errores y avisos quedan en 16px.
  - Nuevas clases `btnIcono` y `opcionRadio`; el checkbox de la política suma hover y active.
- **Trade-off:** las ayudas y la letra chica bajan de 14 a 12px (mantienen contraste ≥ 7:1); "Día y hora" y el Total del resumen pasan a 24px para conservar la jerarquía de ADR-018.

**[ADR-020] · [2026-11-11 20:23] — Ajustes por la Clase 6 (Diseñar para humanos)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó botones de 40px, el pago sin indicador de carga, turnos próximos sin estado visible, la lista de espera sin decir si ya avisamos, el email pedido en cada pago, la campana sin texto y un paso repetido al reservar desde un barbero de Inicio.
- **How:**
  - "Cambiar", "Dejarlo como estaba", "Deshacer" y "Bloquear" vuelven a 48px (GOT-15).
  - "Pagar" muestra un spinner (quieto con movimiento reducido) y `aria-busy` mientras procesa.
  - Próximos turnos con la etiqueta "Confirmado"; la lista de espera dice "Esperando…" o "Te avisamos: se liberó un turno".
  - El email del comprobante se guarda en `br:perfil` y se precarga.
  - La campana lleva el texto "Avisos" debajo, como las pestañas.
  - Si el barbero se eligió en Inicio, "Continuar" del Paso 1 va directo a Fecha y hora (`barberoDesdeInicio`). Se puede cambiar con Volver o "Cambiar".
- **Trade-off:** el aviso de Personas y Journey Map (F de la Clase 6) queda pendiente hasta tener los datos reales de la investigación.

**[ADR-021] · [2026-11-11 21:10] — Ajustes por la Clase 7 (Arquitectura de Información)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó que en modo barbero el logo lo sacaba de su menú, botones genéricos ("Pagar", "Salir"), nombres distintos para lo mismo y una sección "Preferencias" que también guardaba datos personales.
- **How:**
  - En modo barbero, el logo lleva a la Agenda.
  - "Pagar" → "Pagar seña"; "Salir" → "Salir del modo barbero" (en celular se ve "Salir" por espacio, el resto lo lee el lector de pantalla).
  - Perfil: "Preferencias" → "Tus datos y preferencias"; "Guardar preferencias" → "Guardar cambios".
  - Unificados: "Cualquier barbero disponible", "Reservó en la app", "Reservar turno", "Tus datos y seña" y el menú se llama "Principal" en celular y escritorio.
  - Mapa del sitio en `arquitectura.md`.
- **Trade-off:** no se hizo card sorting (no lo pide la EFI); la agrupación se justifica por las tareas del cliente y del barbero (ADR-003, ADR-004).

**[ADR-022] · [2026-11-11 17:42] — Ajustes por la Clase 8 (Prototipado interactivo)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó que las pantallas cambiaban de golpe, que el aviso flotante desaparecía de golpe, que el punto del radio no se animaba y que había estilos copiados a mano (títulos, pestañas, interruptores, errores y radios).
- **How:**
  - Cada vista entra con un fundido de 200ms; el aviso flotante sale con otro de 200ms. Con movimiento reducido no se animan.
  - Al elegir servicio o barbero solo cambia `aria-pressed` (la lista no se redibuja): el punto del radio se anima y el foco no salta.
  - Nuevos estilos en `CLS`: `tituloVista`, `tituloSeccion`, `pestania`, `interruptor`, `errorCampo` y `radioNativo`. "Soy barbero" usa `opcionRadio`. Se ven igual que antes.
- **Trade-off:** los diálogos siguen cerrándose sin animación (el `<dialog>` nativo necesita CSS más nuevo para animar la salida). Falta el link al prototipo de Figma y las capturas de la evolución boceto → prototipo.

**[ADR-023] · [2026-11-11 17:46] — Segunda poda de skills para ahorrar tokens** · Aprobada (pedido explícito del usuario)
- **Why:** analizar el proyecto consumía muchos tokens. `.agents/skills/` era una copia exacta (87 MB) de las skills de `.claude/skills/`, y varias skills hacían lo mismo. Sus descripciones se cargan en cada sesión.
- **How:**
  - Se borró `.agents/skills/` (el repositorio clonado) y `.agents/SKILLS_PODADAS.txt`.
  - De `.claude/skills/` quedan 18: `better-accessibility`, `better-colors`, `better-interface`, `better-layout`, `better-typography`, `design-token-contrast`, `frontend-design`, `frontend-security-coder`, `modern-javascript-patterns`, `spec-driven-development`, `tailwind-design-system`, `ui-states`, `ux-audit`, `ux-copy`, `ux-feedback`, `ux-flow`, `verification-before-completion` y `web-design-system`.
  - Se sacaron 20 skills que se pisaban o no aplican (Figma, DevTools MCP, Codex, animaciones).
- **Trade-off:** las skills borradas solo se recuperan desde el historial de git o volviendo a clonar `sickn33/agentic-awesome-skills`.

**[ADR-024] · [2026-11-11 22:30] — Ajustes por la Clase 9 (Sistemas de diseño y microinteracciones)** · Aprobada (pedido explícito del usuario)
- **Why:** la revisión marcó que los diálogos se cerraban de golpe, que los botones repetían la misma base en tres variantes, que había 7 recuadros escritos a mano aunque existía `CLS.tarjeta` y que faltaba un resumen del sistema de diseño.
- **How:**
  - Los diálogos bajan y se desvanecen en 200ms al cerrarse, y el fondo oscuro aparece y se va con un fundido. Es solo CSS: `close()` sigue siendo inmediato. Resuelve el trade-off de ADR-022.
  - `BTN_BASE` en `app.js`: base común de `btnPrimario`, `btnSecundario` y `btnPeligro`.
  - `RECUADRO` + `CLS.recuadro`, `CLS.tarjeta` y `CLS.panelLista` reemplazan los recuadros escritos a mano.
  - `accent-[rgb(var(--c-primario))]` → `accent-primario`.
  - Nuevo `DESIGN.md` con tokens y componentes.
  - Las clases que se aplican son las mismas que antes: la app se ve igual.
- **Trade-off:** en navegadores sin transiciones discretas (Firefox) los diálogos se siguen cerrando sin animación.

**[ADR-025] · [2026-11-11 18:03] — Auditoría de UX Writing y accesibilidad** · Aprobada (pedido explícito del usuario)
- **Why:** la auditoría encontró ayudas en 12px (poco para Graciela), botones desactivados que el teclado no alcanza, avisos de error que se iban a los 5s, "Continuar" sin destino, estados vacíos sin próximo paso y botones "Cancelar" ambiguos.
- **How:**
  - Nuevo tamaño `text-small` (14px). Las ayudas, motivos y estados vacíos pasan a `text-body` (16px). `text-caption` queda para badges y rótulos (convenciones §2).
  - "Continuar a Barbero / Fecha y hora / tus datos" y "Confirmar turno" usan `aria-disabled` en vez de `disabled`: si se tocan sin completar, el motivo se pone en rojo con ícono y el foco va a lo que falta.
  - Los avisos de error quedan fijos, con borde rojo y botón "Cerrar aviso", y se anuncian con `role="alert"`.
  - Diálogos: "Volver sin pagar" (pago) y "Volver" (Soy barbero) en vez de "Cancelar". Al cancelar con menos de 2 horas, la pérdida de la seña va en un recuadro de advertencia con ícono.
  - Textos nuevos: "¿Qué te querés hacer?", "Sin lugar" para días llenos (borde punteado), estados vacíos de Avisos, Historial, Lista de espera y Clientes con ícono y próximo paso, errores de email y horario ocupado con la solución, y el aviso de "Soy barbero" pasa de error a info.
  - "Repetir mi último corte" se oculta hasta el primer turno; en su lugar se explica para qué sirve.
  - Se actualizaron el glosario (§3), las convenciones (§2, §3 y §5) y `DESIGN.md`.
- **Trade-off:** los avisos de error ahora hay que cerrarlos a mano.

---

## Pendientes

- Documentar Personas (Tomás, Graciela, Riri) y el User Journey Map con datos reales de la investigación (Clase 6).
- Definir cuándo y cómo se devuelve la seña al cancelar a tiempo.
- Sumar a `docs/wireframes/README.md` el link real al prototipo de Figma y las capturas de bocetos y prototipo (Clase 8).