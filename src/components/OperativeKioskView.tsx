import React, { useMemo, useState } from 'react';
import { GarmentRateGroup, InventoryItem, Operative, ProductionEntry, ThreadConsumptionLog } from '../types';
import { formatCOP } from '../utils/format';
import { PayrollPeriod, PAYROLL_PERIOD_LABELS, summarizePayrollByOperative, toISODate } from '../utils/payroll';
import { estimateTaskThreadUsage, getThreadStockAlert } from '../utils/threadConsumption';

interface OperativeKioskViewProps {
  operative: Operative;
  productionHistory: ProductionEntry[];
  taskRates: GarmentRateGroup[];
  inventory: InventoryItem[];
  threadLogs: ThreadConsumptionLog[];
  onAddProductionEntry: (entry: Omit<ProductionEntry, 'id'>) => void;
  onExit: () => void;
}

const PERIOD_ORDER: PayrollPeriod[] = ['day', 'week', 'quincena', 'month'];

export const OperativeKioskView: React.FC<OperativeKioskViewProps> = ({
  operative,
  productionHistory,
  taskRates,
  inventory,
  threadLogs,
  onAddProductionEntry,
  onExit
}) => {
  const [selectedGarmentGroupId, setSelectedGarmentGroupId] = useState<string>(taskRates[0]?.id || '');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(taskRates[0]?.tasks[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(0);
  const [facturaRef, setFacturaRef] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedGroup = taskRates.find((g) => g.id === selectedGarmentGroupId) || null;
  const selectedTask = selectedGroup?.tasks.find((t) => t.id === selectedTaskId) || null;
  const currentRate = selectedTask?.price || 0;

  const threadEstimate = useMemo(() => {
    if (!selectedTask || !selectedGroup || quantity <= 0) return null;
    return estimateTaskThreadUsage(selectedTask, selectedGroup.garmentName, quantity, threadLogs, inventory);
  }, [selectedTask, selectedGroup, quantity, threadLogs, inventory]);

  const threadAlert = useMemo(() => {
    if (!threadEstimate) return null;
    const hiloItem = inventory.find((i) => i.id === threadEstimate.hiloItemId);
    if (!hiloItem) return null;
    return getThreadStockAlert(hiloItem, threadEstimate.estimatedGrams);
  }, [threadEstimate, inventory]);

  const handleGarmentGroupChange = (groupId: string) => {
    setSelectedGarmentGroupId(groupId);
    const group = taskRates.find((g) => g.id === groupId);
    setSelectedTaskId(group?.tasks[0]?.id || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0 || !selectedGroup || !selectedTask) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onAddProductionEntry({
      time: timeStr,
      date: 'Hoy',
      dateISO: toISODate(now),
      machineId: operative.assignedMachine || 'N/A',
      operativeId: operative.id,
      operativeName: operative.name,
      garmentType: selectedGroup.garmentName,
      taskName: selectedTask.name,
      batchQty: Number(quantity),
      ratePerPiece: currentRate,
      totalPay: Number(quantity) * currentRate,
      facturaRef: facturaRef.trim() || undefined
    });

    setQuantity(0);
    setFacturaRef('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const myHistory = useMemo(
    () => productionHistory.filter((p) => p.operativeId === operative.id),
    [productionHistory, operative.id]
  );

  const myTodayEntries = useMemo(() => {
    const todayISO = toISODate(new Date());
    return myHistory.filter((p) => p.dateISO === todayISO).slice(0, 8);
  }, [myHistory]);

  const periodStats = useMemo(
    () =>
      PERIOD_ORDER.map((periodId) => {
        const summary = summarizePayrollByOperative(myHistory, periodId).find(
          (s) => s.operativeId === operative.id
        );
        return {
          id: periodId,
          label: PAYROLL_PERIOD_LABELS[periodId],
          totalQty: summary?.totalQty || 0,
          totalPay: summary?.totalPay || 0
        };
      }),
    [myHistory, operative.id]
  );

  return (
    <div className="min-h-screen w-full bg-[#fefafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#cac4d4] px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#cac4d4] shrink-0">
            <img src={operative.avatar} alt={operative.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#151c27] leading-tight truncate">{operative.name}</h1>
            <p className="text-xs text-[#494552] truncate">{operative.specialty}</p>
          </div>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#a43073] border border-[#ffd8e7] bg-[#fdf2f8] px-3.5 py-2 rounded-lg hover:bg-[#ffd8e7] transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="hidden sm:inline">Cambiar de operario</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 space-y-6 pb-16">
        {/* Registration Form */}
        <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
          <h2 className="text-lg font-bold text-[#ca2164] border-b border-[#cac4d4] pb-3 mb-4">
            Registrar lo que hiciste
          </h2>

          {taskRates.length === 0 ? (
            <div className="p-3 bg-[#fdf2f8] border border-[#ffd8e7] rounded-lg text-sm text-[#a43073]">
              Todavía no hay prendas ni labores cargadas. Avísale al jefe para que las agregue.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#494552]">
                  N.º de Factura (la que llegó o en la que trabajas)
                </label>
                <input
                  type="text"
                  value={facturaRef}
                  onChange={(e) => setFacturaRef(e.target.value)}
                  placeholder="Ej. 1042"
                  className="w-full p-3 rounded-lg border border-[#cac4d4] bg-white text-base text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#494552]">Prenda</label>
                <select
                  value={selectedGarmentGroupId}
                  onChange={(e) => handleGarmentGroupChange(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#cac4d4] bg-white text-base text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none cursor-pointer"
                >
                  {taskRates.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.garmentName || '(Sin nombre)'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#494552]">Labor que hiciste</label>
                <select
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  disabled={!selectedGroup || selectedGroup.tasks.length === 0}
                  className="w-full p-3 rounded-lg border border-[#cac4d4] bg-white text-base text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none cursor-pointer disabled:bg-[#fdf1f6] disabled:text-[#7a7583]"
                >
                  {selectedGroup && selectedGroup.tasks.length > 0 ? (
                    selectedGroup.tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.name} — {formatCOP(task.price, 1)}
                      </option>
                    ))
                  ) : (
                    <option value="">Esta prenda no tiene labores cargadas</option>
                  )}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#494552]">Cantidad de piezas</label>
                <input
                  type="number"
                  min="1"
                  value={quantity || ''}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0"
                  className="w-full p-3 rounded-lg border border-[#cac4d4] bg-white font-mono text-lg text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none"
                />
              </div>

              <div className="p-3.5 bg-[#fdeaf2]/50 rounded-lg border border-[#f797bd]/40 flex justify-between items-center">
                <span className="text-sm text-[#820d3c] font-medium">Vas a ganar por este lote:</span>
                <span className="font-mono font-bold text-lg text-[#ca2164]">
                  {formatCOP(quantity * currentRate)}
                </span>
              </div>

              {threadEstimate && threadAlert && (
                <div
                  className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
                    threadAlert.level === 'critico'
                      ? 'bg-[#FFE4E6] border-[#E11D48]/40'
                      : threadAlert.level === 'bajo'
                      ? 'bg-[#FEF9C3] border-[#A16207]/40'
                      : threadAlert.level === 'sin_datos'
                      ? 'bg-[#fdf1f6] border-[#cac4d4]'
                      : 'bg-[#DCFCE7] border-[#16A34A]/40'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                      threadAlert.level === 'critico'
                        ? 'text-[#E11D48]'
                        : threadAlert.level === 'bajo'
                        ? 'text-[#A16207]'
                        : threadAlert.level === 'sin_datos'
                        ? 'text-[#7a7583]'
                        : 'text-[#16A34A]'
                    }`}
                  >
                    linear_scale
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#151c27]">
                      {threadEstimate.estimatedGrams !== null
                        ? `Consumo estimado: ${threadEstimate.estimatedGrams.toLocaleString('es-CO', {
                            maximumFractionDigits: 1
                          })} g de ${threadEstimate.hiloName}`
                        : `Hilo asociado: ${threadEstimate.hiloName}`}
                    </p>
                    <p className="text-[11px] text-[#494552] mt-0.5">{threadAlert.message}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedGroup || !selectedTask || quantity <= 0}
                className={`w-full py-3.5 px-4 rounded-lg font-bold text-base transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  saveSuccess
                    ? 'bg-[#006c4b] text-white'
                    : 'bg-[#ca2164] hover:bg-[#a3144d] text-white active:scale-98'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {saveSuccess ? 'check' : 'save'}
                </span>
                <span>{saveSuccess ? '¡Guardado!' : 'Guardar Registro'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Payroll Summary */}
        <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
          <h2 className="text-lg font-bold text-[#ca2164] border-b border-[#cac4d4] pb-3 mb-4">
            Lo que llevas acumulado
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {periodStats.map((p) => (
              <div key={p.id} className="border border-[#cac4d4] rounded-lg p-3.5 bg-[#fefafb]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">{p.label}</p>
                <p className="text-lg font-bold text-[#ca2164] font-mono mt-1">{formatCOP(p.totalPay)}</p>
                <p className="text-xs text-[#7a7583] mt-0.5">{p.totalQty.toLocaleString('es-CO')} piezas</p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's entries */}
        <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
          <h2 className="text-lg font-bold text-[#ca2164] border-b border-[#cac4d4] pb-3 mb-4">
            Tus registros de hoy
          </h2>
          {myTodayEntries.length === 0 ? (
            <p className="text-sm text-[#7a7583] text-center py-6">
              Todavía no has registrado nada hoy.
            </p>
          ) : (
            <div className="space-y-2">
              {myTodayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between border border-[#cac4d4]/60 rounded-lg px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#151c27] truncate">
                      {entry.garmentType} · {entry.taskName}
                    </p>
                    <p className="text-xs text-[#7a7583]">
                      {entry.time}
                      {entry.facturaRef ? ` · Factura ${entry.facturaRef}` : ''}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-mono font-bold text-[#151c27]">{entry.batchQty} pzas</p>
                    <p className="text-xs font-mono text-[#006c4b] font-semibold">{formatCOP(entry.totalPay)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
