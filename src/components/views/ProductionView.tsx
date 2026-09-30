import React, { useEffect, useMemo, useState } from 'react';
import { GarmentRateGroup, InventoryItem, Operative, PayrollPayment, ProductionEntry } from '../../types';
import { TaskRatesPanel } from '../TaskRatesPanel';
import { GarmentRateModal } from '../modals/GarmentRateModal';
import { formatCOP } from '../../utils/format';
import {
  PayrollPeriod,
  PAYROLL_PERIOD_LABELS,
  getPeriodStartISO,
  summarizePayrollByOperative,
  getUnpaidTotalsByOperative
} from '../../utils/payroll';
import { openPrintableReceipt, openWhatsAppReceipt } from '../../utils/receipt';

const HISTORY_PAGE_SIZE = 20;

interface ProductionViewProps {
  operatives: Operative[];
  productionHistory: ProductionEntry[];
  taskRates: GarmentRateGroup[];
  payrollPayments: PayrollPayment[];
  inventory: InventoryItem[];
  onSelectOperative: (operative: Operative) => void;
  onSaveGarmentRateGroup: (group: GarmentRateGroup) => void;
  onDeleteGarmentRateGroup: (groupId: string) => void;
  onPayOperativePeriod: (operativeId: string, period: PayrollPeriod) => PayrollPayment | null;
  searchQuery: string;
}

export const ProductionView: React.FC<ProductionViewProps> = ({
  operatives,
  productionHistory,
  taskRates,
  payrollPayments,
  inventory,
  onSelectOperative,
  onSaveGarmentRateGroup,
  onDeleteGarmentRateGroup,
  onPayOperativePeriod,
  searchQuery
}) => {
  const hiloItems = useMemo(() => inventory.filter((i) => i.category === 'Hilos'), [inventory]);
  const [showAllOperatives, setShowAllOperatives] = useState<boolean>(false);
  const [ratesModalGroup, setRatesModalGroup] = useState<GarmentRateGroup | null>(null);
  const [payrollPeriod, setPayrollPeriod] = useState<PayrollPeriod>('day');
  const [historyPeriod, setHistoryPeriod] = useState<PayrollPeriod | 'all'>('day');
  const [historyPage, setHistoryPage] = useState<number>(1);
  const [justPaid, setJustPaid] = useState<Record<string, PayrollPayment>>({});

  const payrollSummary = useMemo(
    () => summarizePayrollByOperative(productionHistory, payrollPeriod),
    [productionHistory, payrollPeriod]
  );

  const unpaidTotals = useMemo(() => getUnpaidTotalsByOperative(productionHistory), [productionHistory]);
  const unpaidByOperative = useMemo(() => {
    const map = new Map<string, { totalQty: number; totalPay: number }>();
    unpaidTotals.forEach((u) => map.set(u.operativeId, { totalQty: u.totalQty, totalPay: u.totalPay }));
    return map;
  }, [unpaidTotals]);

  const handlePay = (operativeId: string) => {
    const payment = onPayOperativePeriod(operativeId, payrollPeriod);
    if (payment) {
      setJustPaid((prev) => ({ ...prev, [operativeId]: payment }));
    }
  };

  const handlePrintReceipt = (payment: PayrollPayment) => openPrintableReceipt(payment);
  const handleSendWhatsApp = (payment: PayrollPayment) => {
    const op = operatives.find((o) => o.id === payment.operativeId);
    openWhatsAppReceipt(payment, op?.phone);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['ID Operario', 'Nombre', 'Piezas Pendientes', 'Pago Pendiente'],
      ...operatives.map((op) => {
        const unpaid = unpaidByOperative.get(op.id);
        return [op.id, op.name, unpaid?.totalQty || 0, formatCOP(unpaid?.totalPay || 0)];
      })
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TextilePro_Payroll_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter history by período (día/semana/quincena/mes/todo) y por búsqueda
  const filteredHistory = useMemo(() => {
    const periodStartISO = historyPeriod === 'all' ? null : getPeriodStartISO(historyPeriod);
    return productionHistory.filter((p) => {
      const matchesPeriod = periodStartISO === null || p.dateISO >= periodStartISO;
      const matchesSearch =
        searchQuery === '' ||
        p.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.machineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.garmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.facturaRef || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPeriod && matchesSearch;
    });
  }, [productionHistory, historyPeriod, searchQuery]);

  // El historial se va acumulando indefinidamente (nunca se borra); para que
  // no quede eterno en pantalla se pagina de a 20 registros.
  const historyPageCount = Math.max(1, Math.ceil(filteredHistory.length / HISTORY_PAGE_SIZE));
  const paginatedHistory = filteredHistory.slice(
    (historyPage - 1) * HISTORY_PAGE_SIZE,
    historyPage * HISTORY_PAGE_SIZE
  );

  useEffect(() => {
    setHistoryPage(1);
  }, [historyPeriod, searchQuery]);

  const displayedOperatives = showAllOperatives ? operatives : operatives.slice(0, 4);

  const handleAddGarmentGroup = () => {
    setRatesModalGroup({
      id: `GARMENT-${Date.now()}`,
      garmentName: '',
      tasks: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Page Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-[#ca2164] tracking-tight">Producción y Nómina</h1>
        <p className="text-sm text-[#494552] mt-1">
          Registro diario de producción a destajo y resumen de pagos a operarios.
        </p>
      </div>

      {/* Active Operatives Grid */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex justify-between items-center border-b border-[#cac4d4] pb-3 mb-4">
          <h2 className="text-lg font-bold text-[#ca2164]">
            Operarios ({operatives.length})
          </h2>
          <p className="text-[11px] text-[#7a7583] hidden sm:block">
            Cada operario registra su propia producción desde su pantalla. Toca una tarjeta para ver su detalle o marcarlo como inactivo.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5">
          {displayedOperatives.map((op) => (
            <div
              key={op.id}
              onClick={() => onSelectOperative(op)}
              className={`border rounded-xl p-3 flex flex-col items-center text-center transition-all cursor-pointer relative group shadow-xs ${
                op.active
                  ? 'border-[#cac4d4] bg-white hover:border-[#a43073] hover:bg-[#fdf2f8]/30'
                  : 'border-[#cac4d4] bg-[#f3f3f5] grayscale opacity-70 hover:opacity-90'
              }`}
            >
              <div
                className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                  op.active ? 'bg-[#34D399]' : 'bg-[#9ca3af]'
                }`}
              />
              <div className="w-13 h-13 rounded-full overflow-hidden mb-2 border border-[#cac4d4] group-hover:scale-105 transition-transform">
                <img
                  src={op.avatar}
                  alt={op.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#151c27] truncate w-full group-hover:text-[#a43073]">
                {op.name}
              </span>
              <span className="font-mono text-[11px] text-[#494552]">{op.id}</span>
              {op.active ? (
                <span className="text-[10px] text-[#006c4b] font-medium mt-1 bg-[#ecfdf5] px-2 py-0.5 rounded-full">
                  {op.piecesCompleted} pzas
                </span>
              ) : (
                <span className="text-[10px] text-[#7a7583] font-bold mt-1 bg-[#e5e7eb] px-2 py-0.5 rounded-full">
                  Inactivo
                </span>
              )}
            </div>
          ))}

          {/* View All Button */}
          <div
            onClick={() => setShowAllOperatives(!showAllOperatives)}
            className="border border-[#cac4d4] border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center text-[#494552] hover:border-[#a43073] hover:text-[#a43073] hover:bg-[#fdf2f8]/20 transition-all cursor-pointer bg-[#fefafb]"
          >
            <span className="material-symbols-outlined text-[26px] mb-1">
              {showAllOperatives ? 'expand_less' : 'more_horiz'}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {showAllOperatives ? 'COLAPSAR' : `VER TODOS (${operatives.length})`}
            </span>
          </div>
        </div>
      </div>

      {/* Pending Payroll Table */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex justify-between items-center border-b border-[#cac4d4] pb-3 mb-3">
          <h2 className="text-lg font-bold text-[#ca2164]">Nómina Pendiente (Sin Pagar)</h2>
          <button
            onClick={handleExportCSV}
            className="text-xs font-bold text-[#a43073] hover:underline flex items-center gap-1 px-2.5 py-1 rounded hover:bg-[#ffd8e7] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[450px]">
            <thead>
              <tr className="border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                <th className="py-2 px-3">ID Operario</th>
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3 text-right">Piezas</th>
                <th className="py-2 px-3 text-right">Pago Pendiente</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#cac4d4]/40">
              {operatives.map((op) => {
                const unpaid = unpaidByOperative.get(op.id);
                return (
                  <tr
                    key={op.id}
                    onClick={() => onSelectOperative(op)}
                    className={`transition-colors cursor-pointer h-10 ${
                      op.active ? 'hover:bg-[#fdf1f6]' : 'text-[#9ca3af] hover:bg-[#f3f3f5]'
                    }`}
                  >
                    <td className="py-2 px-3 font-mono font-medium text-[#ca2164]">{op.id}</td>
                    <td className="py-2 px-3 font-medium text-[#151c27]">
                      {op.name}
                      {!op.active && <span className="ml-1.5 text-[10px] font-bold text-[#9ca3af]">(Inactivo)</span>}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-[#494552]">
                      {unpaid?.totalQty || 0}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-[#ca2164]">
                      {formatCOP(unpaid?.totalPay || 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automatic Payroll Summary (Day / Week / Month) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cac4d4] pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#ca2164]">Nómina Automática</h2>
            <p className="text-xs text-[#494552] mt-0.5">
              Calculada a partir de los registros de producción guardados con prenda y labor.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#fdf1f6] p-1 rounded-lg border border-[#cac4d4] w-fit">
            {([
              { id: 'day', label: 'Hoy' },
              { id: 'week', label: 'Esta Semana' },
              { id: 'quincena', label: 'Quincena' },
              { id: 'month', label: 'Este Mes' }
            ] as { id: PayrollPeriod; label: string }[]).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPayrollPeriod(opt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  payrollPeriod === opt.id
                    ? 'bg-[#ca2164] text-white shadow-sm'
                    : 'text-[#494552] hover:bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {payrollSummary.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-8">
            Aún no hay registros de producción en este período. Guarda un registro arriba para empezar a calcular la nómina automáticamente.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                  <th className="py-2 px-3">ID Operario</th>
                  <th className="py-2 px-3">Nombre</th>
                  <th className="py-2 px-3 text-right">Registros</th>
                  <th className="py-2 px-3 text-right">Piezas</th>
                  <th className="py-2 px-3 text-right">Total a Pagar</th>
                  <th className="py-2 px-3 text-right">Pago / Recibo</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#cac4d4]/40">
                {payrollSummary.map((s) => {
                  const unpaid = unpaidByOperative.get(s.operativeId);
                  const alreadyPaid = !unpaid || unpaid.totalPay === 0;
                  const receipt = justPaid[s.operativeId];
                  return (
                    <tr key={s.operativeId} className="h-10">
                      <td className="py-2 px-3 font-mono font-medium text-[#ca2164]">{s.operativeId}</td>
                      <td className="py-2 px-3 font-medium text-[#151c27]">{s.operativeName}</td>
                      <td className="py-2 px-3 text-right font-mono text-[#494552]">{s.entries}</td>
                      <td className="py-2 px-3 text-right font-mono text-[#494552]">
                        {s.totalQty.toLocaleString('es-CO')}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-[#006c4b]">
                        {formatCOP(s.totalPay)}
                      </td>
                      <td className="py-2 px-3 text-right">
                        {receipt ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handlePrintReceipt(receipt)}
                              title="Imprimir recibo"
                              className="w-7 h-7 flex items-center justify-center rounded-md border border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6] cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">print</span>
                            </button>
                            <button
                              onClick={() => handleSendWhatsApp(receipt)}
                              title="Enviar recibo por WhatsApp"
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-[#25D366] text-white hover:bg-[#1ebc59] cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">chat</span>
                            </button>
                          </div>
                        ) : alreadyPaid ? (
                          <span className="text-[11px] font-semibold text-[#7a7583]">Ya pagado</span>
                        ) : (
                          <button
                            onClick={() => handlePay(s.operativeId)}
                            className="text-[11px] font-bold text-white bg-[#ca2164] hover:bg-[#a3144d] px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Pagar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#cac4d4] text-xs font-bold">
                  <td className="py-2 px-3" colSpan={3}>
                    Total del período
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-[#151c27]">
                    {payrollSummary.reduce((sum, s) => sum + s.totalQty, 0).toLocaleString('es-CO')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-[#a43073]">
                    {formatCOP(payrollSummary.reduce((sum, s) => sum + s.totalPay, 0))}
                  </td>
                  <td className="py-2 px-3" />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Historial de Pagos de Nómina (recibos) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="border-b border-[#cac4d4] pb-3 mb-3">
          <h2 className="text-lg font-bold text-[#ca2164]">Historial de Pagos</h2>
          <p className="text-xs text-[#494552] mt-0.5">
            Cada pago queda guardado aquí para poder reimprimir o reenviar el recibo cuando lo necesites.
          </p>
        </div>

        {payrollPayments.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-6">Todavía no se ha pagado ninguna nómina.</p>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {payrollPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-3 border border-[#cac4d4]/60 rounded-lg px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#151c27] truncate">{payment.operativeName}</p>
                  <p className="text-[11px] text-[#7a7583]">{payment.periodLabel}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-bold text-sm text-[#006c4b]">{formatCOP(payment.totalPay)}</span>
                  <button
                    onClick={() => handlePrintReceipt(payment)}
                    title="Imprimir recibo"
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                  </button>
                  <button
                    onClick={() => handleSendWhatsApp(payment)}
                    title="Enviar recibo por WhatsApp"
                    className="w-7 h-7 flex items-center justify-center rounded-md bg-[#25D366] text-white hover:bg-[#1ebc59] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standardized Task Rates */}
      <TaskRatesPanel
        taskRates={taskRates}
        searchQuery={searchQuery}
        onEditGroup={(group) => setRatesModalGroup(group)}
        onAddGroup={handleAddGarmentGroup}
        hiloItems={hiloItems}
      />

      <GarmentRateModal
        isOpen={!!ratesModalGroup}
        group={ratesModalGroup}
        onClose={() => setRatesModalGroup(null)}
        onSave={onSaveGarmentRateGroup}
        onDelete={
          ratesModalGroup && taskRates.some((g) => g.id === ratesModalGroup.id)
            ? onDeleteGarmentRateGroup
            : undefined
        }
        hiloItems={hiloItems}
      />

      {/* Historial de Producción (con histórico acumulado y paginación) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cac4d4] pb-3 mb-3">
          <div>
            <h2 className="text-lg font-bold text-[#ca2164]">Historial de Producción</h2>
            <p className="text-xs text-[#494552] mt-0.5">
              Se guarda todo el histórico; usa el período para filtrar y las flechas para pasar de página.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#fdf1f6] p-1 rounded-lg border border-[#cac4d4] w-fit">
            {([
              { id: 'day', label: PAYROLL_PERIOD_LABELS.day },
              { id: 'week', label: PAYROLL_PERIOD_LABELS.week },
              { id: 'quincena', label: PAYROLL_PERIOD_LABELS.quincena },
              { id: 'month', label: PAYROLL_PERIOD_LABELS.month },
              { id: 'all', label: 'Todo' }
            ] as { id: PayrollPeriod | 'all'; label: string }[]).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHistoryPeriod(opt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  historyPeriod === opt.id
                    ? 'bg-[#ca2164] text-white shadow-sm'
                    : 'text-[#494552] hover:bg-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-8">
            No hay registros de producción en este período.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-[#fdf1f6] border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                    <th className="py-2.5 px-3.5">Hora</th>
                    <th className="py-2.5 px-3.5">ID Máquina</th>
                    <th className="py-2.5 px-3.5">Operario</th>
                    <th className="py-2.5 px-3.5">Prenda</th>
                    <th className="py-2.5 px-3.5">Labor</th>
                    <th className="py-2.5 px-3.5">Factura</th>
                    <th className="py-2.5 px-3.5 text-right">Cantidad Lote</th>
                    <th className="py-2.5 px-3.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-[#cac4d4]/40">
                  {paginatedHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fdf1f6] transition-colors h-11">
                      <td className="py-2 px-3.5 font-mono text-[#494552]">{item.time}</td>
                      <td className="py-2 px-3.5 font-mono font-semibold text-[#151c27]">
                        {item.machineId}
                      </td>
                      <td className="py-2 px-3.5 font-medium text-[#151c27]">{item.operativeName}</td>
                      <td className="py-2 px-3.5">
                        <span className="bg-[#fdf2f8] text-[#a43073] border border-[#ffd8e7] px-2 py-0.5 rounded text-[11px] font-semibold">
                          {item.garmentType}
                        </span>
                      </td>
                      <td className="py-2 px-3.5 text-[#494552]">{item.taskName}</td>
                      <td className="py-2 px-3.5 font-mono text-[#494552]">{item.facturaRef || '—'}</td>
                      <td className="py-2 px-3.5 text-right font-mono font-bold text-[#151c27]">
                        {item.batchQty}
                      </td>
                      <td className="py-2 px-3.5 text-right font-mono font-bold text-[#006c4b]">
                        {formatCOP(item.totalPay)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {historyPageCount > 1 && (
              <div className="flex items-center justify-between gap-3 pt-4 mt-2 border-t border-[#cac4d4]/60">
                <p className="text-[11px] text-[#7a7583]">
                  Mostrando {(historyPage - 1) * HISTORY_PAGE_SIZE + 1}–
                  {Math.min(historyPage * HISTORY_PAGE_SIZE, filteredHistory.length)} de {filteredHistory.length} registros
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                    disabled={historyPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <span className="text-xs font-bold text-[#151c27] font-mono">
                    Página {historyPage} de {historyPageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHistoryPage((p) => Math.min(historyPageCount, p + 1))}
                    disabled={historyPage === historyPageCount}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
