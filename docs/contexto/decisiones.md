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

**[ADR-005] · [2026-11-10 16:02] — Paleta inspirada en el poste de barbería** · Aprobada
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
- **How:** se conservan 38 skills de Tailwind, diseño, accesibilidad WCAG, UX, JavaScript puro y SDD. También se borró la infraestructura del repositorio (plugins y app Node/Supabase). El detalle está en `.agents/skills/SKILLS-CONSERVADAS.md` y la lista de las podadas en `.agents/SKILLS_PODADAS.txt`.
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

---

## Pendientes

_Ninguno._
