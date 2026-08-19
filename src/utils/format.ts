// Utilidades de formato compartidas por toda la app.

// Formatea un valor en pesos colombianos (COP), con separador de miles "."
// y coma decimal, como se maneja habitualmente en el taller
// (ej. 62.5 -> "$ 62,5", 7504770 -> "$ 7.504.770").
export function formatCOP(value: number | null | undefined, maxDecimals: number = 0): string {
  const v = value || 0;
  return `$ ${v.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals })}`;
}
