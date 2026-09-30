import React, { useMemo, useState } from 'react';
import { ProductionEntry } from '../types';
import { niceAxisMax } from '../utils/chartMath';
import { computeRealWeeklyTrend } from '../utils/weeklyTrend';
import { DEMO_WEEKLY_TREND } from '../data/demoTrendData';

// ⚠️ MODO DEMOSTRACIÓN: mientras esto sea `true`, la gráfica usa datos de
// EJEMPLO (src/data/demoTrendData.ts) para poder ver cómo se ve y cómo
// funciona la tendencia semanal, antes de tener suficientes semanas reales
// acumuladas en Producción. Cuando el taller ya tenga uso real de varias
// semanas, cambia esto a `false` (o pide que lo cambiemos) — los datos de
// ejemplo desaparecen solos y la gráfica pasa a calcularse sola a partir de
// los registros reales de producción. No hay que tocar nada más.
const SHOW_DEMO_TREND_DATA = true;

interface WeeklyTrendChartProps {
  productionHistory: ProductionEntry[];
}

const VIEW_W = 800;
const VIEW_H = 220;
const MARGIN = { top: 16, right: 16, bottom: 32, left: 44 };

export const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ productionHistory }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const points = useMemo(() => {
    if (SHOW_DEMO_TREND_DATA) {
      return DEMO_WEEKLY_TREND.map((p) => ({ label: p.label, piezas: p.piezas }));
    }
    return computeRealWeeklyTrend(productionHistory, 8);
  }, [productionHistory]);

  const maxQty = Math.max(...points.map((p) => p.piezas), 0);
  const yMax = niceAxisMax(maxQty);
  const chartW = VIEW_W - MARGIN.left - MARGIN.right;
  const chartH = VIEW_H - MARGIN.top - MARGIN.bottom;
  const stepX = points.length > 1 ? chartW / (points.length - 1) : 0;

  const coords = points.map((p, i) => {
    const x = MARGIN.left + i * stepX;
    const y = MARGIN.top + chartH - (yMax > 0 ? (p.piezas / yMax) * chartH : 0);
    return { x, y, ...p };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1]?.x ?? 0} ${MARGIN.top + chartH} L ${MARGIN.left} ${MARGIN.top + chartH} Z`;

  const hasData = points.some((p) => p.piezas > 0);

  return (
    <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="text-sm font-semibold text-[#151c27]">Tendencia de Producción</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            PIEZAS POR SEMANA · ÚLTIMAS {points.length} SEMANAS
          </p>
        </div>
        {SHOW_DEMO_TREND_DATA && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a3412] bg-[#ffedd5] border border-[#fb923c]/30 px-2.5 py-1 rounded-full">
            Datos de ejemplo
          </span>
        )}
      </div>

      {!hasData ? (
        <p className="text-xs text-[#7a7583] text-center py-10">
          Aún no hay suficientes semanas de producción registrada para mostrar la tendencia.
        </p>
      ) : (
        <div className="relative w-full">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-56" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ca2164" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#ca2164" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines + Y axis labels */}
            {[0, 0.5, 1].map((frac) => {
              const y = MARGIN.top + chartH - frac * chartH;
              return (
                <g key={frac}>
                  <line x1={MARGIN.left} y1={y} x2={VIEW_W - MARGIN.right} y2={y} stroke="#cac4d4" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={MARGIN.left - 8} y={y + 3} textAnchor="end" fontSize="11" fill="#7a7583" fontFamily="monospace">
                    {Math.round(yMax * frac).toLocaleString('es-CO')}
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            <path d={areaPath} fill="url(#trendFill)" />

            {/* Line */}
            <path d={linePath} fill="none" stroke="#ca2164" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

            {/* Points + hover targets */}
            {coords.map((c, i) => (
              <g key={i}>
                <circle cx={c.x} cy={c.y} r={hoveredIdx === i ? 5 : 3.5} fill="#ca2164" stroke="white" strokeWidth="1.5" />
                <circle
                  cx={c.x}
                  cy={MARGIN.top + chartH / 2}
                  r={stepX / 2 || 20}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  x={c.x}
                  y={VIEW_H - 8}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="#494552"
                  fontWeight={i === coords.length - 1 ? 700 : 500}
                >
                  {c.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          {hoveredIdx !== null && (
            <div
              className="absolute bg-[#2a313d] text-white px-2.5 py-1.5 rounded text-[11px] font-medium pointer-events-none shadow-md whitespace-nowrap z-10 -translate-x-1/2 -translate-y-full"
              style={{
                left: `${(coords[hoveredIdx].x / VIEW_W) * 100}%`,
                top: `${(coords[hoveredIdx].y / VIEW_H) * 100}%`
              }}
            >
              {coords[hoveredIdx].label}: {coords[hoveredIdx].piezas.toLocaleString('es-CO')} pzas
            </div>
          )}
        </div>
      )}
    </div>
  );
};
