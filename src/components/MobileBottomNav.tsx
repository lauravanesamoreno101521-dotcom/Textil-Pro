import React from 'react';
import { NavView } from '../types';

interface MobileBottomNavProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate
}) => {
  const items: { id: NavView; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Inicio', icon: 'dashboard' },
    { id: 'inventory', label: 'Stock', icon: 'inventory_2' },
    { id: 'production', label: 'Producción', icon: 'groups' },
    { id: 'facturas', label: 'Facturas', icon: 'receipt_long' },
    { id: 'accounting', label: 'Finanzas', icon: 'account_balance_wallet' },
    { id: 'help', label: 'Ayuda', icon: 'help' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-16 px-2 lg:hidden bg-[#fefafb] border-t border-[#cac4d4] shadow-lg">
      {items.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center p-1 rounded-lg flex-1 min-w-0 transition-all duration-150 cursor-pointer ${
              isActive
                ? 'text-[#a43073] font-bold scale-105'
                : 'text-[#494552] hover:text-[#ca2164]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] mb-0.5 ${
                isActive ? 'material-symbols-fill text-[#a43073]' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold truncate max-w-full">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
