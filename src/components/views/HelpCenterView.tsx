import React, { useState } from 'react';
import { NavView } from '../../types';

interface HelpCenterViewProps {
  onNavigate: (view: NavView) => void;
  onOpenSupportModal: () => void;
  onOpenNewRecord: () => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({
  onNavigate,
  onOpenSupportModal,
  onOpenNewRecord
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo corregir las piezas registradas de un operario?",
      qEn: "How to correct a worker's logged pieces?",
      a: "Ve a la pestaña Producción, busca la fecha o máquina específica, haz clic en el registro para ajustar la cantidad y guarda los cambios. Si pertenece a semanas anteriores, se requerirá autorización de Administrador.",
    },
    {
      q: "¿Qué sucede cuando el stock llega a cero o nivel crítico?",
      qEn: "What happens when stock reaches zero?",
      a: "El sistema resalta el ítem en color rojo con una alerta pulsante y activa una notificación en el panel superior para evitar paradas en las líneas de confección.",
    },
    {
      q: "¿Se pueden exportar los datos contables y nómina?",
      qEn: "Can I export accounting data?",
      a: "Sí, tanto en la pestaña Producción como en Contabilidad puedes hacer clic en 'Exportar CSV' para descargar un resumen completo en formato compatible con Excel.",
    },
    {
      q: "¿Cómo configurar tarifas por prenda (Camisetas, Pantalonetas)?",
      qEn: "How to customize piece rates per garment?",
      a: "En el formulario de registro de producción puedes cambiar la tarifa por pieza ($/pza) antes de guardar, o definir valores por defecto en los Ajustes del taller.",
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Registrar Entrada de Cliente",
      icon: "person_add",
      iconColor: "text-[#a43073]",
      borderColor: "border-[#a43073]",
      numberBg: "bg-[#fdf2f8]",
      numberColor: "text-[#a43073]",
      desc: "Dirígete al Panel o usa el botón 'Agregar Nuevo Registro' para capturar datos del cliente, lote de prendas, tipo de confección y anticipo.",
      actionLabel: "Crear Nuevo Pedido",
      onClick: () => onOpenNewRecord()
    },
    {
      step: 2,
      title: "Anotar Piezas por Operario",
      icon: "assignment_ind",
      iconColor: "text-[#674bb5]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "En la pestaña Producción, selecciona la prenda y la labor realizada por cada operario (ej. Damelis, Argenis). Usa su código OP-ID para registrar el avance diario a destajo.",
      actionLabel: "Ir a Producción",
      onClick: () => onNavigate('production')
    },
    {
      step: 3,
      title: "Actualizar Stock",
      icon: "inventory_2",
      iconColor: "text-[#674bb5]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "Accede a la sección de Inventario para registrar rollos de tela, conos de hilos, agujas industriales y repuestos con sus puntos de reorden.",
      actionLabel: "Ver Inventario",
      onClick: () => onNavigate('inventory')
    },
    {
      step: 4,
      title: "Pagar Servicios y Liquidar",
      icon: "payments",
      iconColor: "text-[#674bb5]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "Utiliza el módulo de Contabilidad para consolidar las nóminas semanales calculadas automáticamente por piezas y asentar facturas de servicios del taller.",
      actionLabel: "Ir a Finanzas",
      onClick: () => onNavigate('accounting')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="border-b border-[#cac4d4] pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <h2 className="text-3xl font-bold text-[#151c27] tracking-tight">Centro de Ayuda</h2>
          <p className="text-sm text-[#494552] mt-1">
            Encuentra respuestas y tutoriales interactivos para gestionar tu taller.
          </p>
        </div>

        {/* Quick Search */}
        <div className="w-full md:w-72 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7583] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar guías o temas..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#cac4d4] rounded-full text-xs text-[#151c27] focus:outline-none focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Core Operations Guide (Left 7-8 cols) */}
        <div className="col-span-1 md:col-span-7 lg:col-span-8 bg-white rounded-2xl border border-[#cac4d4] p-6 shadow-[0px_4px_12px_rgba(103,75,181,0.03)] flex flex-col">
          <h3 className="text-lg font-bold text-[#151c27] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a43073]">menu_book</span>
            Operaciones Principales del Taller
          </h3>

          <div className="flex-1 relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#cac4d4] hidden sm:block pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-4 sm:items-start group">
                  {/* Step Badge */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 ${s.borderColor} ${s.numberBg} flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-105 shadow-xs`}
                  >
                    <span className={`text-base font-bold ${s.numberColor}`}>{s.step}</span>
                  </div>

                  {/* Step Card Content */}
                  <div className="flex-1 bg-[#f9f9ff] group-hover:bg-[#f0f3ff] rounded-xl p-4 border border-[#cac4d4] transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${s.iconColor} text-[20px]`}>
                          {s.icon}
                        </span>
                        <h4 className="text-sm font-bold text-[#151c27]">{s.title}</h4>
                      </div>

                      <button
                        onClick={s.onClick}
                        className="text-[11px] font-bold text-[#674bb5] hover:text-[#a43073] hover:underline cursor-pointer"
                      >
                        {s.actionLabel} →
                      </button>
                    </div>

                    <p className="text-xs text-[#494552] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel: FAQs & Support */}
        <div className="col-span-1 md:col-span-5 lg:col-span-4 space-y-6">
          {/* FAQ Accordion Card */}
          <div className="bg-white rounded-2xl border border-[#cac4d4] p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.03)]">
            <h3 className="text-base font-bold text-[#151c27] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a43073]">forum</span>
              Preguntas Frecuentes
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border-b border-[#cac4d4]/60 pb-3 last:border-0 last:pb-0"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left font-medium text-xs text-[#151c27] flex justify-between items-center gap-2 hover:text-[#a43073] transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">{faq.q}</span>
                      <span
                        className={`material-symbols-outlined text-[#7a7583] text-[18px] transition-transform ${
                          isOpen ? 'rotate-180 text-[#a43073]' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <p className="text-xs text-[#494552] mt-2 pl-2 border-l-2 border-[#a43073] leading-relaxed animate-in fade-in duration-150">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="bg-[#e7eefe]/70 rounded-2xl border border-[#cac4d4] p-5 text-center shadow-xs">
            <span className="material-symbols-outlined text-4xl text-[#a43073] mb-2 block">
              support_agent
            </span>
            <h4 className="text-base font-bold text-[#151c27] mb-1">¿Aún necesitas ayuda?</h4>
            <p className="text-xs text-[#494552] mb-4 leading-relaxed">
              Nuestro equipo técnico está disponible durante el horario de taller para asistirte.
            </p>
            <button
              onClick={onOpenSupportModal}
              className="w-full bg-white border border-[#cac4d4] text-[#151c27] font-semibold text-xs py-2.5 px-4 rounded-full hover:bg-[#f0f3ff] hover:border-[#674bb5] hover:text-[#674bb5] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
