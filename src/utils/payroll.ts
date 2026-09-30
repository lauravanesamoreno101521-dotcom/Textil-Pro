import { ProductionEntry } from '../types';

export type PayrollPeriod = 'day' | 'week' | 'quincena' | 'month';

// Etiquetas compartidas para mostrar cada período en cualquier pantalla
// (Producción/Nómina del admin, pantalla de autoservicio del operario, etc.)
export const PAYROLL_PERIOD_LABELS: Record<PayrollPeriod, string> = {
  day: 'Hoy',
  week: 'Esta Semana',
  quincena: 'Quincena',
  month: 'Este Mes'
};

export function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Devuelve la fecha (YYYY-MM-DD) más antigua a incluir para el período dado,
// tomando como referencia "hoy" (hora local del taller).
export function getPeriodStartISO(period: PayrollPeriod): string {
  const now = new Date();
  if (period === 'day') {
    return toISODate(now);
  }
  if (period === 'week') {
    const dayOfWeek = now.getDay(); // 0 (domingo) - 6 (sábado)
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    return toISODate(monday);
  }
  if (period === 'quincena') {
    // Quincena 1: día 1 al 15. Quincena 2: día 16 al último día del mes.
    const day = now.getDate();
    const start = day <= 15
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : new Date(now.getFullYear(), now.getMonth(), 16);
    return toISODate(start);
  }
  // month
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return toISODate(firstOfMonth);
}

const MONTH_NAMES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

// A qué quincena de nómina pertenece una fecha (1-15 o 16-fin de mes),
// en texto legible — ej. "1 a 15 de agosto de 2026" o "16 a 31 de agosto de
// 2026". Sirve para que cualquier recibo de pago deje claro a qué período
// quincenal corresponde, sin importar si se pagó por día, semana o mes.
export function getQuincenaLabel(dateISO: string): string {
  const [year, month, day] = dateISO.split('-').map(Number);
  const safeMonth = month || 1;
  const monthName = MONTH_NAMES_ES[safeMonth - 1];

  if (day <= 15) {
    return `1 a 15 de ${monthName} de ${year}`;
  }
  // Día 0 del mes siguiente = último día de este mes (28/29/30/31 según corresponda).
  const lastDayOfMonth = new Date(year, safeMonth, 0).getDate();
  return `16 a ${lastDayOfMonth} de ${monthName} de ${year}`;
}

export interface OperativePayrollSummary {
  operativeId: string;
  operativeName: string;
  totalQty: number;
  totalPay: number;
  entries: number;
}

// Agrupa el historial de producción por operario dentro del período elegido
// (día / semana / mes en curso), sumando piezas y valor a pagar. Esta es la
// base del cálculo automático de nómina.
export function summarizePayrollByOperative(
  history: ProductionEntry[],
  period: PayrollPeriod
): OperativePayrollSummary[] {
  const startISO = getPeriodStartISO(period);
  const todayISO = toISODate(new Date());
  const filtered = history.filter((e) => e.dateISO >= startISO && e.dateISO <= todayISO);

  const map = new Map<string, OperativePayrollSummary>();
  filtered.forEach((e) => {
    const existing = map.get(e.operativeId);
    if (existing) {
      existing.totalQty += e.batchQty;
      existing.totalPay += e.totalPay;
      existing.entries += 1;
    } else {
      map.set(e.operativeId, {
        operativeId: e.operativeId,
        operativeName: e.operativeName,
        totalQty: e.batchQty,
        totalPay: e.totalPay,
        entries: 1
      });
    }
  });

  return Array.from(map.values()).sort((a, b) => b.totalPay - a.totalPay);
}

// Suma, por operario, todo lo que aún no se le ha pagado (sin importar
// período — histórico completo), para la tabla de "Nómina Pendiente".
export function getUnpaidTotalsByOperative(history: ProductionEntry[]): OperativePayrollSummary[] {
  const unpaid = history.filter((e) => !e.paid);
  const map = new Map<string, OperativePayrollSummary>();
  unpaid.forEach((e) => {
    const existing = map.get(e.operativeId);
    if (existing) {
      existing.totalQty += e.batchQty;
      existing.totalPay += e.totalPay;
      existing.entries += 1;
    } else {
      map.set(e.operativeId, {
        operativeId: e.operativeId,
        operativeName: e.operativeName,
        totalQty: e.batchQty,
        totalPay: e.totalPay,
        entries: 1
      });
    }
  });
  return Array.from(map.values()).sort((a, b) => b.totalPay - a.totalPay);
}

function daysBetweenISO(startISO: string, endISO: string): number {
  const [y1, m1, d1] = startISO.split('-').map(Number);
  const [y2, m2, d2] = endISO.split('-').map(Number);
  const start = Date.UTC(y1, (m1 || 1) - 1, d1 || 1);
  const end = Date.UTC(y2, (m2 || 1) - 1, d2 || 1);
  return Math.round((end - start) / 86400000);
}

// Se paga la nómina el 14 y el 29 de cada mes (taller real). El aviso "se
// acerca pago de nómina" aparece esta cantidad de días antes de cada fecha.
export const PAYROLL_ALERT_WINDOW_DAYS = 3;

export interface PayrollAlertInfo {
  show: boolean;
  payDateISO: string;
  daysUntil: number;
  label: string;
}

// Calcula la próxima fecha de pago de nómina (día 14 o 29) y si ya toca
// mostrar el aviso en pantalla.
export function getNextPayrollAlert(): PayrollAlertInfo {
  const now = new Date();
  const todayISO = toISODate(now);
  const day = now.getDate();

  let payDate: Date;
  if (day <= 14) {
    payDate = new Date(now.getFullYear(), now.getMonth(), 14);
  } else if (day <= 29) {
    payDate = new Date(now.getFullYear(), now.getMonth(), 29);
  } else {
    // Días 30/31: ya pasó el pago del 29, el próximo es el 14 del mes siguiente.
    payDate = new Date(now.getFullYear(), now.getMonth() + 1, 14);
  }

  const payDateISO = toISODate(payDate);
  const daysUntil = daysBetweenISO(todayISO, payDateISO);
  const show = daysUntil >= 0 && daysUntil <= PAYROLL_ALERT_WINDOW_DAYS;

  let label: string;
  if (daysUntil === 0) label = 'Hoy es día de pago de nómina';
  else if (daysUntil === 1) label = 'Mañana es día de pago de nómina';
  else label = `Faltan ${daysUntil} días para el pago de nómina`;

  return { show, payDateISO, daysUntil, label };
}
