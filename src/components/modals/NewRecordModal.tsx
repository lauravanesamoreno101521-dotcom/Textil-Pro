import React, { useState } from 'react';
import { GarmentRateGroup, InventoryItem, Operative } from '../../types';
import { formatCOP } from '../../utils/format';

interface NewRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatives: Operative[];
  inventory: InventoryItem[];
  taskRates: GarmentRateGroup[];
  onAddOrder: (order: { client: string; items: string; quantity: number; totalValue: number }) => void;
  onAddProduction: (entry: { operativeId: string; machineId: string; garmentType: string; taskName: string; batchQty: number; ratePerPiece: number }) => void;
  onAddStock: (stock: { name: string; category: 'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios'; quantity: number; unit: string; costPerUnit: number; reorderPoint: number }) => void;
}

export const NewRecordModal: React.FC<NewRecordModalProps> = ({
  isOpen,
  onClose,
  operatives,
  inventory,
  taskRates,
  onAddOrder,
  onAddProduction,
  onAddStock
}) => {
  const [tab, setTab] = useState<'order' | 'production' | 'stock'>('order');

  // Order state
  const [client, setClient] = useState('');
  const [orderItems, setOrderItems] = useState('50 Camisetas Cuello V');
  const [orderQty, setOrderQty] = useState(50);
  const [orderTotal, setOrderTotal] = useState(2500);

  // Production state
  const [prodOp, setProdOp] = useState(operatives[0]?.id || 'OP-001');
  const [prodGarmentGroupId, setProdGarmentGroupId] = useState(taskRates[0]?.id || '');
  const [prodTaskId, setProdTaskId] = useState(taskRates[0]?.tasks[0]?.id || '');
  const [prodQty, setProdQty] = useState(30);
  const [prodMachine, setProdMachine] = useState('MC-104');

  const prodGroup = taskRates.find((g) => g.id === prodGarmentGroupId) || null;
  const prodTask = prodGroup?.tasks.find((t) => t.id === prodTaskId) || null;
  const prodRate = prodTask?.price || 0;

  const handleProdGarmentGroupChange = (groupId: string) => {
    setProdGarmentGroupId(groupId);
    const group = taskRates.find((g) => g.id === groupId);
    setProdTaskId(group?.tasks[0]?.id || '');
  };

  // Stock state
  const [stockName, setStockName] = useState('');
  const [stockCategory, setStockCategory] = useState<'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios'>('Hilos');
  const [stockQty, setStockQty] = useState(100);
  const [stockUnit, setStockUnit] = useState('Conos');
  const [stockCost, setStockCost] = useState(3.50);
  const [stockReorder, setStockReorder] = useState(50);

  if (!isOpen) return null;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.trim()) return;
    onAddOrder({
      client,
      items: orderItems,
      quantity: orderQty,
      totalValue: orderTotal
    });
    onClose();
  };

  const handleProductionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodGroup || !prodTask) return;
    onAddProduction({
      operativeId: prodOp,
      machineId: prodMachine,
      garmentType: prodGroup.garmentName,
      taskName: prodTask.name,
      batchQty: prodQty,
      ratePerPiece: prodRate
    });
    onClose();
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockName.trim()) return;
    onAddStock({
      name: stockName,
      category: stockCategory,
      quantity: stockQty,
      unit: stockUnit,
      costPerUnit: stockCost,
      reorderPoint: stockReorder
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#cac4d4] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#f0f3ff] p-4 border-b border-[#cac4d4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#674bb5]">add_circle</span>
            <h3 className="font-bold text-base text-[#151c27]">Agregar Nuevo Registro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7a7583] hover:text-[#151c27] hover:bg-[#e2e8f8] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#cac4d4] bg-[#f9f9ff] px-4 pt-2">
          <button
            onClick={() => setTab('order')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              tab === 'order'
                ? 'border-[#a43073] text-[#a43073]'
                : 'border-transparent text-[#494552] hover:text-[#151c27]'
            }`}
          >
            Nuevo Pedido
          </button>
          <button
            onClick={() => setTab('production')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              tab === 'production'
                ? 'border-[#a43073] text-[#a43073]'
                : 'border-transparent text-[#494552] hover:text-[#151c27]'
            }`}
          >
            Producción
          </button>
          <button
            onClick={() => setTab('stock')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              tab === 'stock'
                ? 'border-[#a43073] text-[#a43073]'
                : 'border-transparent text-[#494552] hover:text-[#151c27]'
            }`}
          >
            Insumo / Stock
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {tab === 'order' && (
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#494552] block mb-1">Cliente / Marca</label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Ej. Boutique Elegance, Modas Valencia..."
                  className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#494552] block mb-1">Prendas / Descripción</label>
                <input
                  type="text"
                  required
                  value={orderItems}
                  onChange={(e) => setOrderItems(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Cantidad de Piezas</label>
                  <input
                    type="number"
                    min="1"
                    value={orderQty}
                    onChange={(e) => setOrderQty(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Valor Total ($ USD)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={orderTotal}
                    onChange={(e) => setOrderTotal(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#674bb5] hover:bg-[#4f319c] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
              >
                Crear Pedido en Taller
              </button>
            </form>
          )}

          {tab === 'production' && (
            taskRates.length === 0 ? (
              <div className="p-3 bg-[#fdf2f8] border border-[#ffd8e7] rounded-lg text-xs text-[#a43073]">
                Primero agrega prendas y labores estandarizadas en la pestaña Producción antes de registrar aquí.
              </div>
            ) : (
              <form onSubmit={handleProductionSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Operario Responsable</label>
                  <select
                    value={prodOp}
                    onChange={(e) => setProdOp(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                  >
                    {operatives.map(op => (
                      <option key={op.id} value={op.id}>{op.id} - {op.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#494552] block mb-1">Prenda</label>
                    <select
                      value={prodGarmentGroupId}
                      onChange={(e) => handleProdGarmentGroupChange(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                    >
                      {taskRates.map((group) => (
                        <option key={group.id} value={group.id}>{group.garmentName || '(Sin nombre)'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#494552] block mb-1">Máquina</label>
                    <select
                      value={prodMachine}
                      onChange={(e) => setProdMachine(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                    >
                      <option value="MC-104">MC-104 (Plana)</option>
                      <option value="MC-201">MC-201 (Remalladora)</option>
                      <option value="MC-305">MC-305 (Collarín)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Labor Realizada</label>
                  <select
                    value={prodTaskId}
                    onChange={(e) => setProdTaskId(e.target.value)}
                    disabled={!prodGroup || prodGroup.tasks.length === 0}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer disabled:bg-[#f0f3ff] disabled:text-[#7a7583]"
                  >
                    {prodGroup && prodGroup.tasks.length > 0 ? (
                      prodGroup.tasks.map((task) => (
                        <option key={task.id} value={task.id}>{task.name} — {formatCOP(task.price, 1)}</option>
                      ))
                    ) : (
                      <option value="">Esta prenda no tiene labores cargadas</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#494552] block mb-1">Cantidad Lote</label>
                    <input
                      type="number"
                      min="1"
                      value={prodQty}
                      onChange={(e) => setProdQty(parseInt(e.target.value) || 1)}
                      className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#494552] block mb-1">Tarifa / Pieza</label>
                    <div className="w-full p-2.5 rounded-lg border border-[#cac4d4] bg-[#f0f3ff] font-mono text-xs text-[#494552]">
                      {formatCOP(prodRate, 1)}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-[#ede9fe]/50 rounded-lg border border-[#a78bfa]/40 flex justify-between items-center text-xs">
                  <span className="text-[#3c1989] font-medium">Pago estimado:</span>
                  <span className="font-mono font-bold text-[#674bb5]">{formatCOP(prodQty * prodRate)}</span>
                </div>

                <button
                  type="submit"
                  disabled={!prodGroup || !prodTask}
                  className="w-full mt-4 bg-[#a43073] hover:bg-[#85145a] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Guardar Registro de Producción
                </button>
              </form>
            )
          )}

          {tab === 'stock' && (
            <form onSubmit={handleStockSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#494552] block mb-1">Nombre del Insumo / Repuesto</label>
                <input
                  type="text"
                  required
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  placeholder="Ej. Hilo Texturizado 120, Cintas Elásticas..."
                  className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Categoría</label>
                  <select
                    value={stockCategory}
                    onChange={(e) => setStockCategory(e.target.value as any)}
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
                  <label className="text-xs font-bold text-[#494552] block mb-1">Unidad de Medida</label>
                  <select
                    value={stockUnit}
                    onChange={(e) => setStockUnit(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] text-xs text-[#151c27] focus:border-[#a43073] outline-none cursor-pointer"
                  >
                    <option value="Conos">Conos</option>
                    <option value="Paq. (100)">Paq. (100)</option>
                    <option value="Metros">Metros</option>
                    <option value="Litros">Litros</option>
                    <option value="Unidades">Unidades</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Cantidad Comprada</label>
                  <input
                    type="number"
                    min="1"
                    value={stockQty}
                    onChange={(e) => setStockQty(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#494552] block mb-1">Pto. Reorden Alerta</label>
                  <input
                    type="number"
                    min="1"
                    value={stockReorder}
                    onChange={(e) => setStockReorder(parseInt(e.target.value) || 10)}
                    className="w-full p-2.5 rounded-lg border border-[#cac4d4] font-mono text-xs text-[#151c27] focus:border-[#a43073] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#006c4b] hover:bg-[#003d28] text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
              >
                Registrar Insumo en Inventario
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
