import React, { useMemo, useState } from 'react';
import { ActivityOrder, Factura, InventoryItem, NavView, Operative, ProductionEntry, ORDER_STATUS_LABELS } from '../../types';
import { getPeriodStartISO, toISODate } from '../../utils/payroll';
import { addDaysISO, getOrderDeliveryInfo } from '../../utils/deliveryDeadline';
import { CompanySplitCard } from '../CompanySplitCard';
import { OperativeLeaderboard } from '../OperativeLeaderboard';

// Redondea hacia arriba a un valor "bonito" (1/2/5 x potencia de 10) para usar
// como techo del eje Y del gráfico, en vez de un valor fijo.
function niceAxisMax(value: number): number {
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

// Escalón de opacidad por rango (mayor a menor) para codificar la magnitud
// con un solo tono (secuencial), en vez de colores arbitrarios por posición.
const BAR_OPACITY_STEPS = ['', '/85', '/70', '/60', '/50', '/45', '/40', '/35'];

interface DashboardViewProps {
  orders: ActivityOrder[];
  inventory: InventoryItem[];
  operatives: Operative[];
  productionHistory: ProductionEntry[];
  facturas: Factura[];
  totalMonthlyIncome: number;
  totalMonthlyExpenses: number;
  onNavigate: (view: NavView) => void;
  onSelectOrder?: (order: ActivityOrder) => void;
  onSelectOperative?: (operative: Operative) => void;
  searchQuery: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  inventory,
  operatives,
  productionHistory,
  facturas,
  totalMonthlyIncome,
  totalMonthlyExpenses,
  onNavigate,
  onSelectOrder,
  onSelectOperative,
  searchQuery
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [onlyUrgentDelivery, setOnlyUrgentDelivery] = useState<boolean>(false);
  const [hoveredOperativeId, setHoveredOperativeId] = useState<string | null>(null);

  // Critical stock items
  const criticalItems = inventory.filter(i => i.status === 'Crítico' || i.status === 'Bajo');

  // Pedidos cuyo tiempo de entrega (ventana de 9 días desde el ingreso)
  // requiere atención: ya deberían estar en despeluce, hoy toca empacar y
  // enviar, o ya están retrasados.
  const urgentOrders = useMemo(() => {
    return orders
      .map((o) => ({ order: o, delivery: getOrderDeliveryInfo(o) }))
      .filter((x) => x.delivery.urgency === 'despeluce' || x.delivery.urgency === 'dia-entrega' || x.delivery.urgency === 'retrasado')
      .sort((a, b) => (a.delivery.diasRestantes ?? 0) - (b.delivery.diasRestantes ?? 0));
  }, [orders]);

  // Producción de hoy, agrupada dinámicamente por prenda real (ya no hay
  // tipos de prenda fijos: dependen de las prendas cargadas en Producción).
  const todayGarmentTotals = useMemo(() => {
    const todayISO = toISODate(new Date());
    const totalsByGarment = new Map<string, number>();
    productionHistory
      .filter((p) => p.dateISO === todayISO)
      .forEach((p) => {
        totalsByGarment.set(p.garmentType, (totalsByGarment.get(p.garmentType) || 0) + p.batchQty);
      });
    return Array.from(totalsByGarment.entries())
      .map(([garmentType, qty]) => ({ garmentType, qty }))
      .sort((a, b) => b.qty - a.qty);
  }, [productionHistory]);

  const todayTotalPieces = todayGarmentTotals.reduce((sum, g) => sum + g.qty, 0);

  // Producción real de la semana en curso (lunes a hoy), agrupada por
  // operario, para el gráfico "Producción Semanal por Operario".
  const weeklyOperativeStats = useMemo(() => {
    const weekStartISO = getPeriodStartISO('week');
    const todayISO = toISODate(new Date());
    const thisWeekEntries = productionHistory.filter(
      (p) => p.dateISO >= weekStartISO && p.dateISO <= todayISO
    );

    const totals = new Map<string, { operativeId: string; name: string; qty: number; totalPay: number }>();
    thisWeekEntries.forEach((p) => {
      const existing = totals.get(p.operativeId);
      if (existing) {
        existing.qty += p.batchQty;
        existing.totalPay += p.totalPay;
      } else {
        totals.set(p.operativeId, {
          operativeId: p.operativeId,
          name: p.operativeName,
          qty: p.batchQty,
          totalPay: p.totalPay
        });
      }
    });

    const bars = Array.from(totals.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 8);

    const thisWeekTotal = thisWeekEntries.reduce((sum, p) => sum + p.batchQty, 0);
    const avgPerOperative = bars.length > 0 ? Math.round(thisWeekTotal / bars.length) : 0;

    // Semana anterior completa, para comparar el cambio porcentual.
    const lastWeekStartISO = addDaysISO(weekStartISO, -7);
    const lastWeekEndISO = addDaysISO(weekStartISO, -1);
    const lastWeekTotal = productionHistory
      .filter((p) => p.dateISO >= lastWeekStartISO && p.dateISO <= lastWeekEndISO)
      .reduce((sum, p) => sum + p.batchQty, 0);

    const percentChange = lastWeekTotal > 0 ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 : null;
    const yMax = niceAxisMax(bars.length > 0 ? bars[0].qty : 0);

    return { bars, thisWeekTotal, avgPerOperative, percentChange, yMax };
  }, [productionHistory]);

  const monthlyNet = totalMonthlyIncome - totalMonthlyExpenses;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = searchQuery === '' ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;

    const matchesUrgent =
      !onlyUrgentDelivery ||
      urgentOrders.some((u) => u.order.id === o.id);

    return matchesSearch && matchesStatus && matchesUrgent;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Page Header */}
      <header className="mb-4">
        <h2 className="text-3xl font-bold text-[#674bb5] tracking-tight">Resumen</h2>
        <p className="text-sm text-[#494552] mt-1">Métricas del taller de hoy y actividades recientes.</p>
      </header>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Monthly Balance Card */}
        <div className="bg-white border border-[#cac4d4] rounded-xl p-5 flex flex-col shadow-[0px_4px_12px_rgba(103,75,181,0.04)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#151c27]">Balance Mensual</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
                INGRESOS VS EGRESOS
              </p>
            </div>
            <span className="material-symbols-outlined text-[#674bb5] bg-[#f0f3ff] p-2 rounded-lg text-[20px]">
              account_balance_wallet
            </span>
          </div>

          <div className="flex items-end gap-2.5 mt-auto">
            <span className="text-3xl font-bold text-[#674bb5] tracking-tight">
              ${monthlyNet.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded flex items-center mb-1">
              <span className="material-symbols-outlined text-[14px] mr-0.5">arrow_downward</span>
              2.4%
            </span>
          </div>
          <p className="text-[11px] text-[#7a7583] mt-2">
            Ingresos: ${totalMonthlyIncome.toLocaleString()} · Egresos: ${totalMonthlyExpenses.toLocaleString()}
          </p>
        </div>

        {/* Today's Production Card */}
        <div className="bg-white border border-[#cac4d4] rounded-xl p-5 flex flex-col shadow-[0px_4px_12px_rgba(103,75,181,0.04)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#151c27]">Producción de Hoy</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
                UNIDADES COMPLETADAS
              </p>
            </div>
            <span className="material-symbols-outlined text-[#674bb5] bg-[#f0f3ff] p-2 rounded-lg text-[20px]">
              precision_manufacturing
            </span>
          </div>

          {todayGarmentTotals.length === 0 ? (
            <div className="mt-auto bg-[#f0f3ff] p-3 rounded-lg border border-[#cac4d4]/40">
              <p className="text-xs font-medium text-[#494552]">Aún no hay registros de producción hoy.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                {todayGarmentTotals.slice(0, 2).map((g) => (
                  <div key={g.garmentType} className="bg-[#f0f3ff] p-3 rounded-lg border border-[#cac4d4]/40">
                    <p className="text-xs font-medium text-[#494552] truncate">{g.garmentType}</p>
                    <p className="text-2xl font-bold text-[#674bb5]">{g.qty.toLocaleString('es-CO')}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#7a7583] mt-2">
                Total del día: {todayTotalPieces.toLocaleString('es-CO')} piezas
              </p>
            </>
          )}
        </div>

        {/* Stock Alerts Card */}
        <div className="bg-[#ffdad6]/80 border border-[#ba1a1a]/20 rounded-xl p-5 flex flex-col justify-between shadow-[0px_4px_12px_rgba(186,26,26,0.05)]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-sm font-semibold text-[#93000a]">Alertas de Stock</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#93000a]/80 mt-0.5">
                NIVELES CRÍTICOS
              </p>
            </div>
            <span className="material-symbols-outlined text-[#ba1a1a] bg-white/70 p-2 rounded-lg text-[20px]">
              warning
            </span>
          </div>

          <div className="space-y-2 mt-auto">
            {criticalItems.slice(0, 2).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('inventory')}
                className="flex justify-between items-center bg-white/80 hover:bg-white px-3 py-2 rounded-lg cursor-pointer transition-colors border border-[#ba1a1a]/10"
              >
                <span className="text-xs font-semibold text-[#ba1a1a] truncate max-w-[180px]">
                  {item.name}
                </span>
                <span className="text-xs font-mono font-bold text-[#ba1a1a] shrink-0">
                  {item.currentStock} {item.unit}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('inventory')}
            className="text-[11px] font-bold text-[#93000a] hover:underline text-left mt-2 flex items-center gap-1"
          >
            Ver todos los repuestos críticos →
          </button>
        </div>

        {/* Delivery Deadline Alerts Card */}
        <div className="bg-[#ffedd5]/70 border border-[#fb923c]/30 rounded-xl p-5 flex flex-col justify-between shadow-[0px_4px_12px_rgba(154,52,18,0.05)]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-sm font-semibold text-[#9a3412]">Tiempos de Entrega</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#9a3412]/80 mt-0.5">
                PEDIDOS QUE REQUIEREN ATENCIÓN
              </p>
            </div>
            <span className="material-symbols-outlined text-[#9a3412] bg-white/70 p-2 rounded-lg text-[20px]">
              schedule
            </span>
          </div>

          <div className="space-y-2 mt-auto">
            {urgentOrders.length === 0 ? (
              <p className="text-xs text-[#9a3412]/80 py-1">Ningún pedido está en riesgo de retraso.</p>
            ) : (
              urgentOrders.slice(0, 2).map(({ order, delivery }) => (
                <div
                  key={order.id}
                  onClick={() => onSelectOrder && onSelectOrder(order)}
                  className="flex justify-between items-center bg-white/80 hover:bg-white px-3 py-2 rounded-lg cursor-pointer transition-colors border border-[#fb923c]/20"
                >
                  <span className="text-xs font-semibold text-[#9a3412] truncate max-w-[140px]">
                    {order.id} · {order.client}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${delivery.badgeClass}`}>
                    {delivery.label}
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setOnlyUrgentDelivery(true)}
            className="text-[11px] font-bold text-[#9a3412] hover:underline text-left mt-2 flex items-center gap-1"
          >
            Ver todos los pedidos urgentes ({urgentOrders.length}) →
          </button>
        </div>
      </div>

      {/* Company Split & Operative Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <CompanySplitCard facturas={facturas} onNavigate={() => onNavigate('facturas')} />
        <OperativeLeaderboard
          operatives={operatives}
          weeklyBars={weeklyOperativeStats.bars}
          onSelectOperative={(op) => onSelectOperative && onSelectOperative(op)}
        />
      </div>

      {/* Secondary Grid (Chart & Recent Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
        {/* Weekly Output by Worker Chart */}
        <div className="lg:col-span-4 bg-white border border-[#cac4d4] rounded-xl p-5 flex flex-col h-88 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#151c27]">Producción Semanal por Operario</h3>
              <p className="text-xs text-[#7a7583]">Total de unidades por operario</p>
            </div>
            <button
              onClick={() => onNavigate('production')}
              className="text-xs font-semibold text-[#674bb5] hover:text-[#a43073] hover:underline transition-colors"
            >
              Ver Detalles
            </button>
          </div>

          {weeklyOperativeStats.bars.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <p className="text-xs text-[#7a7583]">
                Aún no hay registros de producción esta semana. Guarda un registro en Producción para ver el gráfico.
              </p>
            </div>
          ) : (
            <>
              {/* Bar Chart Visualization */}
              <div className="flex-1 flex items-end gap-3 px-2 pt-6 border-b border-[#cac4d4] relative">
                {/* Y Axis scale reference */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-mono text-[#7a7583] py-2 pointer-events-none">
                  <span>{weeklyOperativeStats.yMax.toLocaleString('es-CO')}</span>
                  <span>{Math.round(weeklyOperativeStats.yMax / 2).toLocaleString('es-CO')}</span>
                  <span>0</span>
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end justify-around h-full ml-8">
                  {weeklyOperativeStats.bars.map((w, idx) => {
                    const heightPct = weeklyOperativeStats.yMax > 0 ? (w.qty / weeklyOperativeStats.yMax) * 100 : 0;
                    const opacitySuffix = BAR_OPACITY_STEPS[Math.min(idx, BAR_OPACITY_STEPS.length - 1)];
                    return (
                      <div
                        key={w.operativeId}
                        className="flex-1 max-w-[42px] flex flex-col items-center justify-end group h-full relative cursor-pointer"
                        onMouseEnter={() => setHoveredOperativeId(w.operativeId)}
                        onMouseLeave={() => setHoveredOperativeId(null)}
                        onClick={() => onNavigate('production')}
                      >
                        {/* Tooltip */}
                        <div
                          className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a313d] text-white px-2 py-1 rounded text-[11px] font-medium transition-all pointer-events-none z-20 whitespace-nowrap shadow-md ${
                            hoveredOperativeId === w.operativeId ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                        >
                          {w.name}: {w.qty.toLocaleString('es-CO')} pzas
                        </div>

                        {/* Bar Element */}
                        <div
                          style={{ height: `${Math.max(heightPct, 2)}%` }}
                          className={`w-full rounded-t-md transition-all duration-200 bg-[#674bb5]${opacitySuffix} group-hover:bg-[#674bb5] group-hover:shadow-md`}
                        />

                        {/* X Axis Label */}
                        <span className="text-[11px] font-medium mt-2 text-[#494552] truncate w-full text-center group-hover:text-[#674bb5] group-hover:font-bold">
                          {w.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-[11px] text-[#7a7583]">
                <span>Promedio semanal: {weeklyOperativeStats.avgPerOperative.toLocaleString('es-CO')} pzas</span>
                {weeklyOperativeStats.percentChange === null ? (
                  <span className="text-[#7a7583]">Sin datos de la semana anterior</span>
                ) : (
                  <span
                    className={`font-semibold flex items-center gap-0.5 ${
                      weeklyOperativeStats.percentChange >= 0 ? 'text-[#006c4b]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {weeklyOperativeStats.percentChange >= 0 ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                    {Math.abs(weeklyOperativeStats.percentChange).toFixed(1)}% esta semana
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Recent Activities Table */}
        <div className="lg:col-span-8 bg-white border border-[#cac4d4] rounded-xl flex flex-col h-88 overflow-hidden shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
          <div className="p-4 border-b border-[#cac4d4] flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 className="text-sm font-semibold text-[#151c27]">Actividades Recientes</h3>
              <p className="text-xs text-[#7a7583]">Pedidos y despachos en curso</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5">
              {['all', 'In Progress', 'Delivered', 'Delayed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                    filterStatus === status
                      ? 'bg-[#674bb5] text-white font-semibold'
                      : 'text-[#494552] hover:bg-[#f0f3ff]'
                  }`}
                >
                  {status === 'all' ? 'Todos' : ORDER_STATUS_LABELS[status as ActivityOrder['status']]}
                </button>
              ))}
              <button
                onClick={() => setOnlyUrgentDelivery((prev) => !prev)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  onlyUrgentDelivery
                    ? 'bg-[#9a3412] text-white font-semibold'
                    : 'text-[#9a3412] bg-[#ffedd5] hover:bg-[#fed7aa]'
                }`}
              >
                Urgentes
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead className="bg-[#f0f3ff] sticky top-0 z-10">
                <tr className="border-b border-[#cac4d4]">
                  <th className="py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                    ID Pedido
                  </th>
                  <th className="py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                    Cliente
                  </th>
                  <th className="py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                    Prendas
                  </th>
                  <th className="py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-center">
                    Estado
                  </th>
                  <th className="py-2.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-center">
                    Entrega
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#cac4d4]/40">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#7a7583]">
                      No se encontraron pedidos con los filtros aplicados.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const delivery = getOrderDeliveryInfo(order);
                    return (
                      <tr
                        key={order.id}
                        onClick={() => onSelectOrder && onSelectOrder(order)}
                        className="hover:bg-[#f0f3ff] transition-colors cursor-pointer group h-12"
                      >
                        <td className="py-2.5 px-4 font-mono font-bold text-[#674bb5] group-hover:underline">
                          {order.id}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-[#151c27]">{order.client}</td>
                        <td className="py-2.5 px-4 text-[#494552]">{order.items}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              order.status === 'In Progress'
                                ? 'bg-[#dce2f3] text-[#494552]'
                                : order.status === 'Delivered'
                                ? 'bg-[#e8ddff] text-[#4f319c]'
                                : order.status === 'Delayed'
                                ? 'bg-[#ffdad6] text-[#93000a]'
                                : 'bg-[#e7eefe] text-[#3c1989]'
                            }`}
                          >
                            {ORDER_STATUS_LABELS[order.status]}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${delivery.badgeClass}`}>
                            {delivery.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
