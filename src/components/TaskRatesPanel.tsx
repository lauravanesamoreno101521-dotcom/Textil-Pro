import React from 'react';
import { GarmentRateGroup, InventoryItem } from '../types';
import { formatCOP } from '../utils/format';

interface TaskRatesPanelProps {
  taskRates: GarmentRateGroup[];
  searchQuery: string;
  onEditGroup: (group: GarmentRateGroup) => void;
  onAddGroup: () => void;
  // Solo para mostrar el nombre del hilo asociado a cada labor, si aplica.
  hiloItems: InventoryItem[];
}

export const TaskRatesPanel: React.FC<TaskRatesPanelProps> = ({
  taskRates,
  searchQuery,
  onEditGroup,
  onAddGroup,
  hiloItems
}) => {
  const filteredGroups = taskRates
    .map((group) => {
      if (searchQuery === '') return group;
      const matchesGarment = group.garmentName.toLowerCase().includes(searchQuery.toLowerCase());
      if (matchesGarment) return group;
      const matchingTasks = group.tasks.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchingTasks.length > 0 ? { ...group, tasks: matchingTasks } : null;
    })
    .filter((g): g is GarmentRateGroup => g !== null);

  return (
    <div className="bg-white border border-[#cac4d4] rounded-xl p-5 shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cac4d4] pb-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#ca2164]">Tarifas Estandarizadas por Labor</h2>
          <p className="text-xs text-[#7a7583] mt-0.5">
            Precio en pesos colombianos (COP) por labor realizada. Base para calcular la nómina de cada operario.
          </p>
        </div>
        <button
          onClick={onAddGroup}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-[#ca2164] text-white rounded-lg font-bold text-xs hover:bg-[#a3144d] transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Agregar Prenda
        </button>
      </div>

      {filteredGroups.length === 0 ? (
        <p className="text-xs text-[#7a7583] text-center py-8">
          No se encontraron prendas o labores con los filtros aplicados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="border border-[#cac4d4] rounded-xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#fdf1f6] px-4 py-2.5 flex items-center justify-between border-b border-[#cac4d4]">
                <h3 className="text-sm font-bold text-[#151c27] uppercase tracking-wide">
                  {group.garmentName}
                </h3>
                <button
                  onClick={() => {
                    const original = taskRates.find((g) => g.id === group.id);
                    if (original) onEditGroup(original);
                  }}
                  className="p-1 text-[#ca2164] hover:text-[#a3144d] hover:bg-white rounded-lg transition-colors cursor-pointer"
                  title="Editar tarifas de esta prenda"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>

              <div className="divide-y divide-[#cac4d4]/50">
                {group.tasks.length === 0 ? (
                  <p className="text-xs text-[#7a7583] text-center py-4">Sin labores registradas.</p>
                ) : (
                  group.tasks.map((task) => {
                    const hilo = task.hiloItemId ? hiloItems.find((h) => h.id === task.hiloItemId) : null;
                    return (
                      <div
                        key={task.id}
                        className="flex items-center justify-between px-4 py-2 text-xs hover:bg-[#fefafb] transition-colors gap-2"
                      >
                        <div className="min-w-0">
                          <span className="font-semibold text-[#151c27]">{task.name}</span>
                          {hilo && (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-[#7a7583]">
                              <span className="material-symbols-outlined text-[12px]">linear_scale</span>
                              {hilo.name}
                              {task.gramsPerPiece ? ` · ${task.gramsPerPiece} g/pza` : ''}
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-bold text-[#ca2164] shrink-0">
                          {formatCOP(task.price, 1)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
