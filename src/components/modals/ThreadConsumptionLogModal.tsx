import React, { useEffect, useState } from 'react';
import { InventoryItem } from '../../types';
import { HiloTaskLink } from '../../utils/threadConsumption';
import { toISODate } from '../../utils/payroll';

interface ThreadConsumptionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  hiloItem: InventoryItem | null;
  links: HiloTaskLink[];
  onSave: (data: {
    garmentType: string;
    taskName: string;
    gramsUsed: number;
    piecesProduced: number;
    dateISO: string;
    note?: string;
  }) => void;
}

export const ThreadConsumptionLogModal: React.FC<ThreadConsumptionLogModalProps> = ({
  isOpen,
  onClose,
  hiloItem,
  links,
  onSave
}) => {
  const [linkKey, setLinkKey] = useState<string>('');
  const [gramsUsed, setGramsUsed] = useState<number>(0);
  const [piecesProduced, setPiecesProduced] = useState<number>(0);
  const [dateISO, setDateISO] = useState<string>('');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setLinkKey(links[0] ? `${links[0].garmentType}|||${links[0].taskName}` : '');
      setGramsUsed(0);
      setPiecesProduced(0);
      setDateISO(toISODate(new Date()));
      setNote('');
    }
  }, [isOpen, links]);

  if (!isOpen || !hiloItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkKey || gramsUsed <= 0 || piecesProduced <= 0) return;
    const [garmentType, taskName] = linkKey.split('|||');
    onSave({ garmentType, taskName, gramsUsed, piecesProduced, dateISO, note: note.trim() || undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#fdf1f6] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#ca2164]">linear_scale</span>
            <div className="min-w-0">
              <h3 className="font-bold text-base text-[#151c27] truncate">Registrar Consumo Real</h3>
              <p className="text-[11px] text-[#7a7583] truncate">{hiloItem.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {links.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-[#494552]">
              Todavía no hay ninguna labor enlazada con este hilo. Ve a Producción → Tarifas por Labor y
              enlaza primero la labor que lo usa.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
            <p className="text-[11px] text-[#7a7583] -mt-1">
              Pesa el cono/rollo antes y después de la tarea (o registra lo que se entregó vs. lo que sobró)
              y anota la diferencia. Esto va armando el histórico para calcular el promedio real con el
              tiempo — no afecta el stock actual.
            </p>

            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Prenda — Labor</label>
              <select
                value={linkKey}
                onChange={(e) => setLinkKey(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
              >
                {links.map((l) => (
                  <option key={`${l.garmentType}|||${l.taskName}`} value={`${l.garmentType}|||${l.taskName}`}>
                    {l.garmentType} — {l.taskName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#494552] block mb-1">Piezas Producidas</label>
                <input
                  type="number"
                  min="1"
                  value={piecesProduced || ''}
                  onChange={(e) => setPiecesProduced(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#494552] block mb-1">Hilo Usado ({hiloItem.unit})</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={gramsUsed || ''}
                  onChange={(e) => setGramsUsed(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Fecha</label>
              <input
                type="date"
                value={dateISO}
                onChange={(e) => setDateISO(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Nota (opcional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ej. Factura 1042, cono pesado antes/después"
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={gramsUsed <= 0 || piecesProduced <= 0}
              className="w-full bg-[#ca2164] hover:bg-[#a3144d] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Guardar Registro
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
