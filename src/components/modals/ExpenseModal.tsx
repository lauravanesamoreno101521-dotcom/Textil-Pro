import React, { useState } from 'react';
import { ExpenseRecord } from '../../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: Omit<ExpenseRecord, 'id'>) => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onAddExpense
}) => {
  const [concept, setConcept] = useState('');
  const [reference, setReference] = useState('Ref: FACT-');
  const [category, setCategory] = useState<'Servicios' | 'Internet' | 'Mantenimiento' | 'Insumos' | 'Nómina' | 'Otros'>('Servicios');
  const [amount, setAmount] = useState<number>(150.00);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim() || amount <= 0) return;

    const now = new Date();
    const dateStr = 'Hoy';
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    onAddExpense({
      concept,
      reference,
      category,
      amount: Number(amount),
      date: dateStr,
      time: timeStr
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#ffdad6] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a]">receipt_long</span>
            <h3 className="font-bold text-base text-[#93000a]">Registrar Nuevo Gasto</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#ffdad6]/50 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Concepto / Detalle</label>
            <input
              type="text"
              required
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej. Factura de Energía Eléctrica, Reparación de Motor..."
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#ba1a1a] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#ba1a1a] outline-none cursor-pointer"
              >
                <option value="Servicios">Servicios</option>
                <option value="Internet">Internet</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Insumos">Insumos</option>
                <option value="Nómina">Nómina</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Referencia / Comprobante</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ref: ELEC-092, Fac..."
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#ba1a1a] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Monto (COP)</label>
            <input
              type="number"
              step="50"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-sm text-[#ba1a1a] font-bold focus:border-[#ba1a1a] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
          >
            Guardar Egreso
          </button>
        </form>
      </div>
    </div>
  );
};
