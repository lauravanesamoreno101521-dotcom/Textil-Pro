import React, { useState } from 'react';
import { IncomeRecord } from '../../types';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncome: (income: Omit<IncomeRecord, 'id'>) => void;
}

export const IncomeModal: React.FC<IncomeModalProps> = ({
  isOpen,
  onClose,
  onAddIncome
}) => {
  const [client, setClient] = useState('');
  const [concept, setConcept] = useState('Pago liquidación prendas lote');
  const [amount, setAmount] = useState<number>(4500.00);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.trim() || amount <= 0) return;

    const now = new Date();
    const dateStr = 'Hoy';
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    // Derive code
    const initials = client.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CX';

    onAddIncome({
      client,
      clientCode: initials,
      concept,
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
        <div className="bg-[#ecfdf5] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c4b]">account_balance_wallet</span>
            <h3 className="font-bold text-base text-[#003d28]">Registrar Nueva Entrada (Ingreso)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#ecfdf5]/80 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Cliente / Empresa</label>
            <input
              type="text"
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Ej. Boutique Alpha, Uniformes Deportivos del Valle..."
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#006c4b] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Concepto / Motivo de Pago</label>
            <input
              type="text"
              required
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej. Anticipo pedido #450, Liquidación de producción..."
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#006c4b] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Monto Cobrado (COP)</label>
            <input
              type="number"
              step="10"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-sm text-[#006c4b] font-bold focus:border-[#006c4b] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-[#006c4b] hover:bg-[#003d28] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
          >
            Guardar Ingreso
          </button>
        </form>
      </div>
    </div>
  );
};
