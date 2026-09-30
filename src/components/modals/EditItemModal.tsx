import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../../types';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onUpdateItem: (item: InventoryItem) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onUpdateItem
}) => {
  const [name, setName] = useState('');
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [reorderPoint, setReorderPoint] = useState<number>(0);
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState<'Hilos' | 'Agujas' | 'Repuestos'>('Hilos');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCurrentStock(item.currentStock);
      setReorderPoint(item.reorderPoint);
      setUnit(item.unit);
      setCategory(item.category);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-calculate status
    let status: 'OK' | 'Crítico' | 'Bajo' = 'OK';
    if (currentStock <= reorderPoint * 0.6) {
      status = 'Crítico';
    } else if (currentStock <= reorderPoint) {
      status = 'Bajo';
    }

    onUpdateItem({
      ...item,
      name,
      currentStock,
      reorderPoint,
      unit,
      category,
      status,
      lastUpdated: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#fdf1f6] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ca2164]">edit</span>
            <h3 className="font-bold text-base text-[#151c27]">Editar Stock de Insumo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Nombre / Descripción</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
              >
                <option value="Hilos">Hilos</option>
                <option value="Agujas">Agujas</option>
                <option value="Repuestos">Repuestos</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Unidad</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Stock Actual</label>
              <input
                type="number"
                min="0"
                required
                value={currentStock}
                onChange={(e) => setCurrentStock(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-sm font-bold text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Pto. Reorden</label>
              <input
                type="number"
                min="1"
                required
                value={reorderPoint}
                onChange={(e) => setReorderPoint(parseInt(e.target.value) || 1)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-sm text-[#494552] focus:border-[#a43073] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-[#a43073] hover:bg-[#85145a] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
          >
            Actualizar Insumo
          </button>
        </form>
      </div>
    </div>
  );
};
