import React, { useEffect, useState } from 'react';
import { Operative, ProductionEntry } from '../../types';
import { formatCOP } from '../../utils/format';

interface OperativeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  operative: Operative | null;
  productionHistory: ProductionEntry[];
  onToggleActive: (operativeId: string) => void;
  onUpdatePhone: (operativeId: string, phone: string) => void;
}

export const OperativeDetailModal: React.FC<OperativeDetailModalProps> = ({
  isOpen,
  onClose,
  operative,
  productionHistory,
  onToggleActive,
  onUpdatePhone
}) => {
  const [phoneDraft, setPhoneDraft] = useState<string>(operative?.phone || '');

  useEffect(() => {
    setPhoneDraft(operative?.phone || '');
  }, [operative?.id, operative?.phone]);

  if (!isOpen || !operative) return null;

  const workerHistory = productionHistory.filter(p => p.operativeId === operative.id);
  const phoneChanged = phoneDraft.trim() !== (operative.phone || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#fdf1f6] p-5 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ca2164] shrink-0">
              <img
                src={operative.avatar}
                alt={operative.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#151c27]">{operative.name}</h3>
                <span className="font-mono text-xs bg-[#fcdeea] text-[#a3144d] font-bold px-2 py-0.5 rounded">
                  {operative.id}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    operative.active
                      ? 'bg-[#ecfdf5] text-[#006c4b] border border-[#34d399]/30'
                      : 'bg-[#fdf1f6] text-[#7a7583] border border-[#cac4d4]'
                  }`}
                >
                  {operative.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <p className="text-xs text-[#494552]">{operative.specialty} · {operative.shift}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#fefafb] p-3 rounded-xl border border-[#cac4d4]">
              <span className="text-[11px] text-[#494552] block font-medium">Piezas (Histórico)</span>
              <span className="text-xl font-bold text-[#ca2164] font-mono mt-0.5 block">
                {operative.piecesCompleted.toLocaleString('es-CO')}
              </span>
            </div>
            <div className="bg-[#fefafb] p-3 rounded-xl border border-[#cac4d4]">
              <span className="text-[11px] text-[#494552] block font-medium">Pago Acumulado</span>
              <span className="text-xl font-bold text-[#006c4b] font-mono mt-0.5 block">
                {formatCOP(operative.totalEarnings)}
              </span>
            </div>
            <div className="bg-[#fefafb] p-3 rounded-xl border border-[#cac4d4]">
              <span className="text-[11px] text-[#494552] block font-medium">Máquina Asignada</span>
              <span className="text-sm font-bold text-[#151c27] font-mono mt-1 block">
                {operative.assignedMachine || 'MC-104'}
              </span>
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h4 className="text-xs font-bold text-[#494552] uppercase tracking-wider mb-2">
              Historial de Lotes Recientes
            </h4>
            <div className="border border-[#cac4d4] rounded-xl overflow-hidden max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fdf1f6] text-[11px] text-[#494552] font-bold">
                  <tr>
                    <th className="p-2">Hora</th>
                    <th className="p-2">Prenda</th>
                    <th className="p-2">Labor</th>
                    <th className="p-2 text-right">Cantidad</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cac4d4]/40">
                  {workerHistory.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-[#7a7583]">
                        No hay registros de producción para este operario todavía.
                      </td>
                    </tr>
                  ) : (
                    workerHistory.map((h) => (
                      <tr key={h.id} className="hover:bg-[#fdf1f6]">
                        <td className="p-2 font-mono text-[#7a7583]">{h.time}</td>
                        <td className="p-2 font-medium">{h.garmentType}</td>
                        <td className="p-2 text-[#494552]">{h.taskName}</td>
                        <td className="p-2 text-right font-mono font-bold">{h.batchQty}</td>
                        <td className="p-2 text-right font-mono font-bold text-[#006c4b]">
                          {formatCOP(h.totalPay)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* WhatsApp para envío de recibos */}
          <div>
            <h4 className="text-xs font-bold text-[#494552] uppercase tracking-wider mb-2">
              WhatsApp (para enviar recibos de pago)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={phoneDraft}
                onChange={(e) => setPhoneDraft(e.target.value)}
                placeholder="Ej. 573001234567"
                className="flex-1 p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
              {phoneChanged && (
                <button
                  onClick={() => onUpdatePhone(operative.id, phoneDraft.trim())}
                  className="px-3 py-2.5 rounded-lg bg-[#ca2164] hover:bg-[#a3144d] text-white text-xs font-bold cursor-pointer"
                >
                  Guardar
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#7a7583] mt-1">
              Opcional: con indicativo de país, sin espacios ni signos (ej. 57 para Colombia). Si lo dejas vacío, igual podrás elegir el contacto manualmente al enviar por WhatsApp.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#fefafb] p-4 border-t border-[#cac4d4] flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleActive(operative.id)}
            title="Marcar como inactivo si la persona salió del taller o está de vacaciones. Su historial de pagos no se borra."
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
              operative.active
                ? 'bg-[#93000a] text-white hover:bg-[#7a0008]'
                : 'bg-[#006c4b] text-white hover:bg-[#005a3d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {operative.active ? 'person_off' : 'person_check'}
            </span>
            {operative.active ? 'Marcar como Inactivo' : 'Reactivar Operario'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ca2164] text-white rounded-lg font-bold text-xs hover:bg-[#a3144d] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
