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
      q: "¿Cómo registra su producción cada operario?",
      qEn: "How does each worker log their own production?",
      a: "En el equipo compartido del taller, cada operario elige su nombre de una lista (sin contraseña) y anota el número de factura, la prenda, la labor y la cantidad que hizo. Con eso se calcula sola la nómina por día, semana, quincena y mes — el jefe ya no tiene que pasar puesto por puesto preguntando.",
    },
    {
      q: "¿Qué pasa si un operario sale del taller o se va de vacaciones?",
      qEn: "What happens if a worker leaves or goes on vacation?",
      a: "Márcalo como Inactivo desde su ficha en Producción: la tarjeta queda en gris y desaparece de la pantalla de selección del equipo compartido, pero su historial de pagos no se borra. Se reactiva en cualquier momento.",
    },
    {
      q: "¿Cómo se paga la nómina y se envían los recibos?",
      qEn: "How is payroll paid and receipts sent?",
      a: "Cada 14 y 29 del mes aparece un aviso en pantalla de que se acerca el pago. Al pagar (por día, semana, quincena o mes) puedes imprimir el recibo o enviarlo por WhatsApp — llega como una foto del recibo, no como texto suelto.",
    },
    {
      q: "¿Cómo funciona la alerta de consumo de hilo?",
      qEn: "How does the thread consumption alert work?",
      a: "Es solo una alerta, nunca descuenta el inventario: al enlazar una labor con su hilo y los gramos por pieza (en Tarifas por Labor), el sistema estima cuánto hilo va a llevar cada tarea y avisa si el stock alcanza — porque el hilo sobrante siempre vuelve a bodega.",
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
      desc: "Dirígete al Panel o usa el botón 'Agregar Nuevo Registro' para capturar la factura del cliente (Coolkids o Imperium): cantidad, valor y fecha de ingreso. El sistema calcula sola la fecha límite de entrega (9 días) y genera la Prefactura automáticamente.",
      actionLabel: "Crear Nuevo Pedido",
      onClick: () => onOpenNewRecord()
    },
    {
      step: 2,
      title: "Cada Operario Registra su Propia Producción",
      icon: "assignment_ind",
      iconColor: "text-[#ca2164]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "En el equipo compartido del taller, cada operario elige su nombre de una lista y anota la factura, la prenda, la labor y la cantidad que hizo. Con eso se calcula sola su nómina — ya no hace falta pasar puesto por puesto preguntando.",
      actionLabel: "Ir a Producción",
      onClick: () => onNavigate('production')
    },
    {
      step: 3,
      title: "Controlar Hilos, Agujas y Repuestos",
      icon: "inventory_2",
      iconColor: "text-[#ca2164]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "Aquí solo se manejan hilos, agujas y repuestos, con sus puntos de reorden. Enlaza cada labor con el hilo que usa (gramos por pieza) en Tarifas por Labor para recibir una alerta de stock al registrar producción.",
      actionLabel: "Ver Inventario",
      onClick: () => onNavigate('inventory')
    },
    {
      step: 4,
      title: "Pagar Nómina y Conciliar Facturas",
      icon: "payments",
      iconColor: "text-[#ca2164]",
      borderColor: "border-[#cac4d4]",
      numberBg: "bg-white",
      numberColor: "text-[#494552]",
      desc: "Paga por día, semana, quincena o mes (aviso automático cada 14 y 29) y envía el recibo impreso o por WhatsApp como foto. En Facturas se concilia lo que el cliente factura contra lo que registraron los operarios.",
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
                  <div className="flex-1 bg-[#fefafb] group-hover:bg-[#fdf1f6] rounded-xl p-4 border border-[#cac4d4] transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${s.iconColor} text-[20px]`}>
                          {s.icon}
                        </span>
                        <h4 className="text-sm font-bold text-[#151c27]">{s.title}</h4>
                      </div>

                      <button
                        onClick={s.onClick}
                        className="text-[11px] font-bold text-[#ca2164] hover:text-[#a43073] hover:underline cursor-pointer"
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
          <div className="bg-[#fde9f1]/70 rounded-2xl border border-[#cac4d4] p-5 text-center shadow-xs">
            <span className="material-symbols-outlined text-4xl text-[#a43073] mb-2 block">
              support_agent
            </span>
            <h4 className="text-base font-bold text-[#151c27] mb-1">¿Aún necesitas ayuda?</h4>
            <p className="text-xs text-[#494552] mb-4 leading-relaxed">
              Escríbele directo a quien administra el taller y le da mantenimiento a este programa.
            </p>
            <button
              onClick={onOpenSupportModal}
              className="w-full bg-white border border-[#cac4d4] text-[#151c27] font-semibold text-xs py-2.5 px-4 rounded-full hover:bg-[#fdf1f6] hover:border-[#ca2164] hover:text-[#ca2164] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
