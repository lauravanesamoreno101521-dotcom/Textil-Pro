import React, { useState } from 'react';
import { ActivityOrder, ORDER_STATUS_LABELS } from '../../types';
import { getOrderDeliveryInfo } from '../../utils/deliveryDeadline';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ActivityOrder | null;
  onUpdateStatus: (orderId: string, newStatus: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending') => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus
}) => {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState(order.status);
  const delivery = getOrderDeliveryInfo(order);

  const handleStatusChange = (status: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending') => {
    setCurrentStatus(status);
    onUpdateStatus(order.id, status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#fdf1f6] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ca2164]">inventory_2</span>
            <div>
              <h3 className="font-bold text-base text-[#151c27]">Detalles del Pedido</h3>
              <span className="font-mono text-xs text-[#ca2164] font-bold">{order.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <span className="text-[#7a7583] block mb-0.5">Cliente / Marca</span>
            <span className="text-sm font-bold text-[#151c27]">{order.client}</span>
          </div>

          <div>
            <span className="text-[#7a7583] block mb-0.5">Prendas y Especificaciones</span>
            <p className="text-xs text-[#494552] bg-[#fefafb] p-3 rounded-lg border border-[#cac4d4]">
              {order.items}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#fdf1f6] p-3 rounded-lg">
              <span className="text-[#7a7583] block">Fecha Límite (Día 9)</span>
              <span className="font-bold text-[#151c27]">{order.dueDate || 'Sin fecha registrada'}</span>
            </div>
            <div className="bg-[#fdf1f6] p-3 rounded-lg">
              <span className="text-[#7a7583] block">Valor Total</span>
              <span className="font-bold text-[#006c4b] font-mono text-sm">
                ${order.totalValue ? order.totalValue.toLocaleString() : '3,200.00'}
              </span>
            </div>
          </div>

          <div className="bg-[#fefafb] border border-[#cac4d4] rounded-lg p-3 flex items-center justify-between gap-3">
            <div>
              <span className="text-[#7a7583] block mb-1">Tiempo de Entrega</span>
              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${delivery.badgeClass}`}>
                {delivery.label}
              </span>
            </div>
            {delivery.diasRestantes !== null && (
              <span className="text-[11px] text-[#494552] text-right shrink-0">
                {delivery.diasRestantes >= 0
                  ? `${delivery.diasRestantes} día(s) restante(s)`
                  : `${Math.abs(delivery.diasRestantes)} día(s) de retraso`}
              </span>
            )}
          </div>

          <div>
            <span className="text-[#494552] font-bold block mb-2">Cambiar Estado del Pedido:</span>
            <div className="grid grid-cols-2 gap-2">
              {(['Pending', 'In Progress', 'Delivered', 'Delayed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    currentStatus === st
                      ? 'border-[#ca2164] bg-[#fdeaf2] text-[#ca2164] shadow-xs'
                      : 'border-[#cac4d4] text-[#494552] hover:bg-[#fdf1f6]'
                  }`}
                >
                  {ORDER_STATUS_LABELS[st]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#fefafb] p-4 border-t border-[#cac4d4] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ca2164] text-white rounded-lg font-bold text-xs hover:bg-[#a3144d] transition-colors cursor-pointer"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
