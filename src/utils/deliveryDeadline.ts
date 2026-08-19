import { toISODate } from './payroll';

// Reglas reales del taller: desde que un pedido se ingresa (día 1) hay 9 días
// en total para entregarlo. Al día 8 la prenda ya debe estar casi lista en el
// área de despeluce, para que el día 9 quede libre únicamente para contar,
// empacar y enviar el pedido.
export const DELIVERY_WINDOW_DAYS = 9;
export const DESPELUCE_CHECKPOINT_DAY = 8;

export function addDaysISO(dateISO: string, days: number): string {
  const [y, m, d] = dateISO.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  dt.setDate(dt.getDate() + days);
  return toISODate(dt);
}

// Diferencia en días de calendario entre dos fechas ISO (endISO - startISO).
export function diffDaysISO(startISO: string, endISO: string): number {
  const [y1, m1, d1] = startISO.split('-').map(Number);
  const [y2, m2, d2] = endISO.split('-').map(Number);
  const start = Date.UTC(y1, (m1 || 1) - 1, d1 || 1);
  const end = Date.UTC(y2, (m2 || 1) - 1, d2 || 1);
  return Math.round((end - start) / 86400000);
}

// Calcula la fecha límite de entrega (día 9) a partir de la fecha de ingreso.
export function getDueDateISO(entryDateISO: string): string {
  return addDaysISO(entryDateISO, DELIVERY_WINDOW_DAYS - 1);
}

export function formatDateEs(dateISO: string): string {
  const [y, m, d] = dateISO.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

export type DeliveryUrgency =
  | 'sin-fecha'
  | 'a-tiempo'
  | 'despeluce'
  | 'dia-entrega'
  | 'retrasado'
  | 'entregado';

export interface DeliveryInfo {
  urgency: DeliveryUrgency;
  diaActual: number | null; // día en curso desde el ingreso (día 1 = día de ingreso)
  diasRestantes: number | null; // días calendario que faltan para la fecha límite (día 9)
  dueDateISO: string | null;
  label: string;
  badgeClass: string;
}

const NEUTRAL: DeliveryInfo = {
  urgency: 'sin-fecha',
  diaActual: null,
  diasRestantes: null,
  dueDateISO: null,
  label: 'Sin fecha de ingreso',
  badgeClass: 'bg-[#f0f3ff] text-[#7a7583] border border-[#cac4d4]'
};

interface OrderLike {
  status: string;
  entryDateISO?: string;
  dueDateISO?: string;
}

// Determina si un pedido va a tiempo, si ya debería estar en despeluce, si
// hoy es el día de empacar/enviar, o si ya está retrasado, con base en la
// fecha real de ingreso y la ventana de 9 días del taller.
export function getOrderDeliveryInfo(order: OrderLike): DeliveryInfo {
  if (order.status === 'Delivered') {
    return {
      urgency: 'entregado',
      diaActual: null,
      diasRestantes: null,
      dueDateISO: order.dueDateISO || null,
      label: 'Entregado',
      badgeClass: 'bg-[#e8ddff] text-[#4f319c] border border-[#cac4d4]'
    };
  }

  if (!order.entryDateISO) {
    return NEUTRAL;
  }

  const todayISO = toISODate(new Date());
  const dueISO = order.dueDateISO || getDueDateISO(order.entryDateISO);
  const diaActual = diffDaysISO(order.entryDateISO, todayISO) + 1;
  const diasRestantes = diffDaysISO(todayISO, dueISO);

  if (order.status === 'Delayed' || diasRestantes < 0) {
    return {
      urgency: 'retrasado',
      diaActual,
      diasRestantes,
      dueDateISO: dueISO,
      label: diasRestantes < 0 ? `Retrasado (día ${diaActual})` : 'Retrasado',
      badgeClass: 'bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/20'
    };
  }

  if (diasRestantes === 0) {
    return {
      urgency: 'dia-entrega',
      diaActual,
      diasRestantes,
      dueDateISO: dueISO,
      label: 'Hoy: Empacar y Enviar',
      badgeClass: 'bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/30'
    };
  }

  if (diaActual === DESPELUCE_CHECKPOINT_DAY) {
    return {
      urgency: 'despeluce',
      diaActual,
      diasRestantes,
      dueDateISO: dueISO,
      label: 'Debe estar en Despeluce',
      badgeClass: 'bg-[#ffedd5] text-[#9a3412] border border-[#fb923c]/30'
    };
  }

  return {
    urgency: 'a-tiempo',
    diaActual,
    diasRestantes,
    dueDateISO: dueISO,
    label: `A tiempo (día ${diaActual}/${DELIVERY_WINDOW_DAYS})`,
    badgeClass: 'bg-[#ecfdf5] text-[#006c4b] border border-[#34d399]/30'
  };
}
