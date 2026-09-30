import React, { useState } from 'react';
import { Operative } from '../types';
import { LOGO_URL } from '../data/initialData';

// PIN sencillo para que solo el jefe pueda entrar al panel completo de
// administración desde esta pantalla compartida del taller. Como la web no
// tiene servidor, esto es solo una barrera básica (no es seguridad
// bancaria). Si quieres cambiarlo, pide que lo actualicemos aquí.
const ADMIN_PIN = '1234';

interface OperativeSelectScreenProps {
  operatives: Operative[];
  onSelectOperative: (operative: Operative) => void;
  onAdminAccess: () => void;
}

export const OperativeSelectScreen: React.FC<OperativeSelectScreenProps> = ({
  operatives,
  onSelectOperative,
  onAdminAccess
}) => {
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);

  const activeOperatives = operatives.filter((op) => op.active);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinValue === ADMIN_PIN) {
      setPinValue('');
      setPinError(false);
      setShowPinPrompt(false);
      onAdminAccess();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fefafb] flex flex-col items-center px-4 py-10">
      <img src={LOGO_URL} alt="Logotipo TextilePro" className="h-14 w-14 object-contain rounded mb-3" />
      <h1 className="text-2xl sm:text-3xl font-bold text-[#ca2164] text-center">
        ¿Quién va a registrar producción?
      </h1>
      <p className="text-sm text-[#494552] mt-1.5 text-center max-w-md">
        Toca tu nombre para anotar la factura, la prenda y la cantidad que hiciste.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
        {activeOperatives.map((op) => (
          <button
            key={op.id}
            onClick={() => onSelectOperative(op)}
            className="bg-white border border-[#cac4d4] rounded-2xl p-5 flex flex-col items-center gap-2.5 shadow-[0px_4px_12px_rgba(103,75,181,0.06)] hover:border-[#a43073] hover:shadow-[0px_6px_16px_rgba(164,48,115,0.12)] active:scale-[0.97] transition-all cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#fcdeea]">
              <img src={op.avatar} alt={op.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-base font-bold text-[#151c27] text-center">{op.name}</span>
          </button>
        ))}
      </div>

      {activeOperatives.length === 0 && (
        <p className="text-sm text-[#7a7583] mt-10">No hay operarios activos configurados todavía.</p>
      )}

      <div className="mt-12 pt-6 border-t border-[#cac4d4] w-full max-w-xs flex flex-col items-center">
        {!showPinPrompt ? (
          <button
            onClick={() => setShowPinPrompt(true)}
            className="text-xs font-semibold text-[#7a7583] hover:text-[#ca2164] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Acceso administrador
          </button>
        ) : (
          <form onSubmit={handlePinSubmit} className="flex flex-col items-center gap-2 w-full">
            <label className="text-xs font-semibold text-[#494552]">PIN de administrador</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              value={pinValue}
              onChange={(e) => {
                setPinValue(e.target.value);
                setPinError(false);
              }}
              className={`w-32 text-center tracking-[0.3em] p-2.5 rounded-lg border text-sm font-mono outline-none ${
                pinError ? 'border-[#93000A] bg-[#ffedd5]/30' : 'border-[#cac4d4] focus:border-[#ca2164]'
              }`}
            />
            {pinError && <span className="text-[11px] text-[#93000A] font-semibold">PIN incorrecto</span>}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  setShowPinPrompt(false);
                  setPinValue('');
                  setPinError(false);
                }}
                className="text-xs font-semibold text-[#7a7583] px-3 py-1.5 rounded-lg hover:bg-[#fdf1f6] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="text-xs font-bold text-white bg-[#ca2164] px-4 py-1.5 rounded-lg hover:bg-[#a3144d] cursor-pointer"
              >
                Entrar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
