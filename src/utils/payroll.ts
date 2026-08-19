import { ProductionEntry } from '../types';

export type PayrollPeriod = 'day' | 'week' | 'month';

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
  // month
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return toISODate(firstOfMonth);
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
