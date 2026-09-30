import React, { useState } from 'react';
import { NavView } from '../types';
import { LOGO_URL, MANAGER_AVATAR } from '../data/initialData';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenNewRecord: () => void;
  onExitToKiosk?: () => void;
  unreadCount?: number;
}

const COLLAPSE_STORAGE_KEY = 'textilepro_sidebar_collapsed';

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenNewRecord,
  onExitToKiosk
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(COLLAPSE_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_STORAGE_KEY, next ? '1' : '0');
      } catch {
        // localStorage no disponible; el estado sigue funcionando solo en memoria.
      }
      return next;
    });
  };

  const navItems: { id: NavView; label: string; icon: string; iconFilled?: boolean }[] = [
    { id: 'dashboard', label: 'Panel', icon: 'dashboard' },
    { id: 'inventory', label: 'Inventario', icon: 'inventory_2' },
    { id: 'production', label: 'Producción', icon: 'precision_manufacturing' },
    { id: 'facturas', label: 'Facturas', icon: 'receipt_long' },
    { id: 'accounting', label: 'Contabilidad', icon: 'payments' },
  ];

  return (
    <aside
      className={`h-screen hidden lg:flex flex-col border-r border-[#cac4d4] bg-[#fefafb] py-6 shrink-0 select-none relative transition-all duration-200 ${
        isCollapsed ? 'w-20 px-2' : 'w-64 px-4'
      }`}
    >
      {/* Collapse / Expand Toggle */}
      <button
        onClick={toggleCollapsed}
        title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
        className="absolute -right-3 top-9 w-6 h-6 rounded-full bg-white border border-[#cac4d4] shadow-sm flex items-center justify-center text-[#ca2164] hover:bg-[#fdf1f6] hover:border-[#a43073] transition-colors cursor-pointer z-10"
      >
        <span className="material-symbols-outlined text-[16px]">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      {/* Brand Logo & Title */}
      <div className={`flex items-center gap-2.5 mb-8 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <img
          src={LOGO_URL}
          alt="Logotipo TextilePro"
          className="h-8 w-8 object-contain rounded shrink-0"
        />
        {!isCollapsed && (
          <div className="min-w-0">
            <h1 className="font-bold text-2xl text-[#ca2164] leading-tight tracking-tight truncate">
              TextilePro
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#494552] truncate">
              Gestión del Taller
            </p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center rounded-lg text-left transition-all duration-150 group font-medium text-sm ${
                isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3.5 py-2.5'
              } ${
                isActive
                  ? 'text-[#a43073] font-bold border-r-2 border-[#a43073] bg-[#fde9f1]/60 shadow-xs'
                  : 'text-[#494552] hover:text-[#ca2164] hover:bg-[#fdf1f6]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-105 shrink-0 ${
                  isActive ? 'material-symbols-fill text-[#a43073]' : 'text-[#7a7583] group-hover:text-[#ca2164]'
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer Nav & Profile */}
      <div className="mt-auto pt-4 border-t border-[#cac4d4] flex flex-col gap-3">
        <button
          onClick={() => onNavigate('help')}
          title={isCollapsed ? 'Centro de Ayuda' : undefined}
          className={`flex items-center rounded-lg text-left transition-colors font-medium text-sm ${
            isCollapsed ? 'justify-center px-2 py-2' : 'gap-3 px-3.5 py-2'
          } ${
            currentView === 'help'
              ? 'text-[#a43073] font-bold border-r-2 border-[#a43073] bg-[#fde9f1]/60'
              : 'text-[#494552] hover:text-[#ca2164] hover:bg-[#fdf1f6]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] shrink-0 ${
              currentView === 'help' ? 'material-symbols-fill text-[#a43073]' : 'text-[#7a7583]'
            }`}
          >
            help
          </span>
          {!isCollapsed && <span className="truncate">Centro de Ayuda</span>}
        </button>

        {/* Add New Record Button */}
        <button
          onClick={onOpenNewRecord}
          title={isCollapsed ? 'Agregar Nuevo Registro' : undefined}
          className={`w-full bg-[#a43073] text-white font-semibold rounded-lg hover:bg-[#85145a] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5 text-sm cursor-pointer ${
            isCollapsed ? 'py-2.5 px-2' : 'py-2.5 px-4'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] shrink-0">add</span>
          {!isCollapsed && <span>Agregar Nuevo Registro</span>}
        </button>

        {/* Switch back to the shared operative kiosk screen */}
        {onExitToKiosk && (
          <button
            onClick={onExitToKiosk}
            title={isCollapsed ? 'Volver a selección de operario' : undefined}
            className={`flex items-center rounded-lg text-left transition-colors font-medium text-xs text-[#7a7583] hover:text-[#a43073] hover:bg-[#fdf2f8] ${
              isCollapsed ? 'justify-center px-2 py-2' : 'gap-2.5 px-3.5 py-2'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] shrink-0">switch_account</span>
            {!isCollapsed && <span className="truncate">Volver a selección de operario</span>}
          </button>
        )}

        {/* Manager User Profile Card */}
        <div
          className={`mt-1 pt-3 border-t border-[#cac4d4]/60 flex items-center gap-3 ${
            isCollapsed ? 'justify-center px-0' : 'px-2'
          }`}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#cac4d4] bg-[#fcdeea] shrink-0">
            <img
              src={MANAGER_AVATAR}
              alt="Avatar del Gerente"
              className="w-full h-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-[#151c27] truncate">Gerente</div>
              <div className="text-xs text-[#494552] truncate">Admin · Taller Central</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
