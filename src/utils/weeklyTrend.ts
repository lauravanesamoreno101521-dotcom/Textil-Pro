import { ProductionEntry } from '../types';
import { getPeriodStartISO, toISODate } from './payroll';
import { addDaysISO } from './deliveryDeadline';

const MONTH_ABBR = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatShortRange(startISO: string, endISO: string): string {
  const [, m1, d1] = startISO.split('-').map(Number);
  const [, , d2] = endISO.split('-').map(Number);
  return `${d1}-${d2} ${MONTH_ABBR[m1 - 1]}`;
}

export interface WeeklyTrendPoint {
  label: string;
  piezas: number;
}

// Calcula la producción real de las últimas `weeksCount` semanas (incluida
// la actual), agrupando por semana calendario (lunes a domingo), a partir
// de los registros reales guardados en Producción.
export function computeRealWeeklyTrend(
  productionHistory: ProductionEntry[],
  weeksCount: number = 8
): WeeklyTrendPoint[] {
  const currentWeekStartISO = getPeriodStartISO('week');
  const todayISO = toISODate(new Date());
  const points: WeeklyTrendPoint[] = [];

  for (let i = weeksCount - 1; i >= 0; i--) {
    const weekStartISO = addDaysISO(currentWeekStartISO, -7 * i);
    const weekEndISO = i === 0 ? todayISO : addDaysISO(weekStartISO, 6);
    const piezas = productionHistory
      .filter((p) => p.dateISO >= weekStartISO && p.dateISO <= weekEndISO)
      .reduce((sum, p) => sum + p.batchQty, 0);
    const label = i === 0 ? 'Esta semana' : formatShortRange(weekStartISO, addDaysISO(weekStartISO, 6));
    points.push({ label, piezas });
  }

  return points;
}
