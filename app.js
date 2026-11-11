'use strict';

/* BarberíaRiri — SPA en JavaScript puro.
   Reglas de negocio: docs/contexto/glosario.md §2 (RN-xx). */

// ============ Catálogo ============
const SERVICIOS = [
  { id: 'clasico', nombre: 'Corte clásico', duracion: 30, precio: 12000 },
  { id: 'fade', nombre: 'Fade / degradé', duracion: 40, precio: 14000 },
  { id: 'barba', nombre: 'Perfilado de barba', duracion: 20, precio: 8000 },
  { id: 'toalla', nombre: 'Barba con toalla caliente', duracion: 30, precio: 10000 },
  { id: 'combo', nombre: 'Combo corte + barba', duracion: 60, precio: 20000, badge: 'Más pedido' },
  { id: 'ninos', nombre: 'Corte niños (hasta 12 años)', duracion: 25, precio: 9000 },
];

const BARBEROS = [
  { id: 'riri', nombre: 'Riri', especialidad: 'Fades y diseños', puntaje: 4.9, duenio: true },
  { id: 'nico', nombre: 'Nico', especialidad: 'Barba y navaja', puntaje: 4.8 },
  { id: 'lucho', nombre: 'Lucho', especialidad: 'Cortes clásicos y niños', puntaje: 4.7 },
];

const FRANJAS = {
  manana: { nombre: 'Mañana', desde: '09:00', hasta: '12:30' }, // RN-01
  tarde: { nombre: 'Tarde', desde: '15:00', hasta: '20:30' },
};

const CLIENTES_DEMO = ['Martín G.', 'Lucas P.', 'Joaquín R.', 'Facundo M.', 'Agustín L.', 'Bruno S.', 'Santiago T.', 'Mateo F.', 'Franco D.', 'Julián B.', 'Nahuel C.', 'Ezequiel V.'];
const GALERIA = ['Fade bajo con diseño', 'Pompadour', 'Barba perfilada', 'Buzz cut', 'Mid fade texturizado', 'Clásico con raya'];

const BLOQUE_MIN = 30;
const PORCENTAJE_SENA = 0.3;   // RN-02
const DIAS_RESERVA = 14;       // RN-13
const HORAS_SIN_CARGO = 2;     // RN-11
const SELLOS_PREMIO = 10;      // RN-12
const DIAS_SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

// ============ Clases (nombres completos: GOT-11) ============
const FOCO = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo';
const CLS = {
  btnPrimario: `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-primario px-5 font-semibold text-sobre-primario shadow-sm transition duration-150 hover:bg-primario-hover hover:shadow-md active:scale-[0.98] active:bg-primario-activo ${FOCO} disabled:cursor-not-allowed disabled:border-borde-control disabled:bg-superficie-2 disabled:text-secundario disabled:shadow-none disabled:hover:bg-superficie-2 disabled:hover:shadow-none disabled:active:scale-100`,
  btnSecundario: `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-primario bg-superficie px-4 font-semibold text-primario transition duration-150 hover:bg-primario-suave active:scale-[0.98] active:bg-primario-suave ${FOCO} disabled:cursor-not-allowed disabled:border-borde-control disabled:text-secundario disabled:hover:bg-superficie disabled:active:scale-100`,
  btnTexto: `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 font-semibold text-primario underline decoration-1 underline-offset-4 transition hover:bg-primario-suave hover:decoration-2 active:scale-[0.98] ${FOCO} disabled:cursor-not-allowed disabled:text-secundario disabled:no-underline disabled:hover:bg-transparent`,
  opcion: `group flex w-full min-h-12 items-center gap-4 rounded-xl border border-borde-control bg-superficie p-4 text-left transition duration-150 hover:border-primario hover:shadow-md active:scale-[0.98] ${FOCO} aria-pressed:border-2 aria-pressed:border-primario aria-pressed:bg-primario-suave aria-pressed:p-[15px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-borde-control disabled:hover:shadow-none`,
  opcionPunteada: `group flex w-full min-h-12 items-center gap-4 rounded-xl border-2 border-dashed border-borde-control bg-superficie p-[15px] text-left transition duration-150 hover:border-primario hover:shadow-md active:scale-[0.98] ${FOCO} aria-pressed:border-solid aria-pressed:border-primario aria-pressed:bg-primario-suave disabled:cursor-not-allowed disabled:opacity-50`,
  radio: 'grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-borde-control group-aria-pressed:border-primario',
  radioPunto: 'h-3 w-3 scale-0 rounded-full bg-primario transition group-aria-pressed:scale-100',
  dia: `flex min-h-16 w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-xl border border-borde-control bg-superficie px-2 py-2 transition duration-150 hover:border-primario hover:bg-primario-suave active:scale-[0.98] ${FOCO} aria-pressed:border-primario aria-pressed:bg-primario aria-pressed:text-sobre-primario disabled:cursor-not-allowed disabled:opacity-50`,
  hora: `flex min-h-12 min-w-0 flex-col items-center justify-center rounded-lg border border-borde-control bg-superficie px-1 py-1 font-semibold text-texto transition duration-150 hover:border-primario hover:bg-primario-suave active:scale-[0.98] ${FOCO} aria-pressed:border-primario aria-pressed:bg-primario aria-pressed:text-sobre-primario disabled:cursor-not-allowed disabled:border-dashed disabled:bg-superficie-2 disabled:font-normal disabled:text-secundario disabled:line-through disabled:hover:border-borde-control disabled:hover:bg-superficie-2 disabled:active:scale-100`,
  tarjeta: 'rounded-xl border border-borde bg-superficie p-4',
  badge: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
  avatar: 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primario-suave font-titulo text-xl font-semibold text-primario',
};

// ============ Íconos (SVG inline, sin librerías) ============
const ICONOS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circulo': '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  inicio: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  tijera: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  usuarios: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 3.13a4 4 0 0 1 0 7.75M22 21a7 7 0 0 0-4-6.3"/>',
  campana: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  luna: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'chevron-izq': '<path d="m15 18-6-6 6-6"/>',
  'chevron-der': '<path d="m9 18 6-6-6-6"/>',
  reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mensaje: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 12 3.1a8.5 8.5 0 0 1 9 8.4z"/>',
  mapa: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  alerta: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  repetir: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  imagen: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  tienda: '<path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  candado: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  estrella: '<path fill="currentColor" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
};

function icono(nombre, clases = 'h-5 w-5') {
  return `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${clases}">${ICONOS[nombre] || ''}</svg>`;
}

// ============ Utilidades ============
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

function esc(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

const formatoPesos = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const precio = (monto) => formatoPesos.format(monto).replace(/\s/g, '');
const puntaje = (n) => n.toLocaleString('es-AR', { minimumFractionDigits: 1 });

// Fechas como AAAA-MM-DD y horas como HH:MM, siempre en hora local (GOT-18)
const dos = (n) => String(n).padStart(2, '0');
const isoDe = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
const fechaDe = (iso) => { const [a, m, d] = iso.split('-').map(Number); return new Date(a, m - 1, d); };
const hoyISO = () => isoDe(new Date());
const sumarDias = (iso, n) => { const d = fechaDe(iso); d.setDate(d.getDate() + n); return isoDe(d); };
const minutos = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const hhmm = (min) => `${dos(Math.floor(min / 60))}:${dos(min % 60)}`;
const ahoraMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const formatoDia = (iso) => { const d = fechaDe(iso); return `${DIAS_SEMANA[d.getDay()]} ${dos(d.getDate())}/${dos(d.getMonth() + 1)}`; };
const esDomingo = (iso) => fechaDe(iso).getDay() === 0;

function esPasado(fecha, hora) {
  const hoy = hoyISO();
  return fecha < hoy || (fecha === hoy && minutos(hora) <= ahoraMin());
}

function minutosHasta(fecha, hora) {
  const d = fechaDe(fecha);
  d.setHours(0, minutos(hora), 0, 0);
  return (d.getTime() - Date.now()) / 60000;
}

// RN-13: hasta 14 días hacia adelante, de lunes a sábado
function diasReservables() {
  const hoy = hoyISO();
  const dias = [];
  for (let i = 0; i <= DIAS_RESERVA; i++) {
    const iso = sumarDias(hoy, i);
    if (!esDomingo(iso)) dias.push(iso);
  }
  return dias;
}

function franjaDe(hora) {
  return minutos(hora) < minutos(FRANJAS.tarde.desde) ? 'manana' : 'tarde';
}

function bloquesDeFranja(clave) {
  const f = FRANJAS[clave];
  const lista = [];
  for (let m = minutos(f.desde); m <= minutos(f.hasta); m += BLOQUE_MIN) lista.push(hhmm(m));
  return lista;
}

const servicioPorId = (id) => SERVICIOS.find((s) => s.id === id);
const barberoPorId = (id) => BARBEROS.find((b) => b.id === id);
const bloquesNecesarios = (servicio) => Math.ceil(servicio.duracion / BLOQUE_MIN); // RN-10
const montoSena = (servicio) => Math.round(servicio.precio * PORCENTAJE_SENA);   // RN-02

// Número pseudoaleatorio estable (0–1) para simular la ocupación de otros clientes
function azar(semilla) {
  let h = 2166136261;
  for (let i = 0; i < semilla.length; i++) {
    h ^= semilla.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

// ============ Persistencia (GOT-17) ============
const PREFIJO = 'br:';

function leerStorage(clave, porDefecto) {
  try {
    const valor = localStorage.getItem(PREFIJO + clave);
    return valor === null ? porDefecto : JSON.parse(valor);
  } catch {
    return porDefecto;
  }
}

function guardarStorage(clave, valor) {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento disponible: la app sigue funcionando en memoria.
  }
}

const borradorVacio = () => ({
  servicioId: null, barberoId: null, fecha: null, hora: null,
  nombre: '', telefono: '', pago: 'sena', politica: false, reprogramando: null,
});

const estado = {
  turnos: leerStorage('turnos', []),
  espera: leerStorage('espera', []),
  perfil: { nombre: '', telefono: '', notas: '', recordatorios: true, ...leerStorage('perfil', {}) },
  sellosBase: leerStorage('sellos', 6),
  borrador: { ...borradorVacio(), ...leerStorage('borrador', {}) },
  notificaciones: leerStorage('notificaciones', []),
  asistencia: leerStorage('asistencia', {}),
  bloqueos: leerStorage('bloqueos', {}),
  barbero: leerStorage('barbero', null),
  ultimo: leerStorage('ultimo', null),
  pestaniaTurnos: 'proximos',
  agendaFecha: hoyISO(),
  cancelando: null,
  primeraCarga: true,
};

const guardarBorrador = () => guardarStorage('borrador', estado.borrador);
const guardarTurnos = () => guardarStorage('turnos', estado.turnos);

// ============ Disponibilidad ============
const cacheDemo = new Map();

// Turnos de otros clientes, generados de forma estable por barbero y día
function turnosDemo(barberoId, fecha) {
  const clave = `${barberoId}|${fecha}`;
  if (cacheDemo.has(clave)) return cacheDemo.get(clave);
  const lista = [];
  for (const franja of Object.keys(FRANJAS)) {
    const bloques = bloquesDeFranja(franja);
    let i = 0;
    while (i < bloques.length) {
      if (azar(clave + bloques[i]) < 0.3) {
        const servicio = SERVICIOS[Math.floor(azar(clave + bloques[i] + 's') * SERVICIOS.length)];
        const n = bloquesNecesarios(servicio);
        if (i + n <= bloques.length) {
          const cliente = CLIENTES_DEMO[Math.floor(azar(clave + bloques[i] + 'c') * CLIENTES_DEMO.length)];
          lista.push({ hora: bloques[i], servicioId: servicio.id, barberoId, fecha, nombre: cliente, demo: true });
          i += n;
          continue;
        }
      }
      i++;
    }
  }
  cacheDemo.set(clave, lista);
  return lista;
}

const turnosActivos = () => estado.turnos.filter((t) => t.estado !== 'cancelado');

function turnosDelDia(barberoId, fecha, excluirCodigo = null) {
  const propios = turnosActivos().filter((t) => t.barberoId === barberoId && t.fecha === fecha && t.codigo !== excluirCodigo);
  return [...turnosDemo(barberoId, fecha), ...propios].sort((a, b) => minutos(a.hora) - minutos(b.hora));
}

function bloquesOcupados(barberoId, fecha, excluirCodigo) {
  const ocupados = new Set(estado.bloqueos[`${barberoId}|${fecha}`] || []);
  for (const t of turnosDelDia(barberoId, fecha, excluirCodigo)) {
    const n = bloquesNecesarios(servicioPorId(t.servicioId));
    for (let k = 0; k < n; k++) ocupados.add(hhmm(minutos(t.hora) + k * BLOQUE_MIN));
  }
  return ocupados;
}

// RN-10: el servicio necesita todos sus bloques consecutivos libres dentro de la franja
function disponible(barberoId, fecha, hora, servicio, excluirCodigo = null) {
  if (esDomingo(fecha) || esPasado(fecha, hora)) return false;
  const bloques = bloquesDeFranja(franjaDe(hora));
  const inicio = bloques.indexOf(hora);
  const n = bloquesNecesarios(servicio);
  if (inicio < 0 || inicio + n > bloques.length) return false;
  const ocupados = bloquesOcupados(barberoId, fecha, excluirCodigo);
  return bloques.slice(inicio, inicio + n).every((b) => !ocupados.has(b));
}

// RN-04: "Cualquier barbero disponible" asigna el primero libre
function barberoAsignable(barberoId, fecha, hora, servicio, excluirCodigo) {
  if (barberoId !== 'cualquiera') return disponible(barberoId, fecha, hora, servicio, excluirCodigo) ? barberoId : null;
  const libre = BARBEROS.find((b) => disponible(b.id, fecha, hora, servicio, excluirCodigo));
  return libre ? libre.id : null;
}

function horariosLibres(fecha, franja) {
  const b = estado.borrador;
  const servicio = servicioPorId(b.servicioId);
  return bloquesDeFranja(franja).filter((h) => barberoAsignable(b.barberoId, fecha, h, servicio, b.reprogramando));
}

// ============ Avisos (toast) y notificaciones ============
let temporizadorToast = null;

function toast(mensaje, tipo = 'info') {
  const caja = $('#toast');
  const iconoTipo = tipo === 'error' ? icono('alerta', 'h-5 w-5 shrink-0 text-error') : icono('check-circulo', 'h-5 w-5 shrink-0 text-exito');
  caja.innerHTML = `<p class="toast-mensaje flex items-start gap-3 rounded-xl border border-borde bg-superficie p-4 text-sm font-medium text-texto shadow-lg">${iconoTipo}<span>${esc(mensaje)}</span></p>`;
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => { caja.innerHTML = ''; }, 5000);
}

function notificar(titulo, texto, accion = null) {
  estado.notificaciones.unshift({ id: Date.now() + Math.random(), titulo, texto, accion, leida: false, creada: Date.now() });
  estado.notificaciones = estado.notificaciones.slice(0, 30);
  guardarStorage('notificaciones', estado.notificaciones);
  pintarContadorAvisos();
}

function pintarContadorAvisos() {
  const sinLeer = estado.notificaciones.filter((n) => !n.leida).length;
  const contador = $('#avisos-contador');
  contador.hidden = sinLeer === 0;
  contador.textContent = sinLeer > 9 ? '9+' : String(sinLeer);
  const etiqueta = sinLeer ? `Avisos, ${sinLeer} sin leer` : 'Avisos';
  $('#btn-avisos').setAttribute('aria-label', etiqueta);
  $('#btn-avisos').title = etiqueta;
}

function pintarAvisos() {
  const lista = $('#avisos-lista');
  if (!estado.notificaciones.length) {
    lista.innerHTML = '<li class="rounded-xl bg-superficie-2 p-4 text-center text-secundario">No tenés avisos por ahora.</li>';
    return;
  }
  lista.innerHTML = estado.notificaciones.map((n) => `
    <li class="${CLS.tarjeta} ${n.leida ? '' : 'border-primario'}">
      <p class="font-semibold">${n.leida ? '' : `<span class="${CLS.badge} mr-2 bg-primario-suave text-primario">Nuevo</span>`}${esc(n.titulo)}</p>
      <p class="text-sm text-secundario">${esc(n.texto)}</p>
      ${n.accion ? `<button type="button" class="${CLS.btnSecundario} mt-3 w-full" data-accion="reservar-liberado" data-id="${n.id}">Reservar ese horario</button>` : ''}
    </li>`).join('');
}

// ============ Modales (GOT-10) ============
let origenFoco = null;

function abrirModal(id) {
  const dialogo = $(id);
  origenFoco = document.activeElement;
  dialogo.showModal();
}

function cerrarModal(id) {
  const dialogo = $(id);
  if (dialogo.open) dialogo.close();
}

// ============ Navegación ============
const RUTAS = {
  '/inicio': { vista: 'inicio', titulo: 'Reservá tu turno' },
  '/reservar/1': { vista: 'paso1', titulo: 'Servicio', paso: 1 },
  '/reservar/2': { vista: 'paso2', titulo: 'Barbero', paso: 2 },
  '/reservar/3': { vista: 'paso3', titulo: 'Fecha y hora', paso: 3 },
  '/reservar/4': { vista: 'paso4', titulo: 'Tus datos y seña', paso: 4 },
  '/reservar/confirmado': { vista: 'confirmado', titulo: 'Turno confirmado' },
  '/mis-turnos': { vista: 'mis-turnos', titulo: 'Mis turnos' },
  '/perfil': { vista: 'perfil', titulo: 'Perfil' },
  '/barbero/agenda': { vista: 'agenda', titulo: 'Agenda', barbero: true },
  '/barbero/clientes': { vista: 'clientes', titulo: 'Clientes', barbero: true },
  '/barbero/galeria': { vista: 'galeria', titulo: 'Mi galería', barbero: true },
  '/barbero/local': { vista: 'local', titulo: 'Local', barbero: true, soloDuenio: true },
};

const PESTANIAS_CLIENTE = [
  { ruta: '/inicio', texto: 'Inicio', icono: 'inicio' },
  { ruta: '/reservar/1', texto: 'Reservar', icono: 'tijera', prefijo: '/reservar' },
  { ruta: '/mis-turnos', texto: 'Mis turnos', icono: 'calendario' },
  { ruta: '/perfil', texto: 'Perfil', icono: 'usuario' },
];

function pestaniasBarbero() {
  const lista = [
    { ruta: '/barbero/agenda', texto: 'Agenda', icono: 'calendario' },
    { ruta: '/barbero/clientes', texto: 'Clientes', icono: 'usuarios' },
    { ruta: '/barbero/galeria', texto: 'Mi galería', icono: 'imagen' },
  ];
  if (barberoPorId(estado.barbero)?.duenio) lista.push({ ruta: '/barbero/local', texto: 'Local', icono: 'tienda' }); // RN-07
  return lista;
}

// Primer paso que falta completar; el asistente no deja saltear pasos
function pasoPermitido() {
  const b = estado.borrador;
  if (!b.servicioId) return 1;
  if (!b.barberoId) return 2;
  if (!b.fecha || !b.hora) return 3;
  return 4;
}

function irA(ruta) {
  if (location.hash === `#${ruta}`) router();
  else location.hash = ruta;
}

function router() {
  const ruta = location.hash.slice(1) || '/inicio';
  const def = RUTAS[ruta];
  if (!def) return location.replace('#/inicio');

  if (def.paso) {
    if (estado.borrador.reprogramando && def.paso < 3) return location.replace('#/reservar/3');
    const permitido = pasoPermitido();
    if (def.paso > permitido) return location.replace(`#/reservar/${permitido}`);
  }
  if (def.vista === 'confirmado' && !estado.turnos.some((t) => t.codigo === estado.ultimo)) return location.replace('#/inicio');
  if (def.barbero && !estado.barbero) {
    toast('Primero elegí quién sos en "Soy barbero".', 'error');
    return location.replace('#/perfil');
  }
  if (def.soloDuenio && !barberoPorId(estado.barbero)?.duenio) return location.replace('#/barbero/agenda');

  $$('[data-vista]').forEach((s) => { s.hidden = s.dataset.vista !== def.vista; });
  document.title = `${def.titulo} · BarberíaRiri`;
  pintarNavegacion(ruta, Boolean(def.barbero));
  RENDER[def.vista]?.();

  if (estado.primeraCarga) {
    estado.primeraCarga = false;
  } else {
    window.scrollTo(0, 0);
    $(`[data-vista="${def.vista}"] h1`)?.focus({ preventScroll: true }); // GOT-12
  }
}

function pintarNavegacion(ruta, modoBarbero) {
  const pestanias = modoBarbero ? pestaniasBarbero() : PESTANIAS_CLIENTE;
  const activa = (p) => ruta === p.ruta || (p.prefijo && ruta.startsWith(p.prefijo));

  $('#tabbar').className = `mx-auto grid max-w-md ${pestanias.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`;
  $('#tabbar').innerHTML = pestanias.map((p) => `
    <li>
      <a href="#${p.ruta}" ${activa(p) ? 'aria-current="page"' : ''}
        class="flex min-h-[4.5rem] flex-col items-center justify-center gap-1 text-xs font-semibold text-secundario transition hover:bg-superficie-2 hover:text-texto active:scale-95 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-primario aria-[current=page]:text-primario">
        <span class="grid h-8 w-12 place-items-center rounded-full ${activa(p) ? 'bg-primario text-sobre-primario' : ''}">${icono(p.icono)}</span>${p.texto}
      </a>
    </li>`).join('');

  $('#nav-escritorio').innerHTML = pestanias.map((p) => `
    <li>
      <a href="#${p.ruta}" ${activa(p) ? 'aria-current="page"' : ''}
        class="inline-flex min-h-12 items-center rounded-xl px-3 font-semibold text-secundario transition hover:bg-superficie-2 hover:text-texto active:scale-[0.98] ${FOCO} aria-[current=page]:bg-primario-suave aria-[current=page]:text-primario aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8">${p.texto}</a>
    </li>`).join('');

  $('#btn-salir-barbero').hidden = !modoBarbero;
}

// ============ Vistas ============
function ultimoTurno() {
  return [...estado.turnos].sort((a, b) => b.creado - a.creado)[0] || null;
}

function proximosTurnos() {
  return estado.turnos
    .filter((t) => t.estado === 'confirmado' && !esPasado(t.fecha, t.hora))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
}

function nombreBarbero(id) {
  return id === 'cualquiera' ? 'Cualquier barbero disponible' : barberoPorId(id)?.nombre ?? '';
}

function pintarInicio() {
  const ultimo = ultimoTurno();
  $('#btn-repetir').disabled = !ultimo;
  $('#ayuda-repetir').textContent = ultimo
    ? `${servicioPorId(ultimo.servicioId).nombre} con ${nombreBarbero(ultimo.barberoId)}. Solo elegís día y horario.`
    : 'Se habilita después de tu primer turno.';

  const proximo = proximosTurnos()[0];
  $('#inicio-destacado').innerHTML = proximo
    ? `<article class="${CLS.tarjeta} shadow-sm" aria-labelledby="t-proximo">
        <p class="text-sm font-semibold uppercase tracking-wide text-secundario">Tu próximo turno</p>
        <h2 id="t-proximo" class="mt-1 font-titulo text-xl font-semibold">${esc(servicioPorId(proximo.servicioId).nombre)}</h2>
        <p class="mt-2 flex items-center gap-2 font-semibold">${icono('calendario')}${formatoDia(proximo.fecha)} · ${proximo.hora}</p>
        <p class="mt-1 flex items-center gap-2 text-secundario">${icono('usuario')}Con ${esc(nombreBarbero(proximo.barberoId))} · ${proximo.codigo}</p>
        <a href="#/mis-turnos" class="${CLS.btnTexto} -ml-3 mt-2">Ver Mis turnos</a>
      </article>`
    : `<article class="${CLS.tarjeta}" aria-labelledby="t-horarios">
        <h2 id="t-horarios" class="font-titulo text-xl font-semibold">Horarios</h2>
        <p class="mt-2 flex items-center gap-2">${icono('reloj')}Lunes a sábado</p>
        <p class="mt-1 pl-7 text-secundario">Mañana de 9 a 13 · Tarde de 15 a 21</p>
        <p class="mt-3 text-sm text-secundario">Podés cancelar o reprogramar sin cargo hasta 2 horas antes.</p>
      </article>`;

  $('#inicio-barberos').innerHTML = BARBEROS.map((b) => `
    <li>
      <button type="button" class="${CLS.opcion} sm:min-h-48 sm:flex-col sm:justify-center sm:text-center" data-accion="reservar-con" data-id="${b.id}">
        <span class="${CLS.avatar} sm:h-16 sm:w-16 sm:text-2xl" aria-hidden="true">${b.nombre[0]}</span>
        <span>
          <span class="block font-titulo text-xl font-semibold">${b.nombre}${b.duenio ? ' <span class="sr-only">(dueño)</span>' : ''}</span>
          <span class="block text-sm text-secundario">${b.especialidad}</span>
          <span class="mt-1 inline-flex items-center gap-1 text-sm font-semibold">${icono('estrella', 'h-4 w-4')}${puntaje(b.puntaje)}<span class="sr-only"> de 5</span></span>
          <span class="sr-only">. Reservar con ${b.nombre}</span>
        </span>
      </button>
    </li>`).join('');
}

function pintarProgreso(paso) {
  const nombres = ['Servicio', 'Barbero', 'Fecha y hora', 'Tus datos'];
  const reprog = estado.borrador.reprogramando;
  const contenedor = $(`[data-progreso="${paso}"]`);
  contenedor.innerHTML = `
    ${reprog ? `<p class="mb-3 flex flex-wrap items-center gap-x-2 rounded-xl bg-primario-suave p-3 text-sm">Estás reprogramando el turno <strong>${esc(reprog)}</strong>.
      <button type="button" class="${CLS.btnTexto} min-h-10 px-2" data-accion="cancelar-reprogramacion">Dejarlo como estaba</button></p>` : ''}
    <p class="text-sm font-semibold text-secundario">Paso ${paso} de 4</p>
    <ol class="mt-2 grid grid-cols-4 gap-1.5" aria-label="Progreso de la reserva">
      ${nombres.map((n, i) => `<li class="h-1.5 rounded-full ${i < paso ? 'bg-primario' : 'bg-borde'}"><span class="sr-only">${n}${i + 1 === paso ? ' (paso actual)' : i < paso ? ' (listo)' : ''}</span></li>`).join('')}
    </ol>`;
}

function pintarBarra(paso, puedeContinuar, motivo) {
  const volver = paso === 1 ? '#/inicio' : `#/reservar/${paso - 1}`;
  const volverReprog = estado.borrador.reprogramando && paso === 3 ? '#/mis-turnos' : volver;
  $(`[data-barra="${paso}"]`).innerHTML = `
    <div class="mx-auto flex max-w-3xl flex-col gap-2">
      ${motivo ? `<p id="motivo-${paso}" class="text-center text-sm text-secundario">${motivo}</p>` : ''}
      <div class="flex gap-3">
        <a href="${volverReprog}" class="${CLS.btnSecundario}">Volver</a>
        <button type="button" class="${CLS.btnPrimario} grow" data-accion="continuar" data-destino="${paso + 1}" ${puedeContinuar ? '' : 'disabled'} ${motivo ? `aria-describedby="motivo-${paso}"` : ''}>Continuar</button>
      </div>
    </div>`;
}

function pintarPaso1() {
  pintarProgreso(1);
  const elegido = estado.borrador.servicioId;
  $('#lista-servicios').innerHTML = SERVICIOS.map((s) => `
    <li>
      <button type="button" class="${CLS.opcion}" data-accion="servicio" data-id="${s.id}" aria-pressed="${s.id === elegido}">
        <span class="${CLS.radio}" aria-hidden="true"><span class="${CLS.radioPunto}"></span></span>
        <span class="min-w-0 grow">
          <span class="block font-semibold">${s.nombre}</span>
          <span class="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-secundario">${s.duracion} min
            ${s.badge ? `<span class="${CLS.badge} bg-acento text-sobre-acento">${s.badge}</span>` : ''}</span>
        </span>
        <span class="shrink-0 font-semibold">${precio(s.precio)}</span>
      </button>
    </li>`).join('');
  const servicio = servicioPorId(elegido);
  pintarBarra(1, Boolean(elegido), servicio ? `${servicio.nombre} · ${precio(servicio.precio)}` : 'Elegí un servicio para continuar.');
}

function pintarPaso2() {
  pintarProgreso(2);
  const elegido = estado.borrador.barberoId;
  $('#lista-barberos').innerHTML = `
    <li>
      <button type="button" class="${CLS.opcionPunteada}" data-accion="barbero" data-id="cualquiera" aria-pressed="${elegido === 'cualquiera'}">
        <span class="${CLS.radio}" aria-hidden="true"><span class="${CLS.radioPunto}"></span></span>
        <span class="grow"><span class="block font-semibold">Cualquier barbero disponible</span>
        <span class="block text-sm text-secundario">Te mostramos más horarios y asignamos uno libre.</span></span>
        ${icono('usuarios', 'h-6 w-6 shrink-0 text-secundario')}
      </button>
    </li>
    ${BARBEROS.map((b) => `
    <li>
      <button type="button" class="${CLS.opcion}" data-accion="barbero" data-id="${b.id}" aria-pressed="${elegido === b.id}">
        <span class="${CLS.avatar}" aria-hidden="true">${b.nombre[0]}</span>
        <span class="grow">
          <span class="block font-semibold">${b.nombre}${b.duenio ? ' <span class="text-sm font-normal text-secundario">· Dueño</span>' : ''}</span>
          <span class="block text-sm text-secundario">${b.especialidad}</span>
          <span class="inline-flex items-center gap-1 text-sm font-semibold">${icono('estrella', 'h-4 w-4')}${puntaje(b.puntaje)}<span class="sr-only"> de 5</span></span>
        </span>
        <span class="hidden h-6 w-6 shrink-0 place-items-center rounded-full bg-primario text-sobre-primario group-aria-pressed:grid" aria-hidden="true">${icono('check', 'h-4 w-4')}</span>
      </button>
    </li>`).join('')}`;
  const conQuien = elegido === 'cualquiera' ? 'cualquier barbero disponible' : esc(nombreBarbero(elegido));
  pintarBarra(2, Boolean(elegido), elegido ? `${servicioPorId(estado.borrador.servicioId).nombre} con ${conQuien}` : 'Elegí un barbero para continuar.');
}

function pintarPaso3() {
  pintarProgreso(3);
  const b = estado.borrador;
  const servicio = servicioPorId(b.servicioId);
  const dias = diasReservables();

  // Si cambió el servicio o el barbero, el horario elegido puede dejar de servir
  if (b.fecha && !dias.includes(b.fecha)) b.fecha = null;
  if (b.hora && (!b.fecha || !barberoAsignable(b.barberoId, b.fecha, b.hora, servicio, b.reprogramando))) b.hora = null;
  if (!b.fecha) b.fecha = dias.find((d) => horariosLibres(d, 'manana').length + horariosLibres(d, 'tarde').length > 0) || dias[0];
  guardarBorrador();

  $('#paso3-detalle').textContent = `${servicio.nombre} (${servicio.duracion} min) con ${nombreBarbero(b.barberoId)}.`;

  $('#lista-dias').innerHTML = dias.map((d, i) => {
    const libres = horariosLibres(d, 'manana').length + horariosLibres(d, 'tarde').length;
    const [diaSemana, numero] = formatoDia(d).split(' ');
    return `<li>
      <button type="button" class="${CLS.dia}" data-accion="dia" data-fecha="${d}" aria-pressed="${d === b.fecha}">
        <span class="text-xs font-semibold uppercase">${i === 0 ? 'Hoy' : diaSemana}</span>
        <span class="text-base font-semibold">${numero}</span>
        <span class="text-xs leading-tight">${libres ? `${libres} ${libres === 1 ? 'libre' : 'libres'}` : 'Completo'}</span>
      </button>
    </li>`;
  }).join('');

  $('#franjas').innerHTML = Object.keys(FRANJAS).map((clave) => {
    const libres = new Set(horariosLibres(b.fecha, clave));
    const bloques = bloquesDeFranja(clave);
    return `<fieldset class="rounded-xl bg-superficie-2 p-4">
      <legend class="sr-only">${FRANJAS[clave].nombre}</legend>
      <p class="mb-3 font-semibold" aria-hidden="true">${FRANJAS[clave].nombre}</p>
      ${libres.size ? `<div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        ${bloques.map((h) => {
          const libre = libres.has(h);
          const elegido = h === b.hora;
          return `<button type="button" class="${CLS.hora}" data-accion="hora" data-hora="${h}" aria-pressed="${elegido}" ${libre ? '' : 'disabled'}>
            <span class="flex items-center gap-1">${elegido ? icono('check', 'h-4 w-4') : ''}${h}</span>
            ${libre ? '' : '<span class="text-xs no-underline">Ocupado</span>'}
          </button>`;
        }).join('')}
      </div>` : `<p class="text-secundario">Sin horarios libres a la ${FRANJAS[clave].nombre.toLowerCase()}.</p>`}
      ${libres.size <= 2 ? `<button type="button" class="${CLS.btnTexto} -ml-3 mt-2" data-accion="espera-anotar" data-franja="${clave}">Anotarme en la lista de espera</button>` : ''}
    </fieldset>`;
  }).join('');

  pintarBarra(3, Boolean(b.hora), b.hora ? `${formatoDia(b.fecha)} a las ${b.hora}` : 'Elegí un horario para continuar.');
}

function validarCampo(campo, mostrar) {
  const errores = {
    'campo-nombre': (v) => (v.trim().length >= 2 ? '' : 'Escribí tu nombre (mínimo 2 letras).'),
    'campo-telefono': (v) => (/^\d{10}$/.test(v.replace(/\D/g, '')) ? '' : 'El teléfono tiene que tener 10 números, sin 0 ni 15.'),
    'perfil-telefono': (v) => (!v.trim() || /^\d{10}$/.test(v.replace(/\D/g, '')) ? '' : 'El teléfono tiene que tener 10 números, sin 0 ni 15.'),
    'pago-email': (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Revisá el email: falta la @ o el dominio.'),
  };
  const error = errores[campo.id](campo.value);
  if (mostrar || !error) {
    const salida = $(`#${campo.getAttribute('aria-describedby').split(' ').pop()}`);
    campo.setAttribute('aria-invalid', String(Boolean(error)));
    salida.innerHTML = error ? `${icono('alerta', 'h-4 w-4 shrink-0')}${error}` : '';
    salida.classList.toggle('hidden', !error);
    salida.classList.toggle('flex', Boolean(error));
  }
  return !error;
}

// RN-03: Confirmar turno solo con nombre, teléfono de 10 dígitos y política aceptada
function actualizarConfirmar() {
  const b = estado.borrador;
  const faltan = [];
  if (b.nombre.trim().length < 2) faltan.push('tu nombre');
  if (!/^\d{10}$/.test(b.telefono.replace(/\D/g, ''))) faltan.push('un teléfono de 10 números');
  if (!b.politica) faltan.push('aceptar la política de cancelación');
  $('#btn-confirmar').disabled = faltan.length > 0;
  $('#motivo-confirmar').textContent = faltan.length ? `Para confirmar falta: ${faltan.join(', ')}.` : '';
}

function pintarPaso4() {
  pintarProgreso(4);
  const b = estado.borrador;
  if (!b.nombre && estado.perfil.nombre) b.nombre = estado.perfil.nombre;
  if (!b.telefono && estado.perfil.telefono) b.telefono = estado.perfil.telefono;
  const servicio = servicioPorId(b.servicioId);
  const asignado = barberoAsignable(b.barberoId, b.fecha, b.hora, servicio, b.reprogramando);
  const reprog = b.reprogramando ? estado.turnos.find((t) => t.codigo === b.reprogramando) : null;

  const fila = (etiqueta, valor, paso) => `
    <div class="flex items-center gap-3 py-2">
      <dt class="w-24 shrink-0 text-sm text-secundario">${etiqueta}</dt>
      <dd class="min-w-0 grow break-words font-semibold">${valor}</dd>
      ${paso && !(reprog && paso < 3) ? `<dd><a href="#/reservar/${paso}" class="${CLS.btnTexto} min-h-10 px-2">Cambiar<span class="sr-only"> ${etiqueta.toLowerCase()}</span></a></dd>` : ''}
    </div>`;
  $('#resumen-reserva').innerHTML = `
    <dl class="divide-y divide-borde rounded-xl bg-superficie-2 px-4 py-1">
      ${fila('Servicio', `${servicio.nombre} · ${servicio.duracion} min`, 1)}
      ${fila('Barbero', b.barberoId === 'cualquiera' ? `${esc(nombreBarbero(asignado))} <span class="font-normal text-secundario">(asignado)</span>` : esc(nombreBarbero(b.barberoId)), 2)}
      ${fila('Día y hora', `${formatoDia(b.fecha)} · ${b.hora}`, 3)}
      ${fila('Total', precio(servicio.precio))}
    </dl>`;

  $('#campo-nombre').value = b.nombre;
  $('#campo-telefono').value = b.telefono;
  $('#campo-politica').checked = b.politica;
  $$('input[name="pago"]').forEach((r) => { r.checked = r.value === b.pago; });
  $('#monto-sena').textContent = precio(montoSena(servicio));

  $('#grupo-pago').hidden = Boolean(reprog);
  $('#nota-reprogramacion').hidden = !reprog;
  if (reprog) {
    $('#nota-reprogramacion').textContent = reprog.sena
      ? `Mantenés la seña de ${precio(reprog.sena)} que ya pagaste.`
      : 'Pagás el total en el local, como antes.';
  }
  $('#btn-confirmar').textContent = reprog ? 'Confirmar cambio' : 'Confirmar turno';
  actualizarConfirmar();
}

function pintarConfirmado() {
  const t = estado.turnos.find((x) => x.codigo === estado.ultimo);
  const servicio = servicioPorId(t.servicioId);
  const barbero = nombreBarbero(t.barberoId);
  $('#t-confirmado').textContent = t.reprogramado ? '¡Turno reprogramado!' : '¡Turno confirmado!';

  const inicio = `${t.fecha.replaceAll('-', '')}T${t.hora.replace(':', '')}00`;
  const fin = `${t.fecha.replaceAll('-', '')}T${hhmm(minutos(t.hora) + servicio.duracion).replace(':', '')}00`;
  const calendario = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${servicio.nombre} · BarberíaRiri`)}&dates=${inicio}/${fin}&ctz=America/Argentina/Cordoba&details=${encodeURIComponent(`Turno ${t.codigo} con ${barbero}`)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`Tengo turno en BarberíaRiri: ${servicio.nombre} con ${barbero}, ${formatoDia(t.fecha)} a las ${t.hora}. Código ${t.codigo}.`)}`;
  const mapa = 'https://www.google.com/maps/search/?api=1&query=Barber%C3%ADa%20Riri%20R%C3%ADo%20Cuarto';
  const externo = (url, ico, texto) => `
    <a href="${url}" target="_blank" rel="noopener noreferrer"
      class="flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl border border-borde-control bg-superficie p-2 text-sm font-semibold transition hover:border-primario hover:bg-primario-suave active:scale-[0.98] ${FOCO}">
      ${icono(ico, 'h-6 w-6 text-primario')}${texto}<span class="sr-only"> (se abre en otra pestaña)</span></a>`;

  $('#confirmado-detalle').innerHTML = `
    <p class="mx-auto mt-6 w-fit rounded-xl border-2 border-dashed border-borde-control px-6 py-3">
      <span class="block text-sm text-secundario">Código de turno</span>
      <span class="block font-titulo text-3xl font-semibold tracking-wider">${t.codigo}</span>
    </p>
    <dl class="mt-6 divide-y divide-borde rounded-xl border border-borde bg-superficie px-4 py-1 text-left">
      <div class="flex justify-between gap-4 py-2"><dt class="text-secundario">Servicio</dt><dd class="text-right font-semibold">${servicio.nombre}</dd></div>
      <div class="flex justify-between gap-4 py-2"><dt class="text-secundario">Barbero</dt><dd class="font-semibold">${esc(barbero)}</dd></div>
      <div class="flex justify-between gap-4 py-2"><dt class="text-secundario">Día y hora</dt><dd class="font-semibold">${formatoDia(t.fecha)} · ${t.hora}</dd></div>
      <div class="flex justify-between gap-4 py-2"><dt class="text-secundario">${t.sena ? 'Seña pagada' : 'Pago'}</dt><dd class="font-semibold">${t.sena ? precio(t.sena) : 'En el local'}</dd></div>
      <div class="flex justify-between gap-4 py-2"><dt class="text-secundario">A pagar en el local</dt><dd class="font-semibold">${precio(servicio.precio - t.sena)}</dd></div>
    </dl>
    <div class="mt-4 grid grid-cols-3 gap-3">
      ${externo(whatsapp, 'mensaje', 'WhatsApp')}
      ${externo(calendario, 'calendario', 'Calendario')}
      ${externo(mapa, 'mapa', 'Cómo llegar')}
    </div>
    <a href="#/mis-turnos" class="${CLS.btnPrimario} mt-6 w-full">Ir a Mis turnos</a>`;
}

const ETIQUETA_ESTADO = {
  cancelado: ['Cancelado', 'bg-superficie-2 text-secundario'],
  llego: ['Llegó', 'bg-primario-suave text-primario'],
  'no-vino': ['No vino', 'bg-superficie-2 text-error'],
  confirmado: ['Finalizado', 'bg-superficie-2 text-secundario'],
};

function tarjetaTurno(t, esProximo) {
  const servicio = servicioPorId(t.servicioId);
  const [diaSemana, numero] = formatoDia(t.fecha).split(' ');
  const dentroDelPlazo = minutosHasta(t.fecha, t.hora) > HORAS_SIN_CARGO * 60; // RN-11 / RN-15
  const [etiqueta, colores] = ETIQUETA_ESTADO[t.estado] || ETIQUETA_ESTADO.confirmado;
  return `<li>
    <article class="${CLS.tarjeta}" aria-labelledby="turno-${t.codigo}">
      <div class="flex gap-4">
        <p class="grid h-16 w-16 shrink-0 place-content-center rounded-xl bg-superficie-2 text-center" aria-hidden="true">
          <span class="text-xs font-semibold uppercase text-secundario">${diaSemana}</span><span class="font-semibold">${numero}</span></p>
        <div class="min-w-0 grow">
          <h2 id="turno-${t.codigo}" class="font-titulo text-xl font-semibold leading-tight">${servicio.nombre}</h2>
          <p class="text-sm font-semibold">${formatoDia(t.fecha)} · ${t.hora} · con ${esc(nombreBarbero(t.barberoId))}</p>
          <p class="text-sm text-secundario">${t.codigo} · ${t.sena ? `Seña pagada ${precio(t.sena)}` : 'Pagás en el local'}</p>
          ${esProximo ? '' : `<span class="${CLS.badge} ${colores} mt-2">${etiqueta}</span>`}
        </div>
      </div>
      ${esProximo ? `
        <div class="mt-4 grid grid-cols-2 gap-3">
          <button type="button" class="${CLS.btnSecundario}" data-accion="reprogramar" data-codigo="${t.codigo}" ${dentroDelPlazo ? '' : 'disabled aria-describedby="plazo-' + t.codigo + '"'}>Reprogramar</button>
          <button type="button" class="${CLS.btnTexto}" data-accion="cancelar" data-codigo="${t.codigo}">Cancelar turno</button>
        </div>
        ${dentroDelPlazo ? '' : `<p id="plazo-${t.codigo}" class="mt-2 text-sm text-secundario">Faltan menos de 2 horas: ya no se puede reprogramar.</p>`}`
      : `<button type="button" class="${CLS.btnTexto} -ml-3 mt-2" data-accion="repetir" data-codigo="${t.codigo}">${icono('repetir', 'h-4 w-4')}Reservar de nuevo</button>`}
    </article>
  </li>`;
}

function pintarMisTurnos() {
  const pestania = estado.pestaniaTurnos;
  $$('[data-accion="tab-turnos"]').forEach((tab) => {
    const activa = tab.dataset.tab === pestania;
    tab.setAttribute('aria-selected', String(activa));
    tab.tabIndex = activa ? 0 : -1;
  });
  $('#panel-turnos').setAttribute('aria-labelledby', `tab-${pestania}`);

  const proximos = proximosTurnos();
  const historial = estado.turnos.filter((t) => !proximos.includes(t)).sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
  const lista = pestania === 'proximos' ? proximos : historial;

  $('#panel-turnos').innerHTML = lista.length
    ? `<ul class="grid gap-3">${lista.map((t) => tarjetaTurno(t, pestania === 'proximos')).join('')}</ul>`
    : `<div class="rounded-xl border-2 border-dashed border-borde-control p-6 text-center">
        <p class="font-semibold">${pestania === 'proximos' ? 'No tenés turnos próximos' : 'Todavía no hay turnos en tu historial'}</p>
        <p class="mt-1 text-sm text-secundario">Reservá tu turno en menos de un minuto.</p>
        <a href="#/reservar/1" class="${CLS.btnPrimario} mt-4">Reservar turno</a>
      </div>`;

  // Lista de espera
  const hoy = hoyISO();
  estado.espera = estado.espera.filter((e) => e.fecha >= hoy);
  $('#lista-espera').innerHTML = estado.espera.length
    ? [...estado.espera].sort((a, b) => (a.fecha + a.franja).localeCompare(b.fecha + b.franja)).map((e) => `
      <li class="${CLS.tarjeta} flex items-center gap-4">
        <p class="grow"><span class="block font-semibold">${formatoDia(e.fecha)} · ${FRANJAS[e.franja].nombre}</span>
          <span class="block text-sm text-secundario">${esc(nombreBarbero(e.barberoId))}</span></p>
        <button type="button" class="${CLS.btnTexto}" data-accion="espera-quitar" data-id="${e.id}">Salir<span class="sr-only"> de la lista de espera del ${formatoDia(e.fecha)}</span></button>
      </li>`).join('')
    : '<li class="rounded-xl bg-superficie-2 p-4 text-sm text-secundario">No estás en ninguna lista de espera.</li>';

  const selDia = $('#espera-dia');
  const valorDia = selDia.value;
  selDia.innerHTML = diasReservables().map((d) => `<option value="${d}">${formatoDia(d)}</option>`).join('');
  if (valorDia) selDia.value = valorDia;
  const selBarbero = $('#espera-barbero');
  if (!selBarbero.options.length) {
    selBarbero.innerHTML = `<option value="cualquiera">Cualquiera</option>${BARBEROS.map((b) => `<option value="${b.id}">${b.nombre}</option>`).join('')}`;
  }
}

function cantidadSellos() {
  return estado.sellosBase + estado.turnos.filter((t) => t.estado === 'llego').length;
}

function pintarPerfil() {
  const p = estado.perfil;
  const ultimo = ultimoTurno();
  $('#perfil-avatar').textContent = (p.nombre || 'Invitado').trim()[0].toUpperCase();
  $('#perfil-subtitulo').textContent = p.nombre ? `${p.nombre}${p.telefono ? ` · ${p.telefono}` : ''}` : 'Invitado · tus datos se guardan al reservar';

  const sellos = cantidadSellos();
  const enTarjeta = sellos >= SELLOS_PREMIO ? SELLOS_PREMIO : sellos % SELLOS_PREMIO;
  $('#sellos').innerHTML = Array.from({ length: SELLOS_PREMIO }, (_, i) => `
    <li class="grid h-12 w-12 place-items-center rounded-full ${i < enTarjeta ? 'bg-acento text-sobre-acento' : 'border-2 border-dashed border-borde-control text-secundario'}">
      ${i < enTarjeta ? icono('tijera', 'h-5 w-5') : `<span class="text-sm" aria-hidden="true">${i + 1}</span>`}
      <span class="sr-only">Sello ${i + 1}: ${i < enTarjeta ? 'conseguido' : 'pendiente'}</span>
    </li>`).join('');
  $('#sellos-texto').textContent = sellos >= SELLOS_PREMIO
    ? '¡Completaste la tarjeta! Tu próximo corte clásico es gratis: avisale a tu barbero.'
    : `${enTarjeta} de ${SELLOS_PREMIO} sellos. Te faltan ${SELLOS_PREMIO - enTarjeta} para un corte clásico gratis.`;

  $('#perfil-preferencias').innerHTML = [
    ['Servicio habitual', ultimo ? servicioPorId(ultimo.servicioId).nombre : 'Todavía no reservaste'],
    ['Barbero preferido', ultimo ? nombreBarbero(ultimo.barberoId) : '—'],
  ].map(([k, v]) => `<div class="flex justify-between gap-4 py-3"><dt class="text-secundario">${k}</dt><dd class="text-right font-semibold">${esc(v)}</dd></div>`).join('');

  $('#perfil-nombre').value = p.nombre;
  $('#perfil-telefono').value = p.telefono;
  validarCampo($('#perfil-telefono'), false);
  $('#perfil-notas').value = p.notas;
  $('#switch-recordatorios').setAttribute('aria-checked', String(p.recordatorios));
  pintarTema();
}

function pintarAgenda() {
  const barbero = barberoPorId(estado.barbero);
  const fecha = estado.agendaFecha;
  const hoy = hoyISO();
  const limite = sumarDias(hoy, DIAS_RESERVA);
  $('#agenda-subtitulo').textContent = `${barbero.nombre}${barbero.duenio ? ' (dueño)' : ''} · ${fecha === hoy ? 'Hoy, ' : ''}${formatoDia(fecha)}`;
  $('#agenda-anterior').disabled = fecha <= hoy;
  $('#agenda-siguiente').disabled = sumarDias(fecha, 1) > limite;

  if (esDomingo(fecha)) {
    $('#agenda-lista').innerHTML = '<li class="rounded-xl bg-superficie-2 p-6 text-center font-semibold">Domingo: franco. ¡A descansar!</li>';
    return;
  }

  const turnos = turnosDelDia(barbero.id, fecha);
  const bloqueados = new Set(estado.bloqueos[`${barbero.id}|${fecha}`] || []);
  const esFuturo = fecha > hoy;
  const items = [];
  for (const franja of Object.keys(FRANJAS)) {
    const bloques = bloquesDeFranja(franja);
    items.push(`<li class="list-none before:hidden"><h2 class="font-titulo text-xl font-semibold">${FRANJAS[franja].nombre}</h2></li>`);
    let i = 0;
    while (i < bloques.length) {
      const hora = bloques[i];
      const turno = turnos.find((t) => t.hora === hora);
      if (turno) {
        const servicio = servicioPorId(turno.servicioId);
        const clave = `${barbero.id}|${fecha}|${hora}`;
        const marca = turno.demo ? estado.asistencia[clave] : (['llego', 'no-vino'].includes(turno.estado) ? turno.estado : undefined);
        items.push(`<li data-tipo="turno">
          <article class="rounded-xl border border-borde-control bg-superficie p-4 shadow-sm" aria-label="${hora}, ${esc(turno.nombre)}">
            <div class="flex flex-wrap items-baseline justify-between gap-x-3">
              <p class="font-semibold">${hora} · ${esc(turno.nombre)}</p>
              <p class="text-sm text-secundario">${servicio.nombre} · ${servicio.duracion} min</p>
            </div>
            ${turno.demo ? '' : `<p class="mt-1 text-sm"><span class="${CLS.badge} bg-primario-suave text-primario">Reservó en la app · ${turno.sena ? `seña ${precio(turno.sena)}` : 'paga en el local'}</span></p>
              ${estado.perfil.notas ? `<p class="mt-2 rounded-lg bg-superficie-2 p-2 text-sm">“${esc(estado.perfil.notas)}”</p>` : ''}`}
            ${marca ? `
              <p class="mt-3 flex items-center gap-2 font-semibold ${marca === 'llego' ? 'text-exito' : 'text-error'}">
                ${icono(marca === 'llego' ? 'check-circulo' : 'alerta')}${marca === 'llego' ? 'Llegó' : 'No vino'}
                <button type="button" class="${CLS.btnTexto} ml-auto min-h-10" data-accion="asistencia" data-hora="${hora}" data-valor="">Deshacer</button>
              </p>` : `
              <div class="mt-3 grid grid-cols-2 gap-3">
                <button type="button" class="${CLS.btnPrimario}" data-accion="asistencia" data-hora="${hora}" data-valor="llego" ${esFuturo ? 'disabled aria-describedby="nota-futuro"' : ''}>Llegó</button>
                <button type="button" class="${CLS.btnSecundario}" data-accion="asistencia" data-hora="${hora}" data-valor="no-vino" ${esFuturo ? 'disabled aria-describedby="nota-futuro"' : ''}>No vino</button>
              </div>`}
          </article>
        </li>`);
        i += bloquesNecesarios(servicio);
        continue;
      }
      const bloqueado = bloqueados.has(hora);
      const pasado = esPasado(fecha, hora);
      items.push(`<li data-tipo="libre">
        <div class="flex min-h-14 items-center gap-3 rounded-xl border-2 border-dashed border-borde-control px-4 py-1 ${bloqueado ? 'bg-superficie-2' : ''}">
          <p class="grow"><span class="font-semibold">${hora}</span> <span class="text-secundario">· ${bloqueado ? 'Bloqueado' : pasado ? 'Sin turno' : 'Libre'}</span></p>
          ${pasado ? '' : `<button type="button" class="${CLS.btnTexto} min-h-10" data-accion="bloquear" data-hora="${hora}">${bloqueado ? 'Desbloquear' : 'Bloquear'}<span class="sr-only"> el horario de las ${hora}</span></button>`}
        </div>
      </li>`);
      i++;
    }
  }
  $('#agenda-lista').innerHTML = items.join('') + (esFuturo ? '<li class="list-none before:hidden"><p id="nota-futuro" class="text-sm text-secundario">"Llegó" y "No vino" se marcan el día del turno.</p></li>' : '');
}

function pintarClientes() {
  const barbero = estado.barbero;
  const hoy = hoyISO();
  const mapa = new Map();
  for (const d of diasReservables()) {
    for (const t of turnosDelDia(barbero, d)) {
      if (esPasado(t.fecha, t.hora)) continue;
      const c = mapa.get(t.nombre) || { nombre: t.nombre, cantidad: 0, proximo: t, app: !t.demo };
      c.cantidad++;
      mapa.set(t.nombre, c);
    }
  }
  const clientes = [...mapa.values()].sort((a, b) => (a.proximo.fecha + a.proximo.hora).localeCompare(b.proximo.fecha + b.proximo.hora));
  $('#clientes-lista').innerHTML = clientes.length ? clientes.map((c) => `
    <li class="${CLS.tarjeta} flex items-center gap-4">
      <span class="${CLS.avatar}" aria-hidden="true">${esc(c.nombre[0])}</span>
      <p class="min-w-0 grow"><span class="block font-semibold">${esc(c.nombre)}${c.app ? ` <span class="${CLS.badge} bg-primario-suave text-primario">App</span>` : ''}</span>
        <span class="block text-sm text-secundario">Próximo: ${c.proximo.fecha === hoy ? 'hoy' : formatoDia(c.proximo.fecha)} ${c.proximo.hora} · ${servicioPorId(c.proximo.servicioId).nombre}</span></p>
      <span class="text-sm font-semibold">${c.cantidad} ${c.cantidad === 1 ? 'turno' : 'turnos'}</span>
    </li>`).join('') : '<li class="rounded-xl bg-superficie-2 p-4 text-secundario">No hay clientes agendados.</li>';
}

function pintarGaleria() {
  $('#galeria-lista').innerHTML = GALERIA.map((nombre, i) => `
    <li>
      <figure class="overflow-hidden rounded-xl border border-borde bg-superficie">
        <div class="galeria-tile" data-variante="${(i % 3) + 1}" role="img" aria-label="Foto de ejemplo: ${nombre}"></div>
        <figcaption class="p-3 text-sm font-semibold">${nombre}</figcaption>
      </figure>
    </li>`).join('');
}

function pintarLocal() {
  const hoy = hoyISO();
  $('#local-subtitulo').textContent = esDomingo(hoy) ? 'Hoy es domingo: el local está de franco.' : `Resumen de hoy, ${formatoDia(hoy)}.`;
  const delDia = esDomingo(hoy) ? [] : BARBEROS.flatMap((b) => turnosDelDia(b.id, hoy));
  const marca = (t) => (t.demo ? estado.asistencia[`${t.barberoId}|${hoy}|${t.hora}`] : t.estado);
  const senas = estado.turnos.filter((t) => t.estado !== 'cancelado').reduce((s, t) => s + t.sena, 0);
  const datos = [
    ['Turnos hoy', delDia.length],
    ['Llegaron', delDia.filter((t) => marca(t) === 'llego').length],
    ['No vinieron', delDia.filter((t) => marca(t) === 'no-vino').length],
    ['Señas cobradas (app)', precio(senas)],
  ];
  $('#local-resumen').innerHTML = datos.map(([k, v]) => `
    <div class="${CLS.tarjeta}"><dt class="text-sm text-secundario">${k}</dt><dd class="mt-1 font-titulo text-3xl font-semibold">${v}</dd></div>`).join('');
  const bloquesTotales = bloquesDeFranja('manana').length + bloquesDeFranja('tarde').length;
  $('#local-barberos').innerHTML = BARBEROS.map((b) => {
    const ocupados = esDomingo(hoy) ? 0 : bloquesOcupados(b.id, hoy).size;
    const porcentaje = Math.round((ocupados / bloquesTotales) * 100);
    return `<li class="${CLS.tarjeta}">
      <p class="flex items-center gap-3"><span class="${CLS.avatar}" aria-hidden="true">${b.nombre[0]}</span><span class="font-semibold">${b.nombre}</span></p>
      <p class="mt-3 text-sm text-secundario">Agenda ocupada: <strong class="text-texto">${porcentaje}%</strong></p>
      <progress class="barra-ocupacion mt-2" max="100" value="${porcentaje}" aria-label="Agenda ocupada de ${b.nombre}">${porcentaje}%</progress>
    </li>`;
  }).join('');
}

const RENDER = {
  inicio: pintarInicio,
  paso1: pintarPaso1,
  paso2: pintarPaso2,
  paso3: pintarPaso3,
  paso4: pintarPaso4,
  confirmado: pintarConfirmado,
  'mis-turnos': pintarMisTurnos,
  perfil: pintarPerfil,
  agenda: pintarAgenda,
  clientes: pintarClientes,
  galeria: pintarGaleria,
  local: pintarLocal,
};

// ============ Acciones ============
function generarCodigo() {
  let codigo;
  do { codigo = `BR-${String(Math.floor(1000 + Math.random() * 9000))}`; } // RN-09
  while (estado.turnos.some((t) => t.codigo === codigo));
  return codigo;
}

function guardarDatosEnPerfil(nombre, telefono) {
  estado.perfil.nombre = nombre.trim();
  estado.perfil.telefono = telefono.replace(/\D/g, '');
  guardarStorage('perfil', estado.perfil);
}

function crearTurno() {
  const b = estado.borrador;
  const servicio = servicioPorId(b.servicioId);
  const barberoId = barberoAsignable(b.barberoId, b.fecha, b.hora, servicio);
  if (!barberoId) {
    b.hora = null;
    guardarBorrador();
    toast('Ese horario se acaba de ocupar. Elegí otro, por favor.', 'error');
    irA('/reservar/3');
    return;
  }
  const turno = {
    codigo: generarCodigo(),
    servicioId: servicio.id,
    barberoId,
    fecha: b.fecha,
    hora: b.hora,
    nombre: b.nombre.trim(),
    telefono: b.telefono.replace(/\D/g, ''),
    sena: b.pago === 'sena' ? montoSena(servicio) : 0,
    estado: 'confirmado',
    creado: Date.now(),
  };
  estado.turnos.push(turno);
  guardarTurnos();
  guardarDatosEnPerfil(turno.nombre, turno.telefono);
  notificar('Turno confirmado', `${servicio.nombre} con ${nombreBarbero(barberoId)}, ${formatoDia(turno.fecha)} a las ${turno.hora}. Código ${turno.codigo}.`);
  finalizarReserva(turno.codigo);
}

// RN-15: reprogramar dentro del plazo mantiene la seña
function aplicarReprogramacion() {
  const b = estado.borrador;
  const turno = estado.turnos.find((t) => t.codigo === b.reprogramando);
  const servicio = servicioPorId(turno.servicioId);
  const barberoId = barberoAsignable(b.barberoId, b.fecha, b.hora, servicio, turno.codigo);
  if (!barberoId) {
    b.hora = null;
    guardarBorrador();
    toast('Ese horario se acaba de ocupar. Elegí otro, por favor.', 'error');
    irA('/reservar/3');
    return;
  }
  const anterior = { fecha: turno.fecha, hora: turno.hora, barberoId: turno.barberoId };
  Object.assign(turno, { fecha: b.fecha, hora: b.hora, barberoId, nombre: b.nombre.trim(), telefono: b.telefono.replace(/\D/g, ''), reprogramado: true });
  guardarTurnos();
  guardarDatosEnPerfil(turno.nombre, turno.telefono);
  notificar('Turno reprogramado', `${turno.codigo}: ahora ${formatoDia(turno.fecha)} a las ${turno.hora}.`);
  avisarListaEspera(anterior);
  finalizarReserva(turno.codigo);
}

function finalizarReserva(codigo) {
  estado.ultimo = codigo;
  guardarStorage('ultimo', codigo);
  estado.borrador = borradorVacio();
  guardarBorrador();
  irA('/reservar/confirmado');
}

// RN-05 / RN-14: se avisa a quienes coinciden; el horario no queda reservado para nadie
function avisarListaEspera({ fecha, hora, barberoId }) {
  const franja = franjaDe(hora);
  const coinciden = estado.espera.filter((e) => e.fecha === fecha && e.franja === franja && (e.barberoId === 'cualquiera' || e.barberoId === barberoId));
  coinciden.forEach((e) => {
    notificar('Turno liberado', `Se liberó ${formatoDia(fecha)} a las ${hora} con ${nombreBarbero(barberoId)}. Se lo queda el primero que confirma.`, { fecha, barberoId });
    e.avisado = true;
  });
  guardarStorage('espera', estado.espera);
  return coinciden.length;
}

function repetir(codigo) {
  const base = codigo ? estado.turnos.find((t) => t.codigo === codigo) : ultimoTurno();
  if (!base) return;
  // RN-06: precarga servicio, barbero y datos, y salta a Fecha y hora
  estado.borrador = { ...borradorVacio(), servicioId: base.servicioId, barberoId: base.barberoId, nombre: base.nombre, telefono: base.telefono };
  guardarBorrador();
  toast(`Cargamos ${servicioPorId(base.servicioId).nombre} con ${nombreBarbero(base.barberoId)}. Elegí día y horario.`);
  irA('/reservar/3');
}

function pintarTema() {
  const oscuro = document.documentElement.classList.contains('dark');
  $('#btn-tema').setAttribute('aria-pressed', String(oscuro));
  $('#switch-oscuro').setAttribute('aria-checked', String(oscuro));
  $('meta[name="theme-color"]').setAttribute('content', oscuro ? '#18181B' : '#1E3A5F');
}

const ACCIONES = {
  servicio(el) {
    estado.borrador.servicioId = el.dataset.id;
    guardarBorrador();
    pintarPaso1();
    $(`[data-accion="servicio"][data-id="${el.dataset.id}"]`).focus();
  },
  barbero(el) {
    estado.borrador.barberoId = el.dataset.id;
    guardarBorrador();
    pintarPaso2();
    $(`[data-accion="barbero"][data-id="${el.dataset.id}"]`).focus();
  },
  dia(el) {
    estado.borrador.fecha = el.dataset.fecha;
    estado.borrador.hora = null;
    guardarBorrador();
    pintarPaso3();
    $(`[data-accion="dia"][data-fecha="${el.dataset.fecha}"]`).focus();
  },
  hora(el) {
    estado.borrador.hora = el.dataset.hora;
    guardarBorrador();
    pintarPaso3();
    $(`[data-accion="hora"][data-hora="${el.dataset.hora}"]`).focus();
  },
  continuar(el) {
    irA(`/reservar/${el.dataset.destino}`);
  },
  'reservar-con'(el) {
    const actual = estado.borrador;
    estado.borrador = { ...borradorVacio(), servicioId: actual.reprogramando ? null : actual.servicioId, barberoId: el.dataset.id };
    guardarBorrador();
    irA('/reservar/1');
  },
  repetir(el) {
    repetir(el.dataset.codigo);
  },
  'cancelar-reprogramacion'() {
    estado.borrador = borradorVacio();
    guardarBorrador();
    toast('Listo, tu turno quedó como estaba.');
    irA('/mis-turnos');
  },
  reprogramar(el) {
    const t = estado.turnos.find((x) => x.codigo === el.dataset.codigo);
    estado.borrador = { ...borradorVacio(), servicioId: t.servicioId, barberoId: t.barberoId, fecha: t.fecha, nombre: t.nombre, telefono: t.telefono, politica: true, reprogramando: t.codigo };
    guardarBorrador();
    irA('/reservar/3');
  },
  cancelar(el) {
    const t = estado.turnos.find((x) => x.codigo === el.dataset.codigo);
    estado.cancelando = t.codigo;
    const sinCargo = minutosHasta(t.fecha, t.hora) > HORAS_SIN_CARGO * 60; // RN-11
    $('#cancelar-texto').textContent = `${servicioPorId(t.servicioId).nombre}, ${formatoDia(t.fecha)} a las ${t.hora} (${t.codigo}). ` + (
      !t.sena ? 'No pagaste seña, así que no hay cargo.'
        : sinCargo ? `Cancelás sin cargo: te devolvemos la seña de ${precio(t.sena)}.`
          : `Faltan menos de 2 horas: la seña de ${precio(t.sena)} no se devuelve.`);
    abrirModal('#dlg-cancelar');
  },
  'cancelar-confirmar'() {
    const t = estado.turnos.find((x) => x.codigo === estado.cancelando);
    t.estado = 'cancelado';
    t.cancelado = Date.now();
    guardarTurnos();
    origenFoco = null;
    cerrarModal('#dlg-cancelar');
    const avisados = avisarListaEspera(t);
    notificar('Turno cancelado', `${t.codigo}, ${formatoDia(t.fecha)} a las ${t.hora}.`);
    toast(avisados
      ? `Turno cancelado. Avisamos a ${avisados} ${avisados === 1 ? 'persona' : 'personas'} de la lista de espera.`
      : 'Turno cancelado. El horario quedó libre para otro cliente.');
    pintarMisTurnos();
    $('#t-mis-turnos').focus();
  },
  'tab-turnos'(el) {
    estado.pestaniaTurnos = el.dataset.tab;
    pintarMisTurnos();
    $(`#tab-${el.dataset.tab}`).focus();
  },
  'espera-anotar'(el) {
    const b = estado.borrador;
    agregarEspera(b.fecha, el.dataset.franja, b.barberoId);
  },
  'espera-quitar'(el) {
    estado.espera = estado.espera.filter((e) => String(e.id) !== el.dataset.id);
    guardarStorage('espera', estado.espera);
    toast('Saliste de la lista de espera.');
    pintarMisTurnos();
    $('#t-espera').scrollIntoView({ block: 'nearest' });
    $('#espera-dia').focus();
  },
  'reservar-liberado'(el) {
    const aviso = estado.notificaciones.find((n) => String(n.id) === el.dataset.id);
    estado.borrador = { ...borradorVacio(), barberoId: aviso.accion.barberoId, fecha: aviso.accion.fecha };
    guardarBorrador();
    origenFoco = null;
    cerrarModal('#dlg-avisos');
    irA('/reservar/1');
  },
  tema() {
    const oscuro = document.documentElement.classList.toggle('dark');
    guardarStorage('tema', oscuro ? 'oscuro' : 'claro');
    pintarTema();
  },
  recordatorios(el) {
    estado.perfil.recordatorios = el.getAttribute('aria-checked') !== 'true';
    guardarStorage('perfil', estado.perfil);
    el.setAttribute('aria-checked', String(estado.perfil.recordatorios));
    toast(estado.perfil.recordatorios ? 'Te vamos a recordar el turno 2 horas antes.' : 'Desactivaste los recordatorios.');
  },
  notificaciones() {
    pintarAvisos();
    abrirModal('#dlg-avisos');
    estado.notificaciones.forEach((n) => { n.leida = true; });
    guardarStorage('notificaciones', estado.notificaciones);
    pintarContadorAvisos();
  },
  'soy-barbero'() {
    $('#opciones-barbero').innerHTML = BARBEROS.map((b, i) => `
      <label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-borde-control bg-superficie p-4 transition hover:border-primario active:scale-[0.99] has-[:checked]:border-2 has-[:checked]:border-primario has-[:checked]:bg-primario-suave has-[:checked]:p-[15px] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-primario has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-fondo">
        <input type="radio" name="barbero-actual" value="${b.id}" class="h-5 w-5 accent-[rgb(var(--c-primario))] focus:outline-none" ${(estado.barbero || 'riri') === b.id || (!estado.barbero && i === 0) ? 'checked' : ''}>
        <span class="${CLS.avatar}" aria-hidden="true">${b.nombre[0]}</span>
        <span><span class="block font-semibold">${b.nombre}</span><span class="block text-sm text-secundario">${b.duenio ? 'Dueño · ve también "Local"' : b.especialidad}</span></span>
      </label>`).join('');
    abrirModal('#dlg-barbero');
  },
  'salir-barbero'() {
    estado.barbero = null;
    guardarStorage('barbero', null);
    toast('Saliste de Soy barbero.');
    irA('/perfil');
  },
  'agenda-dia'(el) {
    let fecha = sumarDias(estado.agendaFecha, Number(el.dataset.delta));
    if (esDomingo(fecha)) fecha = sumarDias(fecha, Number(el.dataset.delta));
    const hoy = hoyISO();
    if (fecha < hoy || fecha > sumarDias(hoy, DIAS_RESERVA)) return;
    estado.agendaFecha = fecha;
    pintarAgenda();
    if (el.disabled) $(el.dataset.delta === '1' ? '#agenda-anterior' : '#agenda-siguiente').focus();
  },
  asistencia(el) {
    const barbero = estado.barbero;
    const fecha = estado.agendaFecha;
    const hora = el.dataset.hora;
    const valor = el.dataset.valor;
    const propio = turnosActivos().find((t) => t.barberoId === barbero && t.fecha === fecha && t.hora === hora) ||
      estado.turnos.find((t) => t.barberoId === barbero && t.fecha === fecha && t.hora === hora && ['llego', 'no-vino'].includes(t.estado));
    if (propio) {
      propio.estado = valor || 'confirmado'; // RN-08 y RN-12: "Llegó" suma un sello
      guardarTurnos();
      if (valor === 'llego') notificar('¡Sumaste un sello!', `Llevás ${cantidadSellos()} de ${SELLOS_PREMIO} en tu tarjeta de sellos.`);
    } else {
      const clave = `${barbero}|${fecha}|${hora}`;
      if (valor) estado.asistencia[clave] = valor;
      else delete estado.asistencia[clave];
      guardarStorage('asistencia', estado.asistencia);
    }
    pintarAgenda();
    $(`#agenda-lista [data-hora="${hora}"]`)?.focus();
  },
  bloquear(el) {
    const clave = `${estado.barbero}|${estado.agendaFecha}`;
    const lista = new Set(estado.bloqueos[clave] || []);
    const hora = el.dataset.hora;
    if (lista.has(hora)) lista.delete(hora);
    else lista.add(hora);
    estado.bloqueos[clave] = [...lista];
    guardarStorage('bloqueos', estado.bloqueos);
    pintarAgenda();
    $(`#agenda-lista [data-accion="bloquear"][data-hora="${hora}"]`)?.focus();
  },
  'cerrar-dialogo'(el) {
    el.closest('dialog').close();
  },
};

function agregarEspera(fecha, franja, barberoId) {
  const ya = estado.espera.some((e) => e.fecha === fecha && e.franja === franja && e.barberoId === barberoId);
  if (ya) {
    toast('Ya estás en esa lista de espera.', 'error');
    return;
  }
  estado.espera.push({ id: Date.now(), fecha, franja, barberoId, creado: Date.now() });
  guardarStorage('espera', estado.espera);
  toast(`Te anotamos para el ${formatoDia(fecha)} a la ${FRANJAS[franja].nombre.toLowerCase()}. Te avisamos si se libera un turno.`);
}

// ============ Eventos ============
document.addEventListener('click', (evento) => {
  const el = evento.target.closest('[data-accion]');
  if (!el || el.disabled) return;
  ACCIONES[el.dataset.accion]?.(el);
});

// Pestañas de Mis turnos: flechas izquierda/derecha
$('[role="tablist"]').addEventListener('keydown', (evento) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
  evento.preventDefault();
  estado.pestaniaTurnos = estado.pestaniaTurnos === 'proximos' ? 'historial' : 'proximos';
  pintarMisTurnos();
  $(`#tab-${estado.pestaniaTurnos}`).focus();
});

// Paso 4: datos y seña (GOT-05: validar al salir de cada campo)
['#campo-nombre', '#campo-telefono'].forEach((sel) => {
  const campo = $(sel);
  campo.addEventListener('blur', () => validarCampo(campo, true));
  campo.addEventListener('input', () => {
    estado.borrador[campo.name] = campo.value;
    guardarBorrador();
    validarCampo(campo, false);
    actualizarConfirmar();
  });
});

$('#campo-politica').addEventListener('change', (evento) => {
  estado.borrador.politica = evento.target.checked;
  guardarBorrador();
  actualizarConfirmar();
});

$$('input[name="pago"]').forEach((radio) => radio.addEventListener('change', () => {
  estado.borrador.pago = radio.value;
  guardarBorrador();
}));

$('#form-datos').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valido = [validarCampo($('#campo-nombre'), true), validarCampo($('#campo-telefono'), true)].every(Boolean);
  if (!valido || !estado.borrador.politica) {
    $('[aria-invalid="true"]')?.focus();
    return;
  }
  const b = estado.borrador;
  if (b.reprogramando) return aplicarReprogramacion();
  if (b.pago === 'local') return crearTurno();

  const servicio = servicioPorId(b.servicioId);
  $('#pago-monto').textContent = precio(montoSena(servicio));
  $('#pago-detalle').textContent = `Seña del 30% de ${servicio.nombre} (${precio(servicio.precio)})`;
  const email = $('#pago-email');
  email.removeAttribute('aria-invalid');
  $('#error-pago').classList.add('hidden');
  $('#error-pago').classList.remove('flex');
  abrirModal('#dlg-pago');
});

// 05b Pago simulado
$('#pago-email').addEventListener('blur', (evento) => validarCampo(evento.target, true));
$('#pago-email').addEventListener('input', (evento) => validarCampo(evento.target, false));

$('#form-pago').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const email = $('#pago-email');
  if (!validarCampo(email, true)) {
    email.focus();
    return;
  }
  marcarPagando(true);
  temporizadorPago = setTimeout(() => {
    marcarPagando(false);
    origenFoco = null;
    cerrarModal('#dlg-pago');
    crearTurno();
  }, 900);
});

// Mientras se procesa el pago no se puede cerrar el diálogo (Cancelar, Esc ni clic en el fondo)
let temporizadorPago = null;

function marcarPagando(pagando) {
  $('#btn-pagar').disabled = pagando;
  $('#form-pago [data-accion="cerrar-dialogo"]').disabled = pagando;
  $('#btn-pagar-texto').textContent = pagando ? 'Procesando pago…' : 'Pagar';
  if (!pagando) temporizadorPago = null;
}

$('#dlg-pago').addEventListener('cancel', (evento) => {
  if (temporizadorPago) evento.preventDefault();
});

// Si el navegador cierra el diálogo igual, el pago se anula: nunca se crea un turno que el usuario cerró
$('#dlg-pago').addEventListener('close', () => {
  if (!temporizadorPago) return;
  clearTimeout(temporizadorPago);
  marcarPagando(false);
  toast('Pago cancelado. No se cobró nada.');
});

$('#form-espera').addEventListener('submit', (evento) => {
  evento.preventDefault();
  agregarEspera($('#espera-dia').value, $('#espera-franja').value, $('#espera-barbero').value);
  pintarMisTurnos();
});

$('#perfil-telefono').addEventListener('blur', (evento) => validarCampo(evento.target, true));
$('#perfil-telefono').addEventListener('input', (evento) => validarCampo(evento.target, false));

$('#form-perfil').addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (!validarCampo($('#perfil-telefono'), true)) {
    $('#perfil-telefono').focus();
    toast('No guardamos los cambios: revisá el teléfono.', 'error');
    return;
  }
  estado.perfil.nombre = $('#perfil-nombre').value.trim();
  estado.perfil.telefono = $('#perfil-telefono').value.replace(/\D/g, '');
  estado.perfil.notas = $('#perfil-notas').value.trim();
  guardarStorage('perfil', estado.perfil);
  pintarPerfil();
  toast('Guardamos tus preferencias.');
});

$('#form-barbero').addEventListener('submit', (evento) => {
  evento.preventDefault();
  estado.barbero = new FormData(evento.target).get('barbero-actual');
  guardarStorage('barbero', estado.barbero);
  estado.agendaFecha = hoyISO();
  origenFoco = null;
  cerrarModal('#dlg-barbero');
  irA('/barbero/agenda');
});

// Modales: clic en el fondo cierra; al cerrar, el foco vuelve a quien lo abrió
$$('dialog').forEach((dialogo) => {
  dialogo.addEventListener('click', (evento) => {
    if (evento.target === dialogo && !(dialogo.id === 'dlg-pago' && temporizadorPago)) dialogo.close();
  });
  dialogo.addEventListener('close', () => {
    if (origenFoco && document.contains(origenFoco)) origenFoco.focus();
    origenFoco = null;
  });
});

// "Saltar al contenido": con el ruteo por hash, #contenido mandaba a Inicio; ahora lleva el foco al título de la vista actual
$('a[href="#contenido"]').addEventListener('click', (evento) => {
  evento.preventDefault();
  $('[data-vista]:not([hidden]) h1')?.focus();
});

window.addEventListener('hashchange', router);

// ============ Inicio ============
$$('[data-icono]').forEach((el) => {
  el.innerHTML = icono(el.dataset.icono, el.dataset.iconoClase || 'h-5 w-5');
});
pintarContadorAvisos();
pintarTema();
router();
