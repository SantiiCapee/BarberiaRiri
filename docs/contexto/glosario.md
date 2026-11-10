# Glosario — BarberíaRiri

## 1. Términos del dominio

| Término | Significado |
|---|---|
| **Turno** | Reserva de un servicio con un barbero, en una fecha y hora. Tiene un código `BR-NNNN`. |
| **Bloque** | Unidad de 30 minutos de la agenda. |
| **Seña** | Pago anticipado del 30% del servicio (simulado). |
| **Lista de espera** | Clientes anotados para un día y franja sin lugar. |
| **Turno liberado** | Aviso que recibe quien está en la lista de espera cuando alguien cancela. |
| **Tarjeta de sellos** | Programa de fidelidad del cliente. |
| **Franco** | Día libre del local o de un barbero. |
| **Dueño** | Barbero con acceso a "Local" (Riri). |

**Servicios:**
- Corte clásico: 30 min, $12.000
- Fade / degradé: 40 min, $14.000
- Perfilado de barba: 20 min, $8.000
- Barba con toalla caliente: 30 min, $10.000
- Combo corte + barba: 60 min, $20.000 (badge "Más pedido")
- Corte niños (hasta 12 años): 25 min, $9.000

**Barberos:**
- Riri: fades y diseños, 4,9 (dueño)
- Nico: barba y navaja, 4,8
- Lucho: cortes clásicos y niños, 4,7

## 2. Reglas de negocio nucleares

| ID | Regla |
|---|---|
| RN-01 | Bloques de 30 minutos: **Mañana** de 9:00 a 12:30 y **Tarde** de 15:00 a 20:30 (hora de inicio del último turno). |
| RN-02 | La seña es el **30%** del servicio. También se puede elegir "Pagar en el local". |
| RN-03 | "Confirmar turno" se habilita solo con nombre, teléfono de 10 dígitos y la política de cancelación aceptada. |
| RN-04 | "Cualquier barbero disponible" asigna un barbero libre en ese horario. |
| RN-05 | Al cancelar, se avisa con "Turno liberado" a quienes coincidan en la lista de espera. |
| RN-06 | "Repetir mi último corte" precarga servicio, barbero y datos, y salta a Fecha y hora. |
| RN-07 | La pestaña "Local" es solo para el dueño. |
| RN-08 | El barbero marca cada turno como "Llegó" o "No vino". |
| RN-09 | El código de turno tiene el formato `BR-NNNN`. |
| RN-10 | Un servicio ocupa `ceil(duración / 30)` bloques **consecutivos** (el Fade y el Combo ocupan 2). Solo se ofrecen los horarios que tienen todos esos bloques libres. |
| RN-11 | Se puede cancelar sin cargo hasta **2 horas antes**; después, la seña no se devuelve. |
| RN-12 | Cada turno marcado "Llegó" suma 1 sello. Con **10 sellos**, un corte clásico gratis. |
| RN-13 | Se reserva hasta **14 días** hacia adelante, de lunes a sábado. El domingo es franco. |
| RN-14 | El aviso de "Turno liberado" no reserva el horario: se lo queda el primero que lo confirma. |
| RN-15 | Reprogramar dentro del plazo sin cargo (RN-11) mantiene la seña. |

Cambiar cualquiera de estas reglas requiere autorización y una ADR nueva.

## 3. Rotulado (lenguaje natural vs. jerga de desarrollo)

| ✅ Usar | ❌ En vez de |
|---|---|
| Reservar turno | Crear booking |
| Mis turnos (Próximos / Historial) | Appointments (Upcoming / Past) |
| Barbero · Cualquier barbero disponible | Staff, Profesional · Auto-assign |
| Combo corte + barba | Paquete de servicios |
| Seña · Pagar seña ahora (30%) · Pagar en el local | Depósito, Prepago |
| Repetir mi último corte | Duplicar reserva |
| Lista de espera · Turno liberado | Waitlist · Slot disponible |
| Tarjeta de sellos | Programa de fidelización |
| Agenda · Ficha del cliente · Bloquear horario | Calendar · Customer record · Block slot |
| Franco | Día libre, Day off |
| Llegó / No vino | Check-in / No-show |
| Ocupado · Mañana / Tarde | Unavailable · AM / PM |
| Continuar / Volver · Confirmar turno | Next / Back · Submit |
| Turno confirmado · Reprogramar / Cancelar | Booking success · Reschedule |
| Soy barbero | Login staff |
