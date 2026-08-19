import React, { useMemo, useState } from 'react';
import { CompanyName, Factura } from '../../types';
import { formatCOP } from '../../utils/format';

interface FacturasViewProps {
  facturas: Factura[];
  searchQuery: string;
}

const COMPANIES: CompanyName[] = ['COOLKIDS', 'IMPERIUM'];

export const FacturasView: React.FC<FacturasViewProps> = ({ facturas, searchQuery }) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyName>('COOLKIDS');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const companyFacturas = useMemo(
    () => facturas.filter((f) => f.empresa === selectedCompany),
    [facturas, selectedCompany]
  );

  const filteredFacturas = useMemo(() => {
    if (searchQuery === '') return companyFacturas;
    const q = searchQuery.toLowerCase();
    return companyFacturas.filter((f) => {
      const matchesHeader =
        String(f.facturaNumero).toLowerCase().includes(q) ||
        f.descripcion.toLowerCase().includes(q);
      const matchesOperario = f.asignaciones.some((a) =>
        a.operativeName.toLowerCase().includes(q)
      );
      return matchesHeader || matchesOperario;
    });
  }, [companyFacturas, searchQuery]);

  const summary = useMemo(() => {
    const totalFacturado = companyFacturas.reduce((sum, f) => sum + (f.totalFactura || 0), 0);
    const totalPagadoOperarios = companyFacturas.reduce(
      (sum, f) => sum + f.asignaciones.reduce((s, a) => s + (a.valor || 0), 0),
      0
    );
    const totalPiezas = companyFacturas.reduce((sum, f) => sum + (f.cantidad || 0), 0);
    return { totalFacturado, totalPagadoOperarios, totalPiezas, count: companyFacturas.length };
  }, [companyFacturas]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Page Header */}
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-[#674bb5] tracking-tight">Facturas por Empresa</h1>
        <p className="text-sm text-[#494552] mt-1">
          Histórico real 2026 de pedidos por empresa cliente, su desglose de labores y qué operario hizo cada una.
        </p>
      </header>

      {/* Company Tabs */}
      <div className="flex items-center gap-2">
        {COMPANIES.map((company) => (
          <button
            key={company}
            onClick={() => {
              setSelectedCompany(company);
              setExpandedId(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              selectedCompany === company
                ? 'bg-[#674bb5] text-white shadow-sm'
                : 'bg-white border border-[#cac4d4] text-[#494552] hover:bg-[#f0f3ff]'
            }`}
          >
            {company === 'COOLKIDS' ? 'Coolkids' : 'Imperium'}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#cac4d4] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">Facturas</p>
          <p className="text-2xl font-bold text-[#674bb5] mt-1">{summary.count}</p>
        </div>
        <div className="bg-white border border-[#cac4d4] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">Piezas Totales</p>
          <p className="text-2xl font-bold text-[#674bb5] mt-1">{summary.totalPiezas.toLocaleString('es-CO')}</p>
        </div>
        <div className="bg-white border border-[#cac4d4] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">Total Facturado</p>
          <p className="text-xl font-bold text-[#006c4b] mt-1">{formatCOP(summary.totalFacturado)}</p>
        </div>
        <div className="bg-white border border-[#cac4d4] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">Pagado a Operarios</p>
          <p className="text-xl font-bold text-[#a43073] mt-1">{formatCOP(summary.totalPagadoOperarios)}</p>
        </div>
      </div>

      {/* Facturas List */}
      <div className="bg-white border border-[#cac4d4] rounded-xl overflow-hidden">
        {filteredFacturas.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-10">
            No se encontraron facturas con los filtros aplicados.
          </p>
        ) : (
          <div className="divide-y divide-[#cac4d4]/50">
            {filteredFacturas.map((f) => {
              const isOpen = expandedId === f.id;
              return (
                <div key={f.id}>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : f.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#f9f9ff] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#674bb5] bg-[#f0f3ff] px-2 py-1 rounded shrink-0">
                        #{f.facturaNumero}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#151c27] truncate">{f.descripcion}</p>
                        <p className="text-[11px] text-[#7a7583]">
                          {(f.cantidad || 0).toLocaleString('es-CO')} pzas
                          {f.talla ? ` · Talla ${f.talla}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-sm text-[#006c4b] hidden sm:inline">
                        {formatCOP(f.totalFactura)}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#7a7583] text-[20px] transition-transform ${
                          isOpen ? 'rotate-180 text-[#674bb5]' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 bg-[#f9f9ff] border-t border-[#cac4d4]/60 space-y-4">
                      {/* Funciones estándar */}
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mb-2">
                          Labores de la Factura
                        </h4>
                        <div className="overflow-x-auto border border-[#cac4d4] rounded-lg bg-white">
                          <table className="w-full text-left text-xs border-collapse min-w-[420px]">
                            <thead className="bg-[#f0f3ff]">
                              <tr>
                                <th className="py-2 px-3 font-bold text-[#494552]">Labor</th>
                                <th className="py-2 px-3 font-bold text-[#494552] text-right">Precio</th>
                                <th className="py-2 px-3 font-bold text-[#494552] text-right">Cantidad</th>
                                <th className="py-2 px-3 font-bold text-[#494552] text-right">Valor</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cac4d4]/40">
                              {f.funciones.map((fn) => (
                                <tr key={fn.id}>
                                  <td className="py-1.5 px-3 font-medium text-[#151c27]">{fn.nombre}</td>
                                  <td className="py-1.5 px-3 text-right font-mono text-[#494552]">
                                    {fn.precio !== null ? formatCOP(fn.precio, 1) : '—'}
                                  </td>
                                  <td className="py-1.5 px-3 text-right font-mono text-[#494552]">
                                    {fn.cantidad !== null ? fn.cantidad.toLocaleString('es-CO') : '—'}
                                  </td>
                                  <td className="py-1.5 px-3 text-right font-mono font-bold text-[#674bb5]">
                                    {fn.valor !== null ? formatCOP(fn.valor) : '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Asignaciones por operario */}
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mb-2">
                          Qué Operario Hizo Cada Labor
                        </h4>
                        <div className="overflow-x-auto border border-[#cac4d4] rounded-lg bg-white">
                          <table className="w-full text-left text-xs border-collapse min-w-[520px]">
                            <thead className="bg-[#f0f3ff]">
                              <tr>
                                <th className="py-2 px-3 font-bold text-[#494552]">Operario</th>
                                <th className="py-2 px-3 font-bold text-[#494552]">Detalle</th>
                                <th className="py-2 px-3 font-bold text-[#494552] text-right">Cantidad</th>
                                <th className="py-2 px-3 font-bold text-[#494552] text-right">Valor</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#cac4d4]/40">
                              {f.asignaciones.map((a) => (
                                <tr key={a.id}>
                                  <td className="py-1.5 px-3 font-semibold text-[#a43073]">{a.operativeName}</td>
                                  <td className="py-1.5 px-3 text-[#494552]">{a.detalle || '—'}</td>
                                  <td className="py-1.5 px-3 text-right font-mono text-[#494552]">
                                    {a.cantidad !== null ? a.cantidad.toLocaleString('es-CO') : '—'}
                                  </td>
                                  <td className="py-1.5 px-3 text-right font-mono font-bold text-[#006c4b]">
                                    {a.valor !== null ? formatCOP(a.valor) : '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
