import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface InventoryViewProps {
  inventory: InventoryItem[];
  searchQuery: string;
  onOpenPurchaseModal: () => void;
  onEditItem: (item: InventoryItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  searchQuery,
  onOpenPurchaseModal,
  onEditItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [statusFilter, setStatusFilter] = useState<string>('Todos los estados');

  const categories = ['Todos', 'Hilos', 'Agujas', 'Repuestos', 'Telas', 'Accesorios'];

  // Identify critical items below reorder point
  const criticalItems = inventory.filter(i => i.status === 'Crítico');
  const criticalCount = criticalItems.length;

  const filteredItems = inventory.filter((item) => {
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;

    const matchesStatus =
      statusFilter === 'Todos los estados' ||
      (statusFilter === 'Crítico' && item.status === 'Crítico') ||
      (statusFilter === 'Bajo' && item.status === 'Bajo') ||
      (statusFilter === 'OK' && item.status === 'OK');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-8">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#674bb5] tracking-tight">Inventario de Insumos</h1>
          <p className="text-sm text-[#494552] mt-1">
            Gestiona el stock actual, alertas y reabastecimiento.
          </p>
        </div>

        <button
          onClick={onOpenPurchaseModal}
          className="bg-[#a43073] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#85145a] hover:shadow-md active:scale-95 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          Registrar Compra
        </button>
      </div>

      {/* Alert Section */}
      {criticalCount > 0 && (
        <div className="bg-[#FFE4E6] border border-[#E11D48]/30 rounded-xl p-4 flex items-start gap-3.5 shadow-xs">
          <span className="material-symbols-outlined text-[#E11D48] text-[24px] shrink-0 mt-0.5 material-symbols-fill">
            warning
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#93000A]">Repuestos Críticos</h3>
            <p className="text-xs text-[#40000C] mt-1 leading-relaxed">
              {criticalCount} insumos/repuestos ({criticalItems.map(i => i.name).join(', ')}) están por debajo del punto de reorden. Se requiere acción inmediata para evitar paradas de producción.
            </p>
          </div>
        </div>
      )}

      {/* Filters & Controls */}
      <div className="bg-white border border-[#cac4d4] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-[0px_4px_12px_rgba(103,75,181,0.03)]">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-[#494552] mr-1">Categorías:</span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#a43073] text-white font-bold shadow-xs'
                    : 'border border-[#cac4d4] text-[#151c27] hover:bg-[#f0f3ff]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#494552]">Mostrar:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#cac4d4] rounded-lg py-1.5 px-3 text-xs bg-white text-[#151c27] focus:ring-2 focus:ring-[#a43073]/20 focus:border-[#a43073] outline-none cursor-pointer"
          >
            <option>Todos los estados</option>
            <option>Crítico</option>
            <option>Bajo</option>
            <option>OK</option>
          </select>
        </div>
      </div>

      {/* Data Table Panel */}
      <div className="bg-white border border-[#cac4d4] rounded-xl overflow-hidden shadow-[0px_4px_12px_rgba(103,75,181,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#f0f3ff] border-b border-[#cac4d4]">
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] w-1/3">
                  Ítem / Descripción
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552]">
                  Categoría
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-right">
                  Stock Actual
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-right">
                  Unidad
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-right">
                  Pto. Reorden
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-center">
                  Estado
                </th>
                <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-[#494552] text-center">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#cac4d4]/40">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#7a7583]">
                    No se encontraron insumos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isCritical = item.status === 'Crítico';
                  const isLow = item.status === 'Bajo';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-[#f0f3ff] transition-colors h-12 ${
                        isCritical
                          ? 'bg-[#FFE4E6]/25'
                          : isLow
                          ? 'bg-[#FEF9C3]/20'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-4 font-medium text-[#151c27]">
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] text-[#7a7583] font-mono">({item.id})</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-[#494552]">{item.category}</td>
                      <td
                        className={`py-2.5 px-4 text-right font-mono font-medium ${
                          isCritical
                            ? 'text-[#ba1a1a] font-bold text-sm'
                            : isLow
                            ? 'text-[#a16207] font-bold text-sm'
                            : 'text-[#151c27]'
                        }`}
                      >
                        {item.currentStock}
                      </td>
                      <td className="py-2.5 px-4 text-[#494552] text-right">{item.unit}</td>
                      <td className="py-2.5 px-4 text-right text-[#494552] font-mono">
                        {item.reorderPoint}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {isCritical ? (
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#FFE4E6] text-[#E11D48] text-[11px] font-bold gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
                            Crítico
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#FEF9C3] text-[#A16207] text-[11px] font-bold gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#A16207]" />
                            Bajo
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                            OK
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => onEditItem(item)}
                          className="text-[#a43073] hover:text-[#76014e] p-1.5 hover:bg-[#ffd8e7] rounded-lg transition-colors cursor-pointer"
                          title="Editar Stock"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
