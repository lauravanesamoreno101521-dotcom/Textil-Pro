import React, { useMemo, useState } from 'react';
import { CompanyName, Factura, ProductionEntry } from '../../types';
import { formatCOP } from '../../utils/format';
import { getOrderDeliveryInfo, formatDateEs } from '../../utils/deliveryDeadline';
import { getFacturaReconciliation } from '../../utils/reconciliation';
import { toISODate } from '../../utils/payroll';
import { openPrintablePrefactura } from '../../utils/prefactura';

interface FacturasViewProps {
  facturas: Factura[];
  productionHistory: ProductionEntry[];
  searchQuery: string;
  onMarkDelivered: (facturaId: string) => void;
  onMarkPaid: (facturaId: string) => void;
  onReconcile: (facturaId: string) => void;
}

const COMPANIES: CompanyName[] = ['COOLKIDS', 'IMPERIUM'];

export const FacturasView: React.FC<FacturasViewProps> = ({
  facturas,
  productionHistory,
  searchQuery,
  onMarkDelivered,
  onMarkPaid,
  onReconcile
}) => {
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

  // Qué prenda se ha producido más este año para la empresa seleccionada,
  // tomado del histórico real de facturas (descripción + cantidad).
  const garmentTotals = useMemo(() => {
    const totals = new Map<string, { qty: number; facturado: number }>();
    companyFacturas.forEach((f) => {
      const existing = totals.get(f.descripcion);
      const qty = f.cantidad || 0;
      const facturado = f.totalFactura || 0;
      if (existing) {
        existing.qty += qty;
        existing.facturado += facturado;
      } else {
        totals.set(f.descripcion, { qty, facturado });
      }
    });
    const rows = Array.from(totals.entries())
      .map(([descripcion, data]) => ({ descripcion, ...data }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 8);
    const maxQty = rows.length > 0 ? rows[0].qty : 0;
    return { rows, maxQty };
  }, [companyFacturas]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Page Header */}
      <header className="mb-2">
        <h1 className="text-3xl font-bold text-[#ca2164] tracking-tight">Facturas por Empresa</h1>
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
                ? 'bg-[#ca2164] text-white shadow-sm'
                : 'bg-white border border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6]'
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
          <p className="text-2xl font-bold text-[#ca2164] mt-1">{summary.count}</p>
        </div>
        <div className="bg-white border border-[#cac4d4] rounded-xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">Piezas Totales</p>
          <p className="text-2xl font-bold text-[#ca2164] mt-1">{summary.totalPiezas.toLocaleString('es-CO')}</p>
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

      {/* Prendas Más Producidas */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[#151c27]">Prendas Más Producidas</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            {selectedCompany === 'COOLKIDS' ? 'COOLKIDS' : 'IMPERIUM'} · HISTÓRICO 2026
          </p>
        </div>

        {garmentTotals.rows.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-6">No hay facturas de esta empresa todavía.</p>
        ) : (
          <div className="space-y-3">
            {garmentTotals.rows.map((row, idx) => {
              const pct = garmentTotals.maxQty > 0 ? (row.qty / garmentTotals.maxQty) * 100 : 0;
              return (
                <div key={row.descripcion} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#151c27] w-40 shrink-0 truncate" title={row.descripcion}>
                    {row.descripcion}
                  </span>
                  <div className="flex-1 h-3 bg-[#fdf1f6] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(pct, 3)}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        idx === 0 ? 'bg-[#ca2164]' : 'bg-[#ca2164]/60'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ca2164] w-20 text-right shrink-0">
                    {row.qty.toLocaleString('es-CO')} pzas
                  </span>
                  <span className="text-[11px] font-mono text-[#7a7583] w-24 text-right shrink-0 hidden sm:inline">
                    {formatCOP(row.facturado)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
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
              const isLive = !!f.entryDateISO;
              const delivery = isLive ? getOrderDeliveryInfo(f as { status: string; entryDateISO?: string; dueDateISO?: string }) : null;
              return (
                <div key={f.id}>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : f.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#fefafb] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#ca2164] bg-[#fdf1f6] px-2 py-1 rounded shrink-0">
                        #{f.facturaNumero}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#151c27] truncate">{f.descripcion}</p>
                        <p className="text-[11px] text-[#7a7583]">
                          {(f.cantidad || 0).toLocaleString('es-CO')} pzas
                          {f.talla ? ` · Talla ${f.talla}` : ''}
                        </p>
                      </div>
                      {delivery && (
                        <span className={`hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${delivery.badgeClass}`}>
                          {delivery.label}
                        </span>
                      )}
                      {isLive && f.status === 'Delivered' && (
                        <span
                          className={`hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            f.paymentStatus === 'cobrado'
                              ? 'bg-[#ecfdf5] text-[#006c4b] border border-[#34d399]/30'
                              : 'bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/30'
                          }`}
                        >
                          {f.paymentStatus === 'cobrado' ? 'Cobrado' : 'Cobro Pendiente'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-sm text-[#006c4b] hidden sm:inline">
                        {formatCOP(f.totalFactura)}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[#7a7583] text-[20px] transition-transform ${
                          isOpen ? 'rotate-180 text-[#ca2164]' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 bg-[#fefafb] border-t border-[#cac4d4]/60 space-y-4">
                      {isLive && <FacturaLifecyclePanel factura={f} productionHistory={productionHistory} onMarkDelivered={onMarkDelivered} onMarkPaid={onMarkPaid} onReconcile={onReconcile} />}

                      {/* Funciones estándar */}
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mb-2">
                          Labores de la Factura
                        </h4>
                        <div className="overflow-x-auto border border-[#cac4d4] rounded-lg bg-white">
                          <table className="w-full text-left text-xs border-collapse min-w-[420px]">
                            <thead className="bg-[#fdf1f6]">
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
                                  <td className="py-1.5 px-3 text-right font-mono font-bold text-[#ca2164]">
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
                            <thead className="bg-[#fdf1f6]">
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

// Panel de seguimiento en vivo (solo para facturas con fecha real de
// ingreso): estado de entrega, conciliación de cantidades vs. lo que
// registraron los operarios, y cobro al cliente.
interface FacturaLifecyclePanelProps {
  factura: Factura;
  productionHistory: ProductionEntry[];
  onMarkDelivered: (facturaId: string) => void;
  onMarkPaid: (facturaId: string) => void;
  onReconcile: (facturaId: string) => void;
}

const FacturaLifecyclePanel: React.FC<FacturaLifecyclePanelProps> = ({
  factura,
  productionHistory,
  onMarkDelivered,
  onMarkPaid,
  onReconcile
}) => {
  const delivery = getOrderDeliveryInfo(factura as { status: string; entryDateISO?: string; dueDateISO?: string });
  const reconciliation = getFacturaReconciliation(factura, productionHistory);
  const todayISO = toISODate(new Date());
  const isDelivered = factura.status === 'Delivered';
  const paymentOverdue =
    !!factura.paymentExpectedDateISO &&
    factura.paymentExpectedDateISO < todayISO &&
    factura.paymentStatus !== 'cobrado';

  return (
    <div className="bg-white border border-[#cac4d4] rounded-lg p-4 space-y-3">
      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">
        Seguimiento de Entrega, Conciliación y Cobro
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Entrega */}
        <div className="border border-[#cac4d4]/70 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a7583] mb-1.5">Entrega</p>
          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${delivery.badgeClass}`}>
            {delivery.label}
          </span>
          {!isDelivered ? (
            <button
              onClick={() => onMarkDelivered(factura.id)}
              className="mt-2 w-full text-[11px] font-bold text-white bg-[#ca2164] hover:bg-[#a3144d] rounded-lg py-1.5 cursor-pointer"
            >
              Marcar como Entregado
            </button>
          ) : (
            factura.actualDeliveryDateISO && (
              <p className="text-[11px] text-[#7a7583] mt-1.5">
                Entregado: {formatDateEs(factura.actualDeliveryDateISO)}
              </p>
            )
          )}
        </div>

        {/* Conciliación */}
        <div className="border border-[#cac4d4]/70 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a7583] mb-1.5">
            Conciliación de Cantidades
          </p>
          <p className="text-xs text-[#151c27]">
            Factura: <span className="font-mono font-bold">{reconciliation.expectedQty.toLocaleString('es-CO')}</span>
          </p>
          <p className="text-xs text-[#151c27]">
            Registrado:{' '}
            <span className="font-mono font-bold">{reconciliation.registeredQty.toLocaleString('es-CO')}</span>
          </p>
          {reconciliation.matches ? (
            <span className="inline-block mt-1.5 text-[11px] font-bold text-[#006c4b] bg-[#ecfdf5] px-2 py-0.5 rounded-full">
              Cuadra
            </span>
          ) : (
            <span className="inline-block mt-1.5 text-[11px] font-bold text-[#93000a] bg-[#ffdad6] px-2 py-0.5 rounded-full">
              {reconciliation.difference > 0 ? `+${reconciliation.difference}` : reconciliation.difference} piezas de
              diferencia
            </span>
          )}
          {factura.reconciled ? (
            <p className="text-[11px] text-[#7a7583] mt-1.5">{factura.reconciliationNote}</p>
          ) : (
            <button
              onClick={() => onReconcile(factura.id)}
              disabled={reconciliation.registeredQty === 0}
              className="mt-2 w-full text-[11px] font-bold text-white bg-[#a43073] hover:bg-[#85145a] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg py-1.5 cursor-pointer"
            >
              Conciliar y Ajustar Nómina
            </button>
          )}
        </div>

        {/* Cobro */}
        <div className="border border-[#cac4d4]/70 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a7583] mb-1.5">Cobro al Cliente</p>
          {!isDelivered ? (
            <p className="text-xs text-[#7a7583]">Se calcula al entregar (10 días después).</p>
          ) : (
            <>
              <p className="text-xs text-[#151c27]">
                Esperado:{' '}
                <span className="font-bold">
                  {factura.paymentExpectedDateISO ? formatDateEs(factura.paymentExpectedDateISO) : '—'}
                </span>
              </p>
              <span
                className={`inline-block mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  factura.paymentStatus === 'cobrado'
                    ? 'bg-[#ecfdf5] text-[#006c4b]'
                    : paymentOverdue
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : 'bg-[#fef3c7] text-[#92400e]'
                }`}
              >
                {factura.paymentStatus === 'cobrado' ? 'Cobrado' : paymentOverdue ? 'Atrasado' : 'Pendiente'}
              </span>
              {factura.paymentStatus !== 'cobrado' && (
                <button
                  onClick={() => onMarkPaid(factura.id)}
                  className="mt-2 w-full text-[11px] font-bold text-white bg-[#006c4b] hover:bg-[#005a3d] rounded-lg py-1.5 cursor-pointer"
                >
                  Marcar como Cobrado
                </button>
              )}
            </>
          )}
        </div>

        {/* Prefactura */}
        <div className="border border-[#cac4d4]/70 rounded-lg p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a7583] mb-1.5">
            Prefactura para el Cliente
          </p>
          <p className="text-[11px] text-[#7a7583] mb-2">
            Se genera automáticamente con los datos de esta factura, lista para enviar y gestionar el pago.
          </p>
          <span className="inline-block text-[10px] font-bold text-[#9a3412] bg-[#ffedd5] border border-[#fb923c]/30 px-2 py-0.5 rounded-full mb-2">
            Formato provisional
          </span>
          <button
            onClick={() => openPrintablePrefactura(factura)}
            className="w-full text-[11px] font-bold text-white bg-[#ca2164] hover:bg-[#a3144d] rounded-lg py-1.5 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[14px]">description</span>
            Generar Prefactura
          </button>
        </div>
      </div>
    </div>
  );
};
