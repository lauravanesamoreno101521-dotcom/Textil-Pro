import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#f0f3ff] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a43073]">support_agent</span>
            <h3 className="font-bold text-base text-[#151c27]">Contactar Soporte TextilePro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#e2e8f8] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-5xl text-[#006c4b]">check_circle</span>
            <h4 className="font-bold text-base text-[#151c27]">¡Mensaje Enviado!</h4>
            <p className="text-xs text-[#494552]">
              Un especialista de soporte técnico se comunicará contigo a la brevedad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Asunto</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Configuración de máquinas, Exportación contable..."
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Descripción del Problema o Consulta</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe los detalles de tu consulta o requerimiento del taller..."
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#a43073] hover:bg-[#85145a] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
            >
              Enviar Mensaje al Equipo de Soporte
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
