// Conciliación de cantidades entre lo que dice una factura del cliente y lo
// que los operarios realmente registraron con ese mismo número de factura en
// Producción (ver src/components/OperativeKioskView.tsx). Si no coincide, se
// recalcula proporcionalmente la nómina de quienes trabajaron sobre esa
// factura, sin borrar el historial original (se agrega un ajuste visible).
import { Factura, ProductionEntry } from '../types';

export interface OperativeFacturaShare {
  operativeId: string;
  operativeName: string;
  registeredQty: number;
  registeredPay: number;
}

export interface FacturaReconciliation {
  facturaId: string;
  expectedQty: number;
  registeredQty: number;
  // Positivo = se registró de más frente a la factura; negativo = de menos.
  difference: number;
  matches: boolean;
  byOperative: OperativeFacturaShare[];
}

// Agrupa el historial de producción que quedó anotado con el número de esta
// factura, y lo compara contra la cantidad original que envió el cliente.
export function getFacturaReconciliation(
  factura: Factura,
  productionHistory: ProductionEntry[]
): FacturaReconciliation {
  const facturaKey = String(factura.facturaNumero).trim();
  const entries = productionHistory.filter(
    (p) => p.facturaRef && String(p.facturaRef).trim() === facturaKey
  );
  const expectedQty = factura.cantidad || 0;

  const map = new Map<string, OperativeFacturaShare>();
  entries.forEach((e) => {
    const existing = map.get(e.operativeId);
    if (existing) {
      existing.registeredQty += e.batchQty;
      existing.registeredPay += e.totalPay;
    } else {
      map.set(e.operativeId, {
        operativeId: e.operativeId,
        operativeName: e.operativeName,
        registeredQty: e.batchQty,
        registeredPay: e.totalPay
      });
    }
  });

  const byOperative = Array.from(map.values()).sort((a, b) => b.registeredQty - a.registeredQty);
  const registeredQty = byOperative.reduce((sum, o) => sum + o.registeredQty, 0);

  return {
    facturaId: factura.id,
    expectedQty,
    registeredQty,
    difference: registeredQty - expectedQty,
    matches: registeredQty === expectedQty,
    byOperative
  };
}

export interface PayrollAdjustment {
  operativeId: string;
  operativeName: string;
  // Puede ser negativo (se le descuentan piezas) o positivo (se le suman).
  qtyAdjustment: number;
  payAdjustment: number;
  ratePerPiece: number;
}

// Cuando lo registrado no coincide con la factura, se reparte la diferencia
// proporcionalmente entre los operarios que trabajaron sobre ese número de
// factura, según cuánto registró cada uno. La tarifa de cada ajuste usa la
// tarifa promedio que ese operario ya tenía registrada en esta factura, para
// mantener el pago internamente consistente.
export function calculatePayrollAdjustments(
  reconciliation: FacturaReconciliation
): PayrollAdjustment[] {
  const { expectedQty, registeredQty, byOperative } = reconciliation;
  if (registeredQty === 0 || expectedQty === registeredQty) return [];

  const scaleFactor = expectedQty / registeredQty;

  return byOperative
    .map((o) => {
      const ratePerPiece = o.registeredQty > 0 ? o.registeredPay / o.registeredQty : 0;
      const adjustedQty = Math.round(o.registeredQty * scaleFactor);
      const qtyAdjustment = adjustedQty - o.registeredQty;
      const payAdjustment = Math.round(qtyAdjustment * ratePerPiece);
      return {
        operativeId: o.operativeId,
        operativeName: o.operativeName,
        qtyAdjustment,
        payAdjustment,
        ratePerPiece
      };
    })
    .filter((a) => a.qtyAdjustment !== 0);
}
