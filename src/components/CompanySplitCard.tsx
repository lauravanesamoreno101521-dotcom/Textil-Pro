import React, { useMemo } from 'react';
import { CompanyName, Factura } from '../types';
import { formatCOP } from '../utils/format';

interface CompanySplitCardProps {
  facturas: Factura[];
  onNavigate: () => void;
}

// Colores de marca ya usados en el resto de la app para acciones primaria
// (morado) y secundaria (magenta) — se reutilizan aquí como identidad fija
// de cada empresa cliente, nunca intercambiados.
const COMPANY_STYLE: Record<CompanyName, { bar: string; text: string; chipBg: string; label: string }> = {
  COOLKIDS: { bar: 'bg-[#ca2164]', text: 'text-[#ca2164]', chipBg: 'bg-[#fdeaf2]', label: 'Coolkids' },
  IMPERIUM: { bar: 'bg-[#a43073]', text: 'text-[#a43073]', chipBg: 'bg-[#fdf2f8]', label: 'Imperium' }
};

export const CompanySplitCard: React.FC<CompanySplitCardProps> = ({ facturas, onNavigate }) => {
  const stats = useMemo(() => {
    const byCompany: Record<CompanyName, { piezas: number; facturado: number; facturas: number }> = {
      COOLKIDS: { piezas: 0, facturado: 0, facturas: 0 },
      IMPERIUM: { piezas: 0, facturado: 0, facturas: 0 }
    };
    facturas.forEach((f) => {
      byCompany[f.empresa].piezas += f.cantidad || 0;
      byCompany[f.empresa].facturado += f.totalFactura || 0;
      byCompany[f.empresa].facturas += 1;
    });
    const totalFacturado = byCompany.COOLKIDS.facturado + byCompany.IMPERIUM.facturado;
    const coolkidsPct = totalFacturado > 0 ? (byCompany.COOLKIDS.facturado / totalFacturado) * 100 : 50;
    const imperiumPct = 100 - coolkidsPct;
    return { byCompany, totalFacturado, coolkidsPct, imperiumPct };
  }, [facturas]);

  const companies: CompanyName[] = ['COOLKIDS', 'IMPERIUM'];

  return (
    <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#151c27]">Coolkids vs Imperium</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            REPARTO DEL NEGOCIO · HISTÓRICO 2026
          </p>
        </div>
        <button
          onClick={onNavigate}
          className="text-xs font-semibold text-[#ca2164] hover:text-[#a43073] hover:underline transition-colors shrink-0"
        >
          Ver Facturas
        </button>
      </div>

      {stats.totalFacturado === 0 ? (
        <p className="text-xs text-[#7a7583] py-6 text-center">Aún no hay facturas registradas para calcular el reparto.</p>
      ) : (
        <>
          {/* Split proportion bar (por valor facturado) */}
          <div className="flex w-full h-4 rounded-full overflow-hidden gap-0.5 bg-[#fdf1f6]">
            <div
              style={{ width: `${Math.max(stats.coolkidsPct, 0)}%` }}
              className={`${COMPANY_STYLE.COOLKIDS.bar} transition-all duration-300`}
            />
            <div
              style={{ width: `${Math.max(stats.imperiumPct, 0)}%` }}
              className={`${COMPANY_STYLE.IMPERIUM.bar} transition-all duration-300`}
            />
          </div>

          {/* Company stat panels */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {companies.map((company) => {
              const style = COMPANY_STYLE[company];
              const data = stats.byCompany[company];
              const pct = company === 'COOLKIDS' ? stats.coolkidsPct : stats.imperiumPct;
              return (
                <div key={company} className={`${style.chipBg} rounded-lg p-3 border border-[#cac4d4]/40`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.bar} shrink-0`} />
                    <span className={`text-xs font-bold ${style.text}`}>{style.label}</span>
                    <span className="text-[10px] font-bold text-[#494552] ml-auto">{pct.toFixed(0)}%</span>
                  </div>
                  <p className="text-lg font-bold text-[#151c27] leading-tight">{formatCOP(data.facturado)}</p>
                  <p className="text-[11px] text-[#7a7583] mt-0.5">
                    {data.piezas.toLocaleString('es-CO')} pzas · {data.facturas} facturas
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
