// Redondea hacia arriba a un valor "bonito" (1/2/5 x potencia de 10) para
// usar como techo del eje Y de una gráfica, en vez de un valor fijo.
export function niceAxisMax(value: number): number {
  if (value <= 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const residual = value / magnitude;
  let niceResidual: number;
  if (residual <= 1) niceResidual = 1;
  else if (residual <= 2) niceResidual = 2;
  else if (residual <= 5) niceResidual = 5;
  else niceResidual = 10;
  return niceResidual * magnitude;
}
