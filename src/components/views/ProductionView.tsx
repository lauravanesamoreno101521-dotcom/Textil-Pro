import React, { useMemo, useState } from 'react';
import { GarmentRateGroup, Operative, ProductionEntry } from '../../types';
import { TaskRatesPanel } from '../TaskRatesPanel';
import { GarmentRateModal } from '../modals/GarmentRateModal';
import { formatCOP } from '../../utils/format';
import { PayrollPeriod, summarizePayrollByOperative, toISODate } from '../../utils/payroll';

interface ProductionViewProps {
  operatives: Operative[];
  productionHistory: ProductionEntry[];
  taskRates: GarmentRateGroup[];
  onAddProductionEntry: (entry: Omit<ProductionEntry, 'id'>) => void;
  onSelectOperative: (operative: Operative) => void;
  onSaveGarmentRateGroup: (group: GarmentRateGroup) => void;
  onDeleteGarmentRateGroup: (groupId: string) => void;
  searchQuery: string;
}

export const ProductionView: React.FC<ProductionViewProps> = ({
  operatives,
  productionHistory,
  taskRates,
  onAddProductionEntry,
  onSelectOperative,
  onSaveGarmentRateGroup,
  onDeleteGarmentRateGroup,
  searchQuery
}) => {
  const [selectedOperativeId, setSelectedOperativeId] = useState<string>('OP-001');
  const [selectedGarmentGroupId, setSelectedGarmentGroupId] = useState<string>(taskRates[0]?.id || '');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(taskRates[0]?.tasks[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(25);
  const [machineId, setMachineId] = useState<string>('MC-104');
  const [showAllOperatives, setShowAllOperatives] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [ratesModalGroup, setRatesModalGroup] = useState<GarmentRateGroup | null>(null);
  const [payrollPeriod, setPayrollPeriod] = useState<PayrollPeriod>('day');

  const selectedGroup = taskRates.find((g) => g.id === selectedGarmentGroupId) || null;
  const selectedTask = selectedGroup?.tasks.find((t) => t.id === selectedTaskId) || null;
  const currentRate = selectedTask?.price || 0;

  const handleGarmentGroupChange = (groupId: string) => {
    setSelectedGarmentGroupId(groupId);
    const group = taskRates.find((g) => g.id === groupId);
    setSelectedTaskId(group?.tasks[0]?.id || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOperativeId || quantity <= 0 || !selectedGroup || !selectedTask) return;

    const op = operatives.find((o) => o.id === selectedOperativeId);
    const operativeName = op ? op.name : 'Operario';

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onAddProductionEntry({
      time: timeStr,
      date: 'Hoy',
      dateISO: toISODate(now),
      machineId: machineId || 'MC-104',
      operativeId: selectedOperativeId,
      operativeName,
      garmentType: selectedGroup.garmentName,
      taskName: selectedTask.name,
      batchQty: Number(quantity),
      ratePerPiece: currentRate,
      totalPay: Number(quantity) * currentRate
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const payrollSummary = useMemo(
    () => summarizePayrollByOperative(productionHistory, payrollPeriod),
    [productionHistory, payrollPeriod]
  );

  const handleExportCSV = () => {
    const csvContent = [
      ['ID Operario', 'Nombre', 'Piezas', 'Pago Pendiente'],
      ...operatives.map(op => [op.id, op.name, op.piecesCompleted, formatCOP(op.totalEarnings)])
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

  // Filter history by search query
  const filteredHistory = productionHistory.filter(p => {
    return (
      searchQuery === '' ||
      p.operativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.machineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.garmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
        <h1 className="text-3xl font-bold text-[#674bb5] tracking-tight">Producción y Nómina</h1>
        <p className="text-sm text-[#494552] mt-1">
          Registro diario de producción a destajo y resumen de pagos a operarios.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Form: Record Production */}
        <div className="xl:col-span-4 bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)] h-fit">
          <h2 className="text-lg font-bold text-[#674bb5] border-b border-[#cac4d4] pb-3 mb-4 flex items-center justify-between">
            <span>Registrar Producción</span>
            <span className="text-xs font-normal text-[#494552] bg-[#f0f3ff] px-2 py-0.5 rounded">
              A destajo
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Operative Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#494552]">Operario</label>
              <select
                value={selectedOperativeId}
                onChange={(e) => setSelectedOperativeId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] bg-white text-sm text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none cursor-pointer"
              >
                {operatives.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.id} {op.name}
                  </option>
                ))}
              </select>
            </div>

            {taskRates.length === 0 ? (
              <div className="p-3 bg-[#fdf2f8] border border-[#ffd8e7] rounded-lg text-xs text-[#a43073]">
                Primero agrega al menos una prenda con sus labores estandarizadas más abajo, para poder registrar producción.
              </div>
            ) : (
              <>
                {/* Prenda Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#494552]">Prenda</label>
                  <select
                    value={selectedGarmentGroupId}
                    onChange={(e) => handleGarmentGroupChange(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] bg-white text-sm text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none cursor-pointer"
                  >
                    {taskRates.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.garmentName || '(Sin nombre)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Labor Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#494552]">Labor Realizada</label>
                  <select
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                    disabled={!selectedGroup || selectedGroup.tasks.length === 0}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] bg-white text-sm text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none cursor-pointer disabled:bg-[#f0f3ff] disabled:text-[#7a7583]"
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

                {/* Quantity & Rate (auto) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#494552]">Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2 rounded-lg border border-[#cac4d4] bg-white font-mono text-sm text-[#151c27] focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#494552]">Tarifa / Pieza</label>
                    <div className="w-full p-2 rounded-lg border border-[#cac4d4] bg-[#f0f3ff] font-mono text-sm text-[#494552]">
                      {formatCOP(currentRate, 1)}
                    </div>
                  </div>
                </div>

                {/* Machine ID */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#494552]">ID de Máquina</label>
                  <select
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#cac4d4] bg-white font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                  >
                    <option value="MC-104">MC-104 (Plana Industrial)</option>
                    <option value="MC-201">MC-201 (Remalladora 5 Hilos)</option>
                    <option value="MC-305">MC-305 (Recubridora Collarín)</option>
                    <option value="MC-402">MC-402 (Botonadora y Ojal)</option>
                  </select>
                </div>

                {/* Live Total Calculation */}
                <div className="p-3 bg-[#ede9fe]/50 rounded-lg border border-[#a78bfa]/40 flex justify-between items-center text-xs">
                  <span className="text-[#3c1989] font-medium">Pago estimado por lote:</span>
                  <span className="font-mono font-bold text-sm text-[#674bb5]">
                    {formatCOP(quantity * currentRate)}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedGroup || !selectedTask}
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    saveSuccess
                      ? 'bg-[#006c4b] text-white'
                      : 'bg-[#674bb5] hover:bg-[#4f319c] text-white active:scale-98'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {saveSuccess ? 'check' : 'save'}
                  </span>
                  <span>{saveSuccess ? '¡Entrada Guardada!' : 'Guardar Registro'}</span>
                </button>
              </>
            )}
          </form>
        </div>

        {/* Right Section: Active Operatives & Pending Payroll */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Active Operatives Grid */}
          <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
            <div className="flex justify-between items-center border-b border-[#cac4d4] pb-3 mb-4">
              <h2 className="text-lg font-bold text-[#674bb5]">
                Operarios Activos ({operatives.length})
              </h2>
              <span className="text-xs font-semibold text-[#006c4b] bg-[#ecfdf5] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                Turno A
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {displayedOperatives.map((op) => (
                <div
                  key={op.id}
                  onClick={() => onSelectOperative(op)}
                  className="border border-[#cac4d4] rounded-xl p-3 flex flex-col items-center text-center hover:border-[#a43073] hover:bg-[#fdf2f8]/30 transition-all cursor-pointer relative group bg-white shadow-xs"
                >
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#34D399] ring-2 ring-white" />
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
                  <span className="text-[10px] text-[#006c4b] font-medium mt-1 bg-[#ecfdf5] px-2 py-0.5 rounded-full">
                    {op.piecesCompleted} pzas
                  </span>
                </div>
              ))}

              {/* View All Button */}
              <div
                onClick={() => setShowAllOperatives(!showAllOperatives)}
                className="border border-[#cac4d4] border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center text-[#494552] hover:border-[#a43073] hover:text-[#a43073] hover:bg-[#fdf2f8]/20 transition-all cursor-pointer bg-[#f9f9ff]"
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
              <h2 className="text-lg font-bold text-[#674bb5]">Nómina Pendiente (Histórico Total)</h2>
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
                  {operatives.map((op) => (
                    <tr
                      key={op.id}
                      onClick={() => onSelectOperative(op)}
                      className="hover:bg-[#f0f3ff] transition-colors cursor-pointer h-10"
                    >
                      <td className="py-2 px-3 font-mono font-medium text-[#674bb5]">{op.id}</td>
                      <td className="py-2 px-3 font-medium text-[#151c27]">{op.name}</td>
                      <td className="py-2 px-3 text-right font-mono text-[#494552]">
                        {op.piecesCompleted}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-[#674bb5]">
                        {formatCOP(op.totalEarnings)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Automatic Payroll Summary (Day / Week / Month) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#cac4d4] pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#674bb5]">Nómina Automática</h2>
            <p className="text-xs text-[#494552] mt-0.5">
              Calculada a partir de los registros de producción guardados con prenda y labor.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f0f3ff] p-1 rounded-lg border border-[#cac4d4] w-fit">
            {([
              { id: 'day', label: 'Hoy' },
              { id: 'week', label: 'Esta Semana' },
              { id: 'month', label: 'Este Mes' }
            ] as { id: PayrollPeriod; label: string }[]).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPayrollPeriod(opt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  payrollPeriod === opt.id
                    ? 'bg-[#674bb5] text-white shadow-sm'
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
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                  <th className="py-2 px-3">ID Operario</th>
                  <th className="py-2 px-3">Nombre</th>
                  <th className="py-2 px-3 text-right">Registros</th>
                  <th className="py-2 px-3 text-right">Piezas</th>
                  <th className="py-2 px-3 text-right">Total a Pagar</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#cac4d4]/40">
                {payrollSummary.map((s) => (
                  <tr key={s.operativeId} className="h-10">
                    <td className="py-2 px-3 font-mono font-medium text-[#674bb5]">{s.operativeId}</td>
                    <td className="py-2 px-3 font-medium text-[#151c27]">{s.operativeName}</td>
                    <td className="py-2 px-3 text-right font-mono text-[#494552]">{s.entries}</td>
                    <td className="py-2 px-3 text-right font-mono text-[#494552]">
                      {s.totalQty.toLocaleString('es-CO')}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-[#006c4b]">
                      {formatCOP(s.totalPay)}
                    </td>
                  </tr>
                ))}
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
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Standardized Task Rates */}
      <TaskRatesPanel
        taskRates={taskRates}
        searchQuery={searchQuery}
        onEditGroup={(group) => setRatesModalGroup(group)}
        onAddGroup={handleAddGarmentGroup}
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
      />

      {/* Daily Machine History */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)] overflow-hidden">
        <div className="flex justify-between items-center border-b border-[#cac4d4] pb-3 mb-3">
          <h2 className="text-lg font-bold text-[#674bb5]">Historial de Producción Diaria</h2>
          <div className="flex items-center gap-1.5 text-xs text-[#494552] bg-[#f0f3ff] px-2.5 py-1 rounded-md border border-[#cac4d4]">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span className="font-semibold">Hoy</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#f0f3ff] border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                <th className="py-2.5 px-3.5">Hora</th>
                <th className="py-2.5 px-3.5">ID Máquina</th>
                <th className="py-2.5 px-3.5">Operario</th>
                <th className="py-2.5 px-3.5">Prenda</th>
                <th className="py-2.5 px-3.5">Labor</th>
                <th className="py-2.5 px-3.5 text-right">Cantidad Lote</th>
                <th className="py-2.5 px-3.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#cac4d4]/40">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-[#f0f3ff] transition-colors h-11">
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
      </div>
    </div>
  );
};
