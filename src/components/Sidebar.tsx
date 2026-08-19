import React from 'react';
import { NavView } from '../types';
import { LOGO_URL, MANAGER_AVATAR } from '../data/initialData';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenNewRecord: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenNewRecord
}) => {
  const navItems: { id: NavView; label: string; icon: string; iconFilled?: boolean }[] = [
    { id: 'dashboard', label: 'Panel', icon: 'dashboard' },
    { id: 'inventory', label: 'Inventario', icon: 'inventory_2' },
    { id: 'production', label: 'Producción', icon: 'precision_manufacturing' },
    { id: 'facturas', label: 'Facturas', icon: 'receipt_long' },
    { id: 'accounting', label: 'Contabilidad', icon: 'payments' },
  ];

  return (
    <aside className="h-screen w-64 hidden lg:flex flex-col border-r border-[#cac4d4] bg-[#f9f9ff] py-6 px-4 shrink-0 select-none">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-2.5 mb-8 px-2">
        <img
          src={LOGO_URL}
          alt="Logotipo TextilePro"
          className="h-8 w-8 object-contain rounded"
        />
        <div>
          <h1 className="font-bold text-2xl text-[#674bb5] leading-tight tracking-tight">
            TextilePro
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552]">
            Gestión del Taller
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-150 group font-medium text-sm ${
                isActive
                  ? 'text-[#a43073] font-bold border-r-2 border-[#a43073] bg-[#e7eefe]/60 shadow-xs'
                  : 'text-[#494552] hover:text-[#674bb5] hover:bg-[#f0f3ff]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-105 ${
                  isActive ? 'material-symbols-fill text-[#a43073]' : 'text-[#7a7583] group-hover:text-[#674bb5]'
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Nav & Profile */}
      <div className="mt-auto pt-4 border-t border-[#cac4d4] flex flex-col gap-3">
        <button
          onClick={() => onNavigate('help')}
          className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-left transition-colors font-medium text-sm ${
            currentView === 'help'
              ? 'text-[#a43073] font-bold border-r-2 border-[#a43073] bg-[#e7eefe]/60'
              : 'text-[#494552] hover:text-[#674bb5] hover:bg-[#f0f3ff]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              currentView === 'help' ? 'material-symbols-fill text-[#a43073]' : 'text-[#7a7583]'
            }`}
          >
            help
          </span>
          <span>Centro de Ayuda</span>
        </button>

        {/* Add New Record Button */}
        <button
          onClick={onOpenNewRecord}
          className="w-full bg-[#a43073] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#85145a] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5 text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Agregar Nuevo Registro</span>
        </button>

        {/* Manager User Profile Card */}
        <div className="mt-1 pt-3 border-t border-[#cac4d4]/60 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#cac4d4] bg-[#e8ddff] shrink-0">
            <img
              src={MANAGER_AVATAR}
              alt="Avatar del Gerente"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-[#151c27] truncate">Gerente</div>
            <div className="text-xs text-[#494552] truncate">Admin · Taller Central</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
