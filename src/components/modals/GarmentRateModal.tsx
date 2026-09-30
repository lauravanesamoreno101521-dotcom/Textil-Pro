import React, { useState, useEffect } from 'react';
import { GarmentRateGroup, InventoryItem, TaskRate } from '../../types';

interface GarmentRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: GarmentRateGroup | null;
  onSave: (group: GarmentRateGroup) => void;
  onDelete?: (groupId: string) => void;
  // Insumos de hilo disponibles (InventoryItem con category "Hilos"), para
  // poder enlazar cada labor con el hilo que consume y su gasto por pieza.
  hiloItems: InventoryItem[];
}

let taskIdCounter = 0;

export const GarmentRateModal: React.FC<GarmentRateModalProps> = ({
  isOpen,
  onClose,
  group,
  onSave,
  onDelete,
  hiloItems
}) => {
  const [garmentName, setGarmentName] = useState('');
  const [tasks, setTasks] = useState<TaskRate[]>([]);

  useEffect(() => {
    if (group) {
      setGarmentName(group.garmentName);
      setTasks(group.tasks.map(t => ({ ...t })));
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleTaskChange = (id: string, field: 'name' | 'price', value: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        if (field === 'name') return { ...t, name: value };
        return { ...t, price: parseFloat(value) || 0 };
      })
    );
  };

  const handleTaskHiloChange = (id: string, hiloItemId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        // Si se quita el hilo asociado, también se limpia el gasto por pieza.
        if (!hiloItemId) return { ...t, hiloItemId: undefined, gramsPerPiece: undefined };
        return { ...t, hiloItemId };
      })
    );
  };

  const handleTaskGramsChange = (id: string, value: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const parsed = parseFloat(value);
        return { ...t, gramsPerPiece: Number.isFinite(parsed) && parsed > 0 ? parsed : undefined };
      })
    );
  };

  const handleAddTask = () => {
    taskIdCounter += 1;
    setTasks(prev => [
      ...prev,
      { id: `${group.id}-nueva-${Date.now()}-${taskIdCounter}`, name: '', price: 0 }
    ]);
  };

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!garmentName.trim()) return;

    const cleanTasks = tasks
      .map(t => ({ ...t, name: t.name.trim() }))
      .filter(t => t.name !== '');

    onSave({
      ...group,
      garmentName: garmentName.trim(),
      tasks: cleanTasks
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#fdf1f6] p-4 border-b border-[#cac4d4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ca2164]">payments</span>
            <h3 className="font-bold text-base text-[#151c27]">Editar Tarifas por Labor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#fbe0ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-[#494552] block mb-1">Nombre de la Prenda</label>
            <input
              type="text"
              required
              value={garmentName}
              onChange={(e) => setGarmentName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#494552]">Labores y Precio (COP)</label>
              <button
                type="button"
                onClick={handleAddTask}
                className="text-[11px] font-bold text-[#ca2164] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Agregar Labor
              </button>
            </div>
            <p className="text-[10px] text-[#7a7583] mb-2 -mt-1">
              Si una labor gasta hilo, enlázala con el insumo y anota los gramos por pieza (estimado) para
              recibir una alerta de stock al registrar producción. Es solo referencia: nunca descuenta el
              inventario automáticamente.
            </p>

            <div className="space-y-2">
              {tasks.length === 0 && (
                <p className="text-xs text-[#7a7583] text-center py-3 border border-dashed border-[#cac4d4] rounded-lg">
                  Sin labores registradas. Agrega la primera.
                </p>
              )}
              {tasks.map((task) => (
                <div key={task.id} className="border border-[#cac4d4]/70 rounded-lg p-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nombre de la labor (ej. Dobladillo)"
                      value={task.name}
                      onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
                      className="flex-1 min-w-0 p-2 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                    />
                    <div className="relative w-28 shrink-0">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#7a7583]">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={task.price}
                        onChange={(e) => handleTaskChange(task.id, 'price', e.target.value)}
                        className="w-full pl-5 pr-2 p-2 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(task.id)}
                      className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Eliminar labor"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>

                  {/* Consumo de hilo (opcional): solo para labores que gastan hilo */}
                  <div className="flex items-center gap-2 pl-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#7a7583] shrink-0">
                      linear_scale
                    </span>
                    <select
                      value={task.hiloItemId || ''}
                      onChange={(e) => handleTaskHiloChange(task.id, e.target.value)}
                      className="flex-1 min-w-0 p-1.5 rounded-lg border border-[#cac4d4] text-[11px] text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                    >
                      <option value="">Sin hilo asociado</option>
                      {hiloItems.map((hilo) => (
                        <option key={hilo.id} value={hilo.id}>
                          {hilo.name}
                        </option>
                      ))}
                    </select>
                    {task.hiloItemId && (
                      <div className="relative w-24 shrink-0">
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="g/pza"
                          value={task.gramsPerPiece ?? ''}
                          onChange={(e) => handleTaskGramsChange(task.id, e.target.value)}
                          className="w-full pl-2 pr-6 p-1.5 rounded-lg border border-[#cac4d4] font-mono text-[11px] text-[#151c27] focus:border-[#a43073] outline-none"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#7a7583]">
                          g/pza
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 bg-[#ca2164] hover:bg-[#a3144d] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
            >
              Guardar Tarifas
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(group.id);
                  onClose();
                }}
                className="px-4 py-2.5 border border-[#ba1a1a]/40 text-[#ba1a1a] hover:bg-[#ffdad6] font-bold rounded-lg text-xs transition-all cursor-pointer"
              >
                Eliminar Prenda
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
