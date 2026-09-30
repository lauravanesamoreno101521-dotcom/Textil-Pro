import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Correo personal de Laura, quien administra el taller y le da mantenimiento
// a este programa. TextilePro no tiene backend propio ni un equipo de
// soporte externo: "Contactar Soporte" simplemente abre el correo del
// navegador ya redactado hacia esta dirección — llega directo a ella.
const SUPPORT_EMAIL = 'lauravanesamoreno101521@gmail.com';

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mailSubject = encodeURIComponent(`TextilePro — Soporte: ${subject}`);
    const mailBody = encodeURIComponent(
      `${message}\n\n---\nEnviado desde el Centro de Ayuda de TextilePro.`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSubject('');
      setMessage('');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#fdf1f6] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a43073]">support_agent</span>
            <h3 className="font-bold text-base text-[#151c27]">Contactar Soporte TextilePro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-5xl text-[#006c4b]">check_circle</span>
            <h4 className="font-bold text-base text-[#151c27]">¡Listo para enviar!</h4>
            <p className="text-xs text-[#494552]">
              Se abrió tu programa de correo con el mensaje redactado hacia{' '}
              <span className="font-semibold text-[#151c27]">{SUPPORT_EMAIL}</span>. Solo confirma el
              envío ahí. Si no se abrió nada, escribe directo a ese correo.
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
              Enviar Correo a Soporte
            </button>
            <p className="text-[10px] text-[#7a7583] text-center -mt-1.5">
              Se abrirá tu correo con el mensaje listo para {SUPPORT_EMAIL}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
