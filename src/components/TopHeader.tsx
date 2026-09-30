import React, { useState, useRef, useEffect } from 'react';
import { NotificationItem, NavView } from '../types';
import { LOGO_URL, MANAGER_AVATAR } from '../data/initialData';

interface TopHeaderProps {
  currentView: NavView;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onNavigate: (view: NavView) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentView,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  onNavigate
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPlaceholderText = () => {
    switch (currentView) {
      case 'inventory':
        return 'Buscar inventario, materiales, agujas, hilos...';
      case 'production':
        return 'Buscar registros, operarios, prendas, máquinas...';
      case 'facturas':
        return 'Buscar factura, prenda u operario...';
      case 'accounting':
        return 'Buscar transacciones, clientes, gastos...';
      case 'help':
        return 'Buscar tutoriales y preguntas frecuentes...';
      default:
        return 'Buscar pedidos, operarios, inventario...';
    }
  };

  return (
    <header className="bg-[#fefafb] flex justify-between items-center w-full px-4 md:px-10 h-16 sticky top-0 z-30 border-b border-[#cac4d4] shrink-0">
      {/* Mobile Logo & Title */}
      <div className="flex items-center gap-3 lg:hidden">
        <img
          src={LOGO_URL}
          alt="Logotipo TextilePro"
          className="h-8 w-8 object-contain rounded"
        />
        <span className="font-bold text-xl text-[#ca2164]">TextilePro</span>
      </div>

      {/* Desktop Search Input */}
      <div className="hidden lg:flex items-center flex-1 max-w-md relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7a7583] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={getPlaceholderText()}
          className="w-full pl-10 pr-8 py-2 bg-[#fdf1f6] border border-[#cac4d4] rounded-full text-sm text-[#151c27] placeholder:text-[#7a7583] focus:outline-none focus:border-[#a43073] focus:ring-2 focus:ring-[#a43073]/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7583] hover:text-[#151c27]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#494552] hover:bg-[#fbe0ea] rounded-full transition-colors relative cursor-pointer active:scale-95"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#fefafb] animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#cac4d4] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3.5 bg-[#fdf1f6] border-b border-[#cac4d4] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#151c27]">Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#a43073] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onClearAllNotifications}
                    className="text-xs text-[#ca2164] hover:underline font-semibold"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#cac4d4]/40">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#7a7583]">
                    No hay notificaciones recientes.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3.5 hover:bg-[#fdf1f6] transition-colors cursor-pointer flex gap-3 items-start ${
                        !notif.read ? 'bg-[#fdeaf2]/30' : ''
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                          notif.type === 'alert'
                            ? 'text-[#ba1a1a]'
                            : notif.type === 'success'
                            ? 'text-[#006c4b]'
                            : 'text-[#ca2164]'
                        }`}
                      >
                        {notif.type === 'alert'
                          ? 'warning'
                          : notif.type === 'success'
                          ? 'check_circle'
                          : 'info'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-[#151c27]">{notif.title}</p>
                          <span className="text-[10px] text-[#7a7583] shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-[#494552] mt-0.5 leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-[#494552] hover:bg-[#fbe0ea] rounded-full transition-colors active:scale-95 cursor-pointer"
            aria-label="Configuración"
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
          </button>

          {/* Settings Popover */}
          {showSettings && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#cac4d4] rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <h3 className="text-sm font-bold text-[#151c27] mb-3 pb-2 border-b border-[#cac4d4]">
                Configuración del Taller
              </h3>
              <div className="space-y-3 text-xs text-[#494552]">
                <div className="flex justify-between items-center py-1">
                  <span>Moneda Principal</span>
                  <span className="font-bold text-[#151c27] bg-[#fdf1f6] px-2 py-0.5 rounded">COP ($)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Tarifa Estándar Pieza</span>
                  <span className="font-bold text-[#151c27] bg-[#fdf1f6] px-2 py-0.5 rounded">$ 1.500 / pza</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Turno Activo</span>
                  <span className="font-bold text-[#006c4b] bg-[#ecfdf5] px-2 py-0.5 rounded">Turno A (Mañana)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Alertas Stock Bajo</span>
                  <span className="text-[#34d399] font-bold">Activas</span>
                </div>
                <div className="pt-2 border-t border-[#cac4d4]/60">
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      onNavigate('help');
                    }}
                    className="w-full text-center text-xs text-[#ca2164] font-semibold hover:underline py-1"
                  >
                    Ver Centro de Ayuda
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Manager Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#cac4d4] cursor-pointer hover:opacity-90 transition-opacity ml-1 shrink-0">
          <img
            src={MANAGER_AVATAR}
            alt="Gerente"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
