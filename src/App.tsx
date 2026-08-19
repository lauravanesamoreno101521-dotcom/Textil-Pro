import React, { useState, useEffect } from 'react';
import {
  NavView,
  InventoryItem,
  Operative,
  ProductionEntry,
  ExpenseRecord,
  IncomeRecord,
  ActivityOrder,
  NotificationItem,
  GarmentRateGroup
} from './types';
import {
  INITIAL_INVENTORY,
  INITIAL_OPERATIVES,
  INITIAL_PRODUCTION_HISTORY,
  INITIAL_EXPENSES,
  INITIAL_INCOMES,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TASK_RATES
} from './data/initialData';
import { INITIAL_FACTURAS } from './data/facturasData';
import { toISODate } from './utils/payroll';
import { getDueDateISO, formatDateEs } from './utils/deliveryDeadline';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileBottomNav } from './components/MobileBottomNav';

import { DashboardView } from './components/views/DashboardView';
import { InventoryView } from './components/views/InventoryView';
import { ProductionView } from './components/views/ProductionView';
import { FacturasView } from './components/views/FacturasView';
import { AccountingView } from './components/views/AccountingView';
import { HelpCenterView } from './components/views/HelpCenterView';

import { NewRecordModal } from './components/modals/NewRecordModal';
import { PurchaseStockModal } from './components/modals/PurchaseStockModal';
import { ExpenseModal } from './components/modals/ExpenseModal';
import { IncomeModal } from './components/modals/IncomeModal';
import { EditItemModal } from './components/modals/EditItemModal';
import { OperativeDetailModal } from './components/modals/OperativeDetailModal';
import { OrderDetailModal } from './components/modals/OrderDetailModal';
import { SupportModal } from './components/modals/SupportModal';

// Cada vez que reemplazamos los datos "semilla" (INITIAL_*) por una versión
// más real (ej. los operarios y facturas reales de Coolkids/Imperium), subir
// este número. Si lo guardado en el navegador es de una versión anterior, se
// borra una sola vez para que la app cargue los datos actualizados en vez de
// quedarse con los datos de ejemplo/antiguos que ya se habían guardado ahí.
const CURRENT_DATA_VERSION = 2;
const DATA_VERSION_KEY = 'textilepro_data_version';
const STORAGE_KEYS = [
  'textilepro_inventory',
  'textilepro_operatives',
  'textilepro_production',
  'textilepro_expenses',
  'textilepro_incomes',
  'textilepro_orders',
  'textilepro_notifications',
  'textilepro_task_rates'
];

function ensureFreshSeedData() {
  try {
    const storedVersion = Number(localStorage.getItem(DATA_VERSION_KEY) || '0');
    if (storedVersion < CURRENT_DATA_VERSION) {
      STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
    }
  } catch {
    // localStorage no disponible (ej. modo privado del navegador); no hay nada que migrar.
  }
}

// Se ejecuta una sola vez, al cargar el módulo, antes de que cualquier
// useState intente leer datos guardados previamente.
ensureFreshSeedData();

export function App() {
  // Navigation & Search State
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Data State (with localStorage fallback)
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('textilepro_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [operatives, setOperatives] = useState<Operative[]>(() => {
    const saved = localStorage.getItem('textilepro_operatives');
    return saved ? JSON.parse(saved) : INITIAL_OPERATIVES;
  });

  const [productionHistory, setProductionHistory] = useState<ProductionEntry[]>(() => {
    const saved = localStorage.getItem('textilepro_production');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTION_HISTORY;
  });

  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() => {
    const saved = localStorage.getItem('textilepro_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [incomes, setIncomes] = useState<IncomeRecord[]>(() => {
    const saved = localStorage.getItem('textilepro_incomes');
    return saved ? JSON.parse(saved) : INITIAL_INCOMES;
  });

  const [orders, setOrders] = useState<ActivityOrder[]>(() => {
    const saved = localStorage.getItem('textilepro_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('textilepro_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [taskRates, setTaskRates] = useState<GarmentRateGroup[]>(() => {
    const saved = localStorage.getItem('textilepro_task_rates');
    return saved ? JSON.parse(saved) : INITIAL_TASK_RATES;
  });

  // Modals state
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [selectedOperative, setSelectedOperative] = useState<Operative | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ActivityOrder | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('textilepro_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('textilepro_operatives', JSON.stringify(operatives));
  }, [operatives]);

  useEffect(() => {
    localStorage.setItem('textilepro_production', JSON.stringify(productionHistory));
  }, [productionHistory]);

  useEffect(() => {
    localStorage.setItem('textilepro_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('textilepro_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('textilepro_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('textilepro_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('textilepro_task_rates', JSON.stringify(taskRates));
  }, [taskRates]);

  // Handlers
  const handleSaveGarmentRateGroup = (group: GarmentRateGroup) => {
    setTaskRates(prev => {
      const exists = prev.some(g => g.id === group.id);
      return exists ? prev.map(g => (g.id === group.id ? group : g)) : [...prev, group];
    });
  };

  const handleDeleteGarmentRateGroup = (groupId: string) => {
    setTaskRates(prev => prev.filter(g => g.id !== groupId));
  };

  const handleAddProductionEntry = (entry: Omit<ProductionEntry, 'id'>) => {
    const newId = `PROD-${Date.now().toString().slice(-4)}`;
    const newEntry: ProductionEntry = {
      ...entry,
      id: newId
    };

    setProductionHistory([newEntry, ...productionHistory]);

    // Update operative stats
    setOperatives(prev =>
      prev.map(op => {
        if (op.id === entry.operativeId) {
          return {
            ...op,
            piecesCompleted: op.piecesCompleted + entry.batchQty,
            totalEarnings: op.totalEarnings + entry.totalPay
          };
        }
        return op;
      })
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Lote registrado con éxito',
      message: `${entry.operativeName} completó ${entry.batchQty} piezas de ${entry.taskName} (${entry.garmentType}).`,
      time: 'Hace un momento',
      read: false,
      type: 'success'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleAddStock = (stock: {
    name: string;
    category: 'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios';
    quantity: number;
    unit: string;
    costPerUnit: number;
    reorderPoint: number;
  }) => {
    const existingIndex = inventory.findIndex(
      i => i.name.toLowerCase().trim() === stock.name.toLowerCase().trim()
    );

    let updatedInventory: InventoryItem[];

    if (existingIndex >= 0) {
      const existing = inventory[existingIndex];
      const newStock = existing.currentStock + stock.quantity;
      let newStatus: 'OK' | 'Crítico' | 'Bajo' = 'OK';
      if (newStock <= stock.reorderPoint * 0.6) newStatus = 'Crítico';
      else if (newStock <= stock.reorderPoint) newStatus = 'Bajo';

      const updatedItem: InventoryItem = {
        ...existing,
        currentStock: newStock,
        reorderPoint: stock.reorderPoint,
        costPerUnit: stock.costPerUnit,
        status: newStatus,
        lastUpdated: 'Hoy'
      };

      updatedInventory = [...inventory];
      updatedInventory[existingIndex] = updatedItem;
    } else {
      let newStatus: 'OK' | 'Crítico' | 'Bajo' = 'OK';
      if (stock.quantity <= stock.reorderPoint * 0.6) newStatus = 'Crítico';
      else if (stock.quantity <= stock.reorderPoint) newStatus = 'Bajo';

      const newItem: InventoryItem = {
        id: `INS-${String(inventory.length + 1).padStart(3, '0')}`,
        name: stock.name,
        category: stock.category,
        currentStock: stock.quantity,
        unit: stock.unit,
        reorderPoint: stock.reorderPoint,
        status: newStatus,
        costPerUnit: stock.costPerUnit,
        lastUpdated: 'Hoy'
      };
      updatedInventory = [newItem, ...inventory];
    }

    setInventory(updatedInventory);

    // Also automatically log as an accounting expense
    const totalCost = stock.quantity * stock.costPerUnit;
    const newExpense: ExpenseRecord = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      concept: `Compra de Insumo: ${stock.name}`,
      reference: `Ref: CMP-${stock.quantity}${stock.unit}`,
      category: 'Insumos',
      amount: totalCost,
      date: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setExpenses([newExpense, ...expenses]);

    // Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Inventario Reabastecido',
      message: `Se ingresaron ${stock.quantity} ${stock.unit} de ${stock.name}.`,
      time: 'Hace un momento',
      read: false,
      type: 'info'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventory(prev => prev.map(i => (i.id === updatedItem.id ? updatedItem : i)));
  };

  const handleAddExpense = (expense: Omit<ExpenseRecord, 'id'>) => {
    const newExp: ExpenseRecord = {
      ...expense,
      id: `EXP-${Date.now().toString().slice(-4)}`
    };
    setExpenses([newExp, ...expenses]);
  };

  const handleAddIncome = (income: Omit<IncomeRecord, 'id'>) => {
    const newInc: IncomeRecord = {
      ...income,
      id: `INC-${Date.now().toString().slice(-4)}`
    };
    setIncomes([newInc, ...incomes]);
  };

  const handleAddOrder = (orderData: { client: string; items: string; quantity: number; totalValue: number }) => {
    const now = new Date();
    const entryISO = toISODate(now);
    const dueISO = getDueDateISO(entryISO);
    const newOrder: ActivityOrder = {
      id: `#${(400 + orders.length + 1)}`,
      client: orderData.client,
      items: orderData.items,
      status: 'In Progress',
      quantity: orderData.quantity,
      totalValue: orderData.totalValue,
      date: 'Hoy',
      entryDateISO: entryISO,
      dueDateISO: dueISO,
      dueDate: formatDateEs(dueISO)
    };
    setOrders([newOrder, ...orders]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Nuevo Pedido Creado',
      message: `Pedido ${newOrder.id} para ${newOrder.client} ingresó a taller. Entrega límite: ${newOrder.dueDate} (día 9).`,
      time: 'Hace un momento',
      read: false,
      type: 'info'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending') => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f9f9ff] text-[#151c27]">
      {/* Desktop Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSearchQuery('');
        }}
        onOpenNewRecord={() => setIsNewRecordOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top App Header */}
        <TopHeader
          currentView={currentView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onClearAllNotifications={handleClearAllNotifications}
          onNavigate={(view) => {
            setCurrentView(view);
            setSearchQuery('');
          }}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {currentView === 'dashboard' && (
            <DashboardView
              orders={orders}
              inventory={inventory}
              operatives={operatives}
              productionHistory={productionHistory}
              facturas={INITIAL_FACTURAS}
              totalMonthlyIncome={totalIncome}
              totalMonthlyExpenses={totalExpense}
              onNavigate={(v) => setCurrentView(v)}
              onSelectOrder={(ord) => setSelectedOrder(ord)}
              onSelectOperative={(op) => setSelectedOperative(op)}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'inventory' && (
            <InventoryView
              inventory={inventory}
              searchQuery={searchQuery}
              onOpenPurchaseModal={() => setIsPurchaseModalOpen(true)}
              onEditItem={(item) => setEditingItem(item)}
            />
          )}

          {currentView === 'production' && (
            <ProductionView
              operatives={operatives}
              productionHistory={productionHistory}
              taskRates={taskRates}
              onAddProductionEntry={handleAddProductionEntry}
              onSelectOperative={(op) => setSelectedOperative(op)}
              onSaveGarmentRateGroup={handleSaveGarmentRateGroup}
              onDeleteGarmentRateGroup={handleDeleteGarmentRateGroup}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'facturas' && (
            <FacturasView facturas={INITIAL_FACTURAS} searchQuery={searchQuery} />
          )}

          {currentView === 'accounting' && (
            <AccountingView
              expenses={expenses}
              incomes={incomes}
              onOpenExpenseModal={() => setIsExpenseModalOpen(true)}
              onOpenIncomeModal={() => setIsIncomeModalOpen(true)}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'help' && (
            <HelpCenterView
              onNavigate={(v) => setCurrentView(v)}
              onOpenSupportModal={() => setIsSupportModalOpen(true)}
              onOpenNewRecord={() => setIsNewRecordOpen(true)}
            />
          )}
        </main>

        {/* Mobile Navigation Bar */}
        <MobileBottomNav
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            setSearchQuery('');
          }}
        />
      </div>

      {/* Interactive Global Modals */}
      <NewRecordModal
        isOpen={isNewRecordOpen}
        onClose={() => setIsNewRecordOpen(false)}
        operatives={operatives}
        inventory={inventory}
        taskRates={taskRates}
        onAddOrder={handleAddOrder}
        onAddProduction={(p) => {
          const op = operatives.find(o => o.id === p.operativeId);
          const now = new Date();
          handleAddProductionEntry({
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: 'Hoy',
            dateISO: toISODate(now),
            machineId: p.machineId,
            operativeId: p.operativeId,
            operativeName: op ? op.name : 'Operario',
            garmentType: p.garmentType,
            taskName: p.taskName,
            batchQty: p.batchQty,
            ratePerPiece: p.ratePerPiece,
            totalPay: p.batchQty * p.ratePerPiece
          });
        }}
        onAddStock={handleAddStock}
      />

      <PurchaseStockModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        inventory={inventory}
        onAddStock={handleAddStock}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onAddExpense={handleAddExpense}
      />

      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onAddIncome={handleAddIncome}
      />

      <EditItemModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdateItem={handleUpdateItem}
      />

      <OperativeDetailModal
        isOpen={!!selectedOperative}
        operative={selectedOperative}
        onClose={() => setSelectedOperative(null)}
        productionHistory={productionHistory}
      />

      <OrderDetailModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
}

export default App;
