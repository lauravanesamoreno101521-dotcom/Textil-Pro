import React, { useMemo, useState } from 'react';
import { ExpenseRecord, Factura, IncomeRecord, Operative } from '../../types';
import { formatCOP } from '../../utils/format';
import { formatDateEs } from '../../utils/deliveryDeadline';
import { toISODate } from '../../utils/payroll';

interface AccountingViewProps {
  expenses: ExpenseRecord[];
  incomes: IncomeRecord[];
  operatives: Operative[];
  facturas: Factura[];
  onOpenExpenseModal: () => void;
  onOpenIncomeModal: () => void;
  searchQuery: string;
}

// Paleta categórica fija (Okabe-Ito, segura para daltonismo) — un color por
// categoría de gasto, siempre en el mismo orden, nunca reasignado por rango.
const CATEGORY_COLORS: Record<ExpenseRecord['category'], string> = {
  Servicios: '#0072B2',
  Internet: '#56B4E9',
  Mantenimiento: '#E69F00',
  Insumos: '#009E73',
  Nómina: '#ca2164',
  Otros: '#CC79A7'
};
const CATEGORY_ORDER: ExpenseRecord['category'][] = [
  'Servicios',
  'Internet',
  'Mantenimiento',
  'Insumos',
  'Otros',
  'Nómina'
];
const SURPLUS_COLOR = '#F0E442';

export const AccountingView: React.FC<AccountingViewProps> = ({
  expenses,
  incomes,
  operatives,
  facturas,
  onOpenExpenseModal,
  onOpenIncomeModal,
  searchQuery
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Este Mes');
  const [expenseFilterCategory, setExpenseFilterCategory] = useState<string>('Todas');

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const incomeRatio = totalIncome + totalExpense > 0 ? (totalIncome / (totalIncome + totalExpense)) * 100 : 78;
  const expenseRatio = 100 - incomeRatio;

  // Reparto real de la plata facturada (Coolkids + Imperium): gastos
  // operativos por categoría, nómina real de los operarios, y lo que queda
  // disponible (o el déficit, si los egresos superan lo facturado). Usamos
  // el total facturado real como base en vez de los ingresos de ejemplo,
  // porque son de una escala comparable a la nómina real.
  const moneyBreakdown = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach((exp) => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });

    const totalNominaReal = operatives.reduce((sum, op) => sum + op.totalEarnings, 0);
    totals['Nómina'] = (totals['Nómina'] || 0) + totalNominaReal;

    const totalFacturado = facturas.reduce((sum, f) => sum + (f.totalFactura || 0), 0);
    const totalOutflow = CATEGORY_ORDER.reduce((sum, cat) => sum + (totals[cat] || 0), 0);
    const surplus = totalFacturado - totalOutflow;
    const donutBase = surplus >= 0 ? totalFacturado : totalOutflow;

    const slices: { label: string; amount: number; color: string }[] = CATEGORY_ORDER
      .filter((cat) => (totals[cat] || 0) > 0)
      .map((cat) => ({ label: cat, amount: totals[cat], color: CATEGORY_COLORS[cat] }));

    if (surplus > 0) {
      slices.push({ label: 'Disponible (Sobra)', amount: surplus, color: SURPLUS_COLOR });
    }

    let cumulative = 0;
    const gradientStops = slices.map((s) => {
      const pct = donutBase > 0 ? (s.amount / donutBase) * 100 : 0;
      const start = cumulative;
      cumulative += pct;
      return `${s.color} ${start}% ${cumulative}%`;
    });

    const sortedForLegend = [...slices].sort((a, b) => b.amount - a.amount);
    const surplusPct = totalFacturado > 0 ? (surplus / totalFacturado) * 100 : 0;

    return {
      gradient: gradientStops.length > 0 ? `conic-gradient(${gradientStops.join(', ')})` : '',
      legend: sortedForLegend,
      totalFacturado,
      totalOutflow,
      surplus,
      surplusPct
    };
  }, [expenses, operatives, facturas]);

  // Facturas ya entregadas al cliente pero que todavía no se han cobrado
  // (se cobran normalmente 10 días después de la entrega real).
  const pendingCollections = useMemo(() => {
    const todayISO = toISODate(new Date());
    return facturas
      .filter((f) => f.status === 'Delivered' && f.paymentStatus !== 'cobrado')
      .map((f) => ({ ...f, overdue: !!f.paymentExpectedDateISO && f.paymentExpectedDateISO < todayISO }))
      .sort((a, b) => (a.paymentExpectedDateISO || '').localeCompare(b.paymentExpectedDateISO || ''));
  }, [facturas]);
  const totalPorCobrar = pendingCollections.reduce((sum, f) => sum + (f.totalFactura || 0), 0);

  // Filtered lists
  const filteredIncomes = incomes.filter((inc) => {
    return (
      searchQuery === '' ||
      inc.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.concept.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch =
      searchQuery === '' ||
      exp.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      expenseFilterCategory === 'Todas' || exp.category === expenseFilterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#ca2164] tracking-tight">Contabilidad y Finanzas</h2>
          <p className="text-sm text-[#494552] mt-1">
            Resumen de ingresos, egresos y balance general del taller.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenExpenseModal}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#ca2164] text-[#ca2164] rounded-lg font-bold text-sm hover:bg-[#fdf1f6] transition-all cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
            Nuevo Gasto
          </button>
          <button
            onClick={onOpenIncomeModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#ca2164] text-white rounded-lg font-bold text-sm hover:bg-[#a3144d] transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nueva Entrada
          </button>
        </div>
      </div>

      {/* Balance General Bento Card */}
      <div className="bg-[#fdeaf2]/70 border border-[#cac4d4] rounded-2xl p-6 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#cac4d4]/70 pb-4 mb-5">
          <h3 className="text-lg font-bold text-[#ca2164]">Balance General</h3>
          <div className="flex items-center gap-1 bg-white/80 border border-[#cac4d4] px-3 py-1 rounded-lg mt-2 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-xs font-bold uppercase tracking-wider text-[#494552] bg-transparent outline-none cursor-pointer"
            >
              <option>Este Mes</option>
              <option>Último Trimestre</option>
              <option>Año 2026</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ingresos Totales */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[#494552] mb-1">Ingresos Totales</span>
            <span className="text-3xl font-bold text-[#2563eb] tracking-tight">
              ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-bold text-[#006c4b] mt-1.5 flex items-center">
              <span className="material-symbols-outlined text-[15px] mr-1">trending_up</span>
              +12% vs mes anterior
            </span>
          </div>

          {/* Egresos Totales */}
          <div className="flex flex-col border-t md:border-t-0 md:border-l border-[#cac4d4]/70 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-medium text-[#494552] mb-1">Egresos Totales</span>
            <span className="text-3xl font-bold text-[#ba1a1a] tracking-tight">
              ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center">
              <span className="material-symbols-outlined text-[15px] mr-1">trending_down</span>
              -5% vs mes anterior
            </span>
          </div>

          {/* Balance Neto */}
          <div className="flex flex-col border-t md:border-t-0 md:border-l border-[#cac4d4]/70 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-medium text-[#494552] mb-1">Balance Neto</span>
            <span className="text-3xl font-bold text-[#2563eb] tracking-tight">
              ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {/* Visual ratio bar */}
            <div className="w-full bg-[#f8d8e5] h-2.5 rounded-full mt-2.5 overflow-hidden flex">
              <div className="bg-[#2563eb] h-full transition-all duration-500" style={{ width: `${incomeRatio}%` }} />
              <div className="bg-[#ba1a1a] h-full transition-all duration-500" style={{ width: `${expenseRatio}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Reparto de lo Facturado: Gastos, Nómina y Disponible (Donut Chart) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[#151c27]">Gastos, Nómina y Disponible</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            REPARTO DE LO FACTURADO (COOLKIDS + IMPERIUM)
          </p>
        </div>

        {moneyBreakdown.legend.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-8">Aún no hay facturas ni gastos registrados para calcular el reparto.</p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Donut */}
              <div className="relative w-40 h-40 shrink-0">
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: moneyBreakdown.gradient }}
                />
                <div className="absolute inset-[18%] bg-white rounded-full flex flex-col items-center justify-center px-2 text-center">
                  <span className="text-[10px] text-[#7a7583] font-medium">Facturado</span>
                  <span className="text-sm font-bold text-[#151c27] font-mono leading-tight">
                    {formatCOP(moneyBreakdown.totalFacturado)}
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 w-full space-y-2">
                {moneyBreakdown.legend.map((s) => {
                  const pct = moneyBreakdown.totalFacturado > 0 ? (s.amount / moneyBreakdown.totalFacturado) * 100 : 0;
                  return (
                    <div key={s.label} className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-medium text-[#151c27] flex-1 truncate">{s.label}</span>
                      <span className="text-xs font-mono font-bold text-[#494552]">{pct.toFixed(0)}%</span>
                      <span className="text-xs font-mono font-bold text-[#151c27] w-28 text-right">
                        {formatCOP(s.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Déficit callout — solo cuando los egresos superan lo facturado */}
            {moneyBreakdown.surplus < 0 && (
              <div className="mt-4 pt-3 border-t border-[#cac4d4]/60 flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  Déficit: los egresos superan lo facturado
                </span>
                <span className="font-mono font-bold text-[#ba1a1a]">
                  {formatCOP(Math.abs(moneyBreakdown.surplus))} ({Math.abs(moneyBreakdown.surplusPct).toFixed(0)}%)
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Cobros Pendientes de Clientes (facturas entregadas, pago 10 días después) */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[#151c27]">Cobros Pendientes de Clientes</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] mt-0.5">
            FACTURAS ENTREGADAS · PAGO ESPERADO 10 DÍAS DESPUÉS DE LA ENTREGA
          </p>
        </div>

        {pendingCollections.length === 0 ? (
          <p className="text-xs text-[#7a7583] text-center py-6">No hay cobros pendientes por ahora.</p>
        ) : (
          <>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#a43073] font-mono">{formatCOP(totalPorCobrar)}</span>
              <span className="text-xs text-[#7a7583]">
                en {pendingCollections.length} factura{pendingCollections.length === 1 ? '' : 's'} por cobrar
              </span>
            </div>
            <div className="space-y-2">
              {pendingCollections.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border border-[#cac4d4]/60 rounded-lg px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#151c27] truncate">
                      #{f.facturaNumero} · {f.descripcion}
                    </p>
                    <p className="text-[11px] text-[#7a7583]">
                      {f.empresa === 'COOLKIDS' ? 'Coolkids' : 'Imperium'}
                      {f.paymentExpectedDateISO ? ` · Pago esperado: ${formatDateEs(f.paymentExpectedDateISO)}` : ''}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-mono font-bold text-[#a43073]">{formatCOP(f.totalFactura)}</p>
                    {f.overdue && (
                      <span className="text-[10px] font-bold text-[#93000a] bg-[#ffdad6] px-1.5 py-0.5 rounded-full">
                        Atrasado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Two Column Grid: Ingresos Recientes & Registro de Egresos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Ingresos Recientes */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#ECFDF5] border border-[#cac4d4] rounded-2xl p-5 shadow-[0px_4px_12px_rgba(0,108,75,0.03)] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-[#cac4d4]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#cac4d4]/50 flex items-center justify-center text-[#ca2164]">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
                <h3 className="text-base font-bold text-[#ca2164]">Ingresos Recientes</h3>
              </div>
              <button
                onClick={onOpenIncomeModal}
                className="text-[#ca2164] font-bold text-[11px] uppercase tracking-wider hover:underline cursor-pointer"
              >
                + AGREGAR
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-96">
              {filteredIncomes.map((inc) => (
                <div
                  key={inc.id}
                  className="flex justify-between items-center p-3 bg-white/90 hover:bg-white border border-transparent hover:border-[#cac4d4] rounded-xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fdeaf2] border border-[#f797bd]/40 flex items-center justify-center text-[#ca2164] font-bold text-sm">
                      {inc.clientCode || 'C'}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#ca2164] block">{inc.client}</span>
                      <span className="text-xs text-[#494552]">{inc.concept}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono font-bold text-sm text-[#006c4b]">
                      +${inc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-[#7a7583]">
                      {inc.date}, {inc.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Registro de Egresos */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#FDF2F8] border border-[#cac4d4] rounded-2xl p-5 shadow-[0px_4px_12px_rgba(164,48,115,0.03)] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-[#cac4d4]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
                <h3 className="text-base font-bold text-[#ca2164]">Registro de Egresos</h3>
              </div>

              {/* Filter category selector */}
              <select
                value={expenseFilterCategory}
                onChange={(e) => setExpenseFilterCategory(e.target.value)}
                className="text-xs font-bold uppercase tracking-wider text-[#ca2164] bg-white border border-[#cac4d4] rounded-md px-2 py-1 outline-none cursor-pointer"
              >
                <option value="Todas">TODAS</option>
                <option value="Servicios">SERVICIOS</option>
                <option value="Internet">INTERNET</option>
                <option value="Mantenimiento">MANTENIMIENTO</option>
                <option value="Insumos">INSUMOS</option>
              </select>
            </div>

            {/* Expenses Table */}
            <div className="overflow-x-auto flex-1 max-h-96">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#cac4d4] text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                    <th className="py-2 px-2.5">CONCEPTO</th>
                    <th className="py-2 px-2.5">CATEGORÍA</th>
                    <th className="py-2 px-2.5 text-right">MONTO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cac4d4]/40 text-xs">
                  {filteredExpenses.map((exp) => (
                    <tr
                      key={exp.id}
                      className="hover:bg-white/90 transition-colors h-12 bg-white/50"
                    >
                      <td className="py-2 px-2.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#ca2164]">{exp.concept}</span>
                          <span className="text-[11px] text-[#494552]">{exp.reference}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#fdf1f6] border border-[#cac4d4] text-[#494552] text-[10px] font-semibold">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 text-right font-mono font-bold text-[#ba1a1a]">
                        -${exp.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
