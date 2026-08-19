import React, { useState } from 'react';
import { ExpenseRecord, IncomeRecord } from '../../types';

interface AccountingViewProps {
  expenses: ExpenseRecord[];
  incomes: IncomeRecord[];
  onOpenExpenseModal: () => void;
  onOpenIncomeModal: () => void;
  searchQuery: string;
}

export const AccountingView: React.FC<AccountingViewProps> = ({
  expenses,
  incomes,
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
          <h2 className="text-3xl font-bold text-[#674bb5] tracking-tight">Contabilidad y Finanzas</h2>
          <p className="text-sm text-[#494552] mt-1">
            Resumen de ingresos, egresos y balance general del taller.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenExpenseModal}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#674bb5] text-[#674bb5] rounded-lg font-bold text-sm hover:bg-[#f0f3ff] transition-all cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
            Nuevo Gasto
          </button>
          <button
            onClick={onOpenIncomeModal}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#674bb5] text-white rounded-lg font-bold text-sm hover:bg-[#4f319c] transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nueva Entrada
          </button>
        </div>
      </div>

      {/* Balance General Bento Card */}
      <div className="bg-[#EDE9FE]/70 border border-[#cac4d4] rounded-2xl p-6 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#cac4d4]/70 pb-4 mb-5">
          <h3 className="text-lg font-bold text-[#674bb5]">Balance General</h3>
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
            <div className="w-full bg-[#dce2f3] h-2.5 rounded-full mt-2.5 overflow-hidden flex">
              <div className="bg-[#2563eb] h-full transition-all duration-500" style={{ width: `${incomeRatio}%` }} />
              <div className="bg-[#ba1a1a] h-full transition-all duration-500" style={{ width: `${expenseRatio}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Ingresos Recientes & Registro de Egresos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Ingresos Recientes */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#ECFDF5] border border-[#cac4d4] rounded-2xl p-5 shadow-[0px_4px_12px_rgba(0,108,75,0.03)] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-[#cac4d4]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#cac4d4]/50 flex items-center justify-center text-[#674bb5]">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
                <h3 className="text-base font-bold text-[#674bb5]">Ingresos Recientes</h3>
              </div>
              <button
                onClick={onOpenIncomeModal}
                className="text-[#674bb5] font-bold text-[11px] uppercase tracking-wider hover:underline cursor-pointer"
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
                    <div className="w-10 h-10 rounded-full bg-[#EDE9FE] border border-[#a78bfa]/40 flex items-center justify-center text-[#674bb5] font-bold text-sm">
                      {inc.clientCode || 'C'}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#674bb5] block">{inc.client}</span>
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
                <h3 className="text-base font-bold text-[#674bb5]">Registro de Egresos</h3>
              </div>

              {/* Filter category selector */}
              <select
                value={expenseFilterCategory}
                onChange={(e) => setExpenseFilterCategory(e.target.value)}
                className="text-xs font-bold uppercase tracking-wider text-[#674bb5] bg-white border border-[#cac4d4] rounded-md px-2 py-1 outline-none cursor-pointer"
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
                          <span className="font-bold text-[#674bb5]">{exp.concept}</span>
                          <span className="text-[11px] text-[#494552]">{exp.reference}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f0f3ff] border border-[#cac4d4] text-[#494552] text-[10px] font-semibold">
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
