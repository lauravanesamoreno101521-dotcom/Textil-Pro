// ⚠️ DATOS DE EJEMPLO — solo para previsualizar cómo se ve y funciona la
// gráfica de "Tendencia de Producción" antes de tener suficientes semanas
// reales acumuladas. No representan producción real del taller.
//
// Cuando el taller ya tenga varias semanas de registros reales guardados
// desde el formulario de Producción, cambia `SHOW_DEMO_TREND_DATA` a
// `false` en src/components/WeeklyTrendChart.tsx — estos datos de ejemplo
// desaparecen solos y la gráfica pasa a calcularse con producción real.
export interface DemoTrendPoint {
  label: string;
  piezas: number;
}

export const DEMO_WEEKLY_TREND: DemoTrendPoint[] = [
  { label: 'Sem 1', piezas: 980 },
  { label: 'Sem 2', piezas: 1050 },
  { label: 'Sem 3', piezas: 890 },
  { label: 'Sem 4', piezas: 1200 },
  { label: 'Sem 5', piezas: 1340 },
  { label: 'Sem 6', piezas: 1180 },
  { label: 'Sem 7', piezas: 1420 },
  { label: 'Sem 8', piezas: 1510 }
];
