import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface PurchaseStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
  onAddStock: (stock: {
    name: string;
    category: 'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios';
    quantity: number;
    unit: string;
    costPerUnit: number;
    reorderPoint: number;
  }) => void;
}

export const PurchaseStockModal: React.FC<PurchaseStockModalProps> = ({
  isOpen,
  onClose,
  inventory,
  onAddStock
}) => {
  const [selectedExistingId, setSelectedExistingId] = useState<string>('new');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios'>('Hilos');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState<string>('Conos');
  const [costPerUnit, setCostPerUnit] = useState<number>(4.00);
  const [reorderPoint, setReorderPoint] = useState<number>(20);

  if (!isOpen) return null;

  const handleExistingChange = (id: string) => {
    setSelectedExistingId(id);
    if (id !== 'new') {
      const existing = inventory.find(i => i.id === id);
      if (existing) {
        setName(existing.name);
        setCategory(existing.category);
        setUnit(existing.unit);
        setCostPerUnit(existing.costPerUnit || 3.50);
        setReorderPoint(existing.reorderPoint);
      }
    } else {
      setName('');
      setCategory('Hilos');
      setUnit('Conos');
      setCostPerUnit(3.50);
      setReorderPoint(20);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStock({
      name,
      category,
      quantity,
      unit,
      costPerUnit,
      reorderPoint
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#ffd8e7]/50 p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a43073]">add_shopping_cart</span>
            <h3 className="font-bold text-base text-[#151c27]">Registrar Compra de Insumos</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#e2e8f8] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">
              Seleccionar o Nuevo Ítem
            </label>
            <select
              value={selectedExistingId}
              onChange={(e) => handleExistingChange(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
            >
              <option value="new">+ Crear Nuevo Insumo / Repuesto</option>
              {inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  Reabastecer: {item.name} ({item.currentStock} {item.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">
              Descripción / Material
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Hilo Poliéster 100%..."
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
                <option value="Telas">Telas</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">Unidad</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Conos, Paq, Metros..."
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">
                Cantidad a Ingresar
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#494552] block mb-1">
                Costo Unitario ($)
              </label>
              <input
                type="number"
                min="0.01"
                step="0.05"
                required
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-[#fdf2f8] rounded-lg border border-[#ffd8e7] flex justify-between items-center text-xs">
            <span className="text-[#a43073] font-medium">Gasto Total de Compra:</span>
            <span className="font-mono font-bold text-sm text-[#a43073]">
              ${(quantity * costPerUnit).toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#a43073] hover:bg-[#85145a] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
          >
            Confirmar y Actualizar Stock
          </button>
        </form>
      </div>
    </div>
  );
};
