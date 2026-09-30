// Estimación y alerta de consumo de hilo por tarea (ver types.ts:
// TaskRate.hiloItemId / gramsPerPiece y ThreadConsumptionLog).
//
// Idea general (confirmada con la usuaria):
//  1. El gasto de hilo NUNCA se descuenta automáticamente del inventario —
//     el hilo que sobra de una tarea vuelve a la bodega y puede durar varios
//     días, así que descontar por tarea daría cifras falsas. Este módulo
//     solo calcula una ESTIMACIÓN y da una ALERTA visual.
//  2. Los gramos por pieza de cada labor se definen MANUALMENTE por ahora
//     (TaskRate.gramsPerPiece). A medida que se registran consumos reales
//     (ThreadConsumptionLog, ej. pesando el cono antes/después de una
//     tarea), en cuanto haya suficientes registros para una combinación
//     hilo + prenda + labor, el sistema empieza a usar el PROMEDIO
//     calculado de esos registros en vez del valor manual — sin borrar el
//     valor manual, que queda como respaldo si el histórico se vacía.

import { GarmentRateGroup, InventoryItem, TaskRate, ThreadConsumptionLog } from '../types';

// Con menos de este número de registros reales para una combinación
// hilo + prenda + labor, se sigue usando el valor manual.
export const THREAD_LOG_MIN_FOR_AVERAGE = 3;

export type GramsPerPieceSource = 'calculado' | 'manual' | 'sin_definir';

export interface EffectiveGramsPerPiece {
  value: number | null;
  source: GramsPerPieceSource;
  sampleSize: number; // cantidad de registros reales usados si source === 'calculado'
}

// Registros de consumo real que aplican a una combinación hilo + prenda + labor.
export function getLogsForTask(
  logs: ThreadConsumptionLog[],
  hiloItemId: string,
  garmentType: string,
  taskName: string
): ThreadConsumptionLog[] {
  return logs.filter(
    (l) => l.hiloItemId === hiloItemId && l.garmentType === garmentType && l.taskName === taskName
  );
}

// Gramos por pieza "efectivos" a usar para estimar: calculado (si hay
// histórico suficiente) > manual > sin definir.
export function getEffectiveGramsPerPiece(
  task: TaskRate,
  garmentType: string,
  logs: ThreadConsumptionLog[]
): EffectiveGramsPerPiece {
  if (!task.hiloItemId) {
    return { value: null, source: 'sin_definir', sampleSize: 0 };
  }

  const matching = getLogsForTask(logs, task.hiloItemId, garmentType, task.name);
  if (matching.length >= THREAD_LOG_MIN_FOR_AVERAGE) {
    const totalGrams = matching.reduce((sum, l) => sum + l.gramsUsed, 0);
    const totalPieces = matching.reduce((sum, l) => sum + l.piecesProduced, 0);
    if (totalPieces > 0) {
      return { value: totalGrams / totalPieces, source: 'calculado', sampleSize: matching.length };
    }
  }

  if (typeof task.gramsPerPiece === 'number' && task.gramsPerPiece > 0) {
    return { value: task.gramsPerPiece, source: 'manual', sampleSize: matching.length };
  }

  return { value: null, source: 'sin_definir', sampleSize: matching.length };
}

export interface ThreadUsageEstimate {
  hiloItemId: string;
  hiloName: string;
  estimatedGrams: number | null;
  source: GramsPerPieceSource;
  sampleSize: number;
}

// Estimación de gramos que se llevará un lote (prenda + labor + cantidad).
export function estimateTaskThreadUsage(
  task: TaskRate,
  garmentType: string,
  quantity: number,
  logs: ThreadConsumptionLog[],
  inventory: InventoryItem[]
): ThreadUsageEstimate | null {
  if (!task.hiloItemId) return null;
  const hiloItem = inventory.find((i) => i.id === task.hiloItemId);
  if (!hiloItem) return null;

  const effective = getEffectiveGramsPerPiece(task, garmentType, logs);
  return {
    hiloItemId: hiloItem.id,
    hiloName: hiloItem.name,
    estimatedGrams: effective.value !== null ? effective.value * Math.max(quantity, 0) : null,
    source: effective.source,
    sampleSize: effective.sampleSize
  };
}

export type ThreadStockAlertLevel = 'ok' | 'bajo' | 'critico' | 'sin_datos';

export interface ThreadStockAlert {
  level: ThreadStockAlertLevel;
  message: string;
  remainingAfterTask: number | null;
}

// Compara la estimación de consumo contra el stock actual del hilo y arma
// un mensaje de alerta. Nunca modifica el stock — es solo informativo.
export function getThreadStockAlert(
  hiloItem: InventoryItem,
  estimatedGrams: number | null
): ThreadStockAlert {
  if (estimatedGrams === null) {
    return {
      level: 'sin_datos',
      message: 'Todavía no se definió cuánto hilo usa esta labor.',
      remainingAfterTask: null
    };
  }

  const remaining = hiloItem.currentStock - estimatedGrams;

  if (remaining < 0) {
    return {
      level: 'critico',
      message: `No alcanza con el stock actual de ${hiloItem.name}: faltarían ${Math.abs(
        remaining
      ).toLocaleString('es-CO', { maximumFractionDigits: 1 })} ${hiloItem.unit}. Hay que comprar más.`,
      remainingAfterTask: remaining
    };
  }

  if (remaining <= hiloItem.reorderPoint) {
    return {
      level: 'bajo',
      message: `Alcanza, pero quedará poco ${hiloItem.name} después de esta tarea (aprox. ${remaining.toLocaleString(
        'es-CO',
        { maximumFractionDigits: 1 }
      )} ${hiloItem.unit}). Conviene ir pensando en comprar más.`,
      remainingAfterTask: remaining
    };
  }

  return {
    level: 'ok',
    message: `Alcanza sin problema. Quedarían aprox. ${remaining.toLocaleString('es-CO', {
      maximumFractionDigits: 1
    })} ${hiloItem.unit} de ${hiloItem.name}.`,
    remainingAfterTask: remaining
  };
}

// Para InventoryView: dado un insumo de hilo, qué labores (prenda + tarea)
// de las tarifas configuradas lo consumen — para mostrarlo como referencia
// y para armar el selector del modal de "Registrar consumo real".
export interface HiloTaskLink {
  garmentType: string;
  taskName: string;
  task: TaskRate;
}

export function getTasksLinkedToHilo(taskRates: GarmentRateGroup[], hiloItemId: string): HiloTaskLink[] {
  const links: HiloTaskLink[] = [];
  taskRates.forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.hiloItemId === hiloItemId) {
        links.push({ garmentType: group.garmentName, taskName: task.name, task });
      }
    });
  });
  return links;
}
