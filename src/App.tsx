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
  GarmentRateGroup,
  Factura,
  CompanyName,
  PayrollPayment,
  ThreadConsumptionLog
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
import {
  toISODate,
  getPeriodStartISO,
  getQuincenaLabel,
  PayrollPeriod,
  PAYROLL_PERIOD_LABELS,
  getNextPayrollAlert
} from './utils/payroll';
import { getDueDateISO, formatDateEs, addDaysISO } from './utils/deliveryDeadline';
import { getFacturaReconciliation, calculatePayrollAdjustments } from './utils/reconciliation';
import { formatCOP } from './utils/format';

import {
  upsertById,
  removeById,
  fetchInventory,
  upsertInventoryItem,
  bulkInsertInventory,
  subscribeInventory,
  fetchOperatives,
  upsertOperative,
  bulkInsertOperatives,
  subscribeOperatives,
  fetchProductionHistory,
  insertProductionEntry,
  insertProductionEntries,
  bulkInsertProductionHistory,
  markProductionEntriesPaid,
  subscribeProductionHistory,
  fetchPayrollPayments,
  insertPayrollPayment,
  subscribePayrollPayments,
  fetchThreadLogs,
  insertThreadLog,
  subscribeThreadLogs,
  fetchExpenses,
  insertExpense,
  bulkInsertExpenses,
  subscribeExpenses,
  fetchIncomes,
  insertIncome,
  bulkInsertIncomes,
  subscribeIncomes,
  fetchOrders,
  insertOrder,
  bulkInsertOrders,
  updateOrderStatus,
  subscribeOrders,
  fetchNotifications,
  insertNotification,
  bulkInsertNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  subscribeNotifications,
  fetchTaskRates,
  saveGarmentRateGroup,
  deleteGarmentRateGroup,
  bulkInsertTaskRates,
  subscribeTaskRates,
  fetchFacturas,
  insertFactura,
  bulkInsertFacturas,
  updateFacturaFields,
  updateFacturaFieldsByNumero,
  subscribeFacturas,
  facturaRowToPartial
} from './lib/db';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OperativeSelectScreen } from './components/OperativeSelectScreen';
import { OperativeKioskView } from './components/OperativeKioskView';

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

// Trae los datos de una tabla; si viene vacía (primera vez que se conecta
// este taller a la base de datos compartida) la siembra con los datos
// "semilla" (INITIAL_*) para que la app no arranque vacía. Si dos equipos
// se conectan al mismo tiempo y ambos intentan sembrar, el segundo intento
// falla (ids repetidos) y simplemente se vuelve a leer lo que quedó en la
// base de datos.
async function loadOrSeed<T>(
  fetchFn: () => Promise<T[]>,
  seedFn: (items: T[]) => Promise<void>,
  seedData: T[]
): Promise<T[]> {
  const data = await fetchFn();
  if (data.length > 0 || seedData.length === 0) return data;
  try {
    await seedFn(seedData);
    return seedData;
  } catch (err) {
    console.error('Error sembrando datos iniciales:', err);
    try {
      return await fetchFn();
    } catch {
      return data;
    }
  }
}

// Modo de la pantalla compartida del taller:
// 'select'    -> pantalla para elegir qué operario va a registrar (arranque)
// 'operative' -> pantalla simplificada de autoservicio del operario elegido
// 'admin'     -> panel completo (solo tras ingresar el PIN de administrador)
// No se guarda entre recargas a propósito: cada vez que se recarga la
// página en el equipo compartido, vuelve a la pantalla de selección.
type AppMode = 'select' | 'operative' | 'admin';

export function App() {
  // Navigation & Search State
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appMode, setAppMode] = useState<AppMode>('select');
  const [activeOperativeId, setActiveOperativeId] = useState<string | null>(null);

  // Carga inicial desde Supabase: mientras isLoading es true se muestra una
  // pantalla de espera en vez del tablero, para no mostrar datos a medias.
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Primary Data State — ahora vive en Supabase (base de datos compartida);
  // este estado es solo la copia en memoria que ve la pantalla. Se llena al
  // cargar la app (ver useEffect de carga inicial) y se mantiene al día en
  // vivo entre todos los equipos conectados (ver useEffect de suscripciones).
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [productionHistory, setProductionHistory] = useState<ProductionEntry[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  const [orders, setOrders] = useState<ActivityOrder[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [taskRates, setTaskRates] = useState<GarmentRateGroup[]>([]);
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [payrollPayments, setPayrollPayments] = useState<PayrollPayment[]>([]);

  // Histórico de consumo real de hilo (ver utils/threadConsumption.ts). Se
  // usa solo para calcular un promedio de gramos/pieza con el tiempo y dar
  // alertas de stock — nunca para descontar el inventario automáticamente.
  const [threadLogs, setThreadLogs] = useState<ThreadConsumptionLog[]>([]);

  // El aviso de "se acerca pago de nómina" se puede descartar por hoy; se
  // vuelve a mostrar automáticamente al día siguiente.
  const [dismissedPayrollAlertDate, setDismissedPayrollAlertDate] = useState<string | null>(null);

  // Modals state
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [selectedOperative, setSelectedOperative] = useState<Operative | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ActivityOrder | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Carga inicial: trae todo desde Supabase una sola vez al abrir la app
  // (y siembra los datos de ejemplo la primera vez que el taller se conecta
  // a una base de datos vacía).
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        const [
          inventoryData,
          operativesData,
          productionData,
          expensesData,
          incomesData,
          ordersData,
          notificationsData,
          taskRatesData,
          facturasData,
          payrollData,
          threadLogsData
        ] = await Promise.all([
          loadOrSeed(fetchInventory, bulkInsertInventory, INITIAL_INVENTORY),
          loadOrSeed(fetchOperatives, bulkInsertOperatives, INITIAL_OPERATIVES),
          loadOrSeed(fetchProductionHistory, bulkInsertProductionHistory, INITIAL_PRODUCTION_HISTORY),
          loadOrSeed(fetchExpenses, bulkInsertExpenses, INITIAL_EXPENSES),
          loadOrSeed(fetchIncomes, bulkInsertIncomes, INITIAL_INCOMES),
          loadOrSeed(fetchOrders, bulkInsertOrders, INITIAL_ORDERS),
          loadOrSeed(fetchNotifications, bulkInsertNotifications, INITIAL_NOTIFICATIONS),
          loadOrSeed(fetchTaskRates, bulkInsertTaskRates, INITIAL_TASK_RATES),
          loadOrSeed(fetchFacturas, bulkInsertFacturas, INITIAL_FACTURAS),
          fetchPayrollPayments(),
          fetchThreadLogs()
        ]);

        if (cancelled) return;

        setInventory(inventoryData);
        setOperatives(operativesData);
        setProductionHistory(productionData);
        setExpenses(expensesData);
        setIncomes(incomesData);
        setOrders(ordersData);
        setNotifications(notificationsData);
        setTaskRates(taskRatesData);
        setFacturas(facturasData);
        setPayrollPayments(payrollData);
        setThreadLogs(threadLogsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error cargando datos desde Supabase:', err);
        if (!cancelled) {
          setLoadError(
            'No se pudo conectar con la base de datos. Revisa tu conexión a internet e intenta recargar la página.'
          );
          setIsLoading(false);
        }
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // Suscripciones en vivo: cuando otro computador conectado al mismo taller
  // cambia cualquiera de estas tablas, esta pantalla se actualiza sola, sin
  // recargar. Se arman una sola vez (no dependen de estado).
  useEffect(() => {
    const unsubInventory = subscribeInventory(
      (item) => setInventory((prev) => upsertById(prev, item)),
      (id) => setInventory((prev) => removeById(prev, id))
    );

    const unsubOperatives = subscribeOperatives(
      (op) => {
        setOperatives((prev) => upsertById(prev, op));
        setSelectedOperative((prev) => (prev && prev.id === op.id ? op : prev));
      },
      (id) => setOperatives((prev) => removeById(prev, id))
    );

    const unsubProduction = subscribeProductionHistory(
      (entry) => setProductionHistory((prev) => upsertById(prev, entry)),
      (id) => setProductionHistory((prev) => removeById(prev, id))
    );

    const unsubPayroll = subscribePayrollPayments(
      (p) => setPayrollPayments((prev) => upsertById(prev, p)),
      (id) => setPayrollPayments((prev) => removeById(prev, id))
    );

    const unsubThreadLogs = subscribeThreadLogs(
      (log) => setThreadLogs((prev) => upsertById(prev, log)),
      (id) => setThreadLogs((prev) => removeById(prev, id))
    );

    const unsubExpenses = subscribeExpenses(
      (e) => setExpenses((prev) => upsertById(prev, e)),
      (id) => setExpenses((prev) => removeById(prev, id))
    );

    const unsubIncomes = subscribeIncomes(
      (inc) => setIncomes((prev) => upsertById(prev, inc)),
      (id) => setIncomes((prev) => removeById(prev, id))
    );

    const unsubOrders = subscribeOrders(
      (order) => {
        setOrders((prev) => upsertById(prev, order));
        setSelectedOrder((prev) => (prev && prev.id === order.id ? order : prev));
      },
      (id) => setOrders((prev) => removeById(prev, id))
    );

    const unsubNotifications = subscribeNotifications(
      (n) => setNotifications((prev) => upsertById(prev, n)),
      (id) => setNotifications((prev) => removeById(prev, id))
    );

    // Prendas/labores cambian poco — ante cualquier cambio simplemente se
    // vuelve a traer el árbol completo en vez de fusionarlo evento a evento.
    const unsubTaskRates = subscribeTaskRates(() => {
      fetchTaskRates()
        .then(setTaskRates)
        .catch((err) => console.error('Error actualizando prendas/tarifas:', err));
    });

    const unsubFacturas = subscribeFacturas(
      (row) => {
        setFacturas((prev) => {
          const idx = prev.findIndex((f) => f.id === row.id);
          if (idx === -1) {
            // Factura nueva creada desde otro equipo: esta suscripción solo
            // trae la tabla plana, sin funciones/asignaciones. Se agrega con
            // listas vacías; se completan al recargar la página.
            const partial = facturaRowToPartial(row);
            return [{ ...partial, funciones: [], asignaciones: [] }, ...prev];
          }
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ...facturaRowToPartial(row) };
          return copy;
        });
      },
      (id) => setFacturas((prev) => removeById(prev, id))
    );

    return () => {
      unsubInventory();
      unsubOperatives();
      unsubProduction();
      unsubPayroll();
      unsubThreadLogs();
      unsubExpenses();
      unsubIncomes();
      unsubOrders();
      unsubNotifications();
      unsubTaskRates();
      unsubFacturas();
    };
  }, []);

  const handleAddThreadConsumptionLog = (log: Omit<ThreadConsumptionLog, 'id'>) => {
    const newLog: ThreadConsumptionLog = { id: `HLOG-${Date.now()}`, ...log };
    setThreadLogs((prev) => [newLog, ...prev]);
    insertThreadLog(newLog).catch((err) => console.error('Error guardando consumo de hilo:', err));
  };

  // Handlers
  const handleSaveGarmentRateGroup = (group: GarmentRateGroup) => {
    setTaskRates((prev) => {
      const exists = prev.some((g) => g.id === group.id);
      return exists ? prev.map((g) => (g.id === group.id ? group : g)) : [...prev, group];
    });
    saveGarmentRateGroup(group).catch((err) => console.error('Error guardando prenda/tarifas:', err));
  };

  const handleDeleteGarmentRateGroup = (groupId: string) => {
    setTaskRates((prev) => prev.filter((g) => g.id !== groupId));
    deleteGarmentRateGroup(groupId).catch((err) => console.error('Error borrando prenda:', err));
  };

  const handleAddProductionEntry = (entry: Omit<ProductionEntry, 'id'>) => {
    const newId = `PROD-${Date.now().toString().slice(-4)}`;
    const newEntry: ProductionEntry = {
      ...entry,
      id: newId
    };

    setProductionHistory((prev) => [newEntry, ...prev]);

    // Update operative stats
    let updatedOperative: Operative | null = null;
    setOperatives((prev) =>
      prev.map((op) => {
        if (op.id === entry.operativeId) {
          updatedOperative = {
            ...op,
            piecesCompleted: op.piecesCompleted + entry.batchQty,
            totalEarnings: op.totalEarnings + entry.totalPay
          };
          return updatedOperative;
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
    setNotifications((prev) => [newNotif, ...prev]);

    insertProductionEntry(newEntry).catch((err) => console.error('Error guardando producción:', err));
    if (updatedOperative) {
      upsertOperative(updatedOperative).catch((err) => console.error('Error actualizando operario:', err));
    }
    insertNotification(newNotif).catch((err) => console.error('Error guardando notificación:', err));
  };

  const handleAddStock = (stock: {
    name: string;
    category: 'Hilos' | 'Agujas' | 'Repuestos';
    quantity: number;
    unit: string;
    costPerUnit: number;
    reorderPoint: number;
  }) => {
    const existingIndex = inventory.findIndex(
      i => i.name.toLowerCase().trim() === stock.name.toLowerCase().trim()
    );

    let updatedInventory: InventoryItem[];
    let changedItem: InventoryItem;

    if (existingIndex >= 0) {
      const existing = inventory[existingIndex];
      const newStock = existing.currentStock + stock.quantity;
      let newStatus: 'OK' | 'Crítico' | 'Bajo' = 'OK';
      if (newStock <= stock.reorderPoint * 0.6) newStatus = 'Crítico';
      else if (newStock <= stock.reorderPoint) newStatus = 'Bajo';

      changedItem = {
        ...existing,
        currentStock: newStock,
        reorderPoint: stock.reorderPoint,
        costPerUnit: stock.costPerUnit,
        status: newStatus,
        lastUpdated: 'Hoy'
      };

      updatedInventory = [...inventory];
      updatedInventory[existingIndex] = changedItem;
    } else {
      let newStatus: 'OK' | 'Crítico' | 'Bajo' = 'OK';
      if (stock.quantity <= stock.reorderPoint * 0.6) newStatus = 'Crítico';
      else if (stock.quantity <= stock.reorderPoint) newStatus = 'Bajo';

      changedItem = {
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
      updatedInventory = [changedItem, ...inventory];
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
    setExpenses((prev) => [newExpense, ...prev]);

    // Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Inventario Reabastecido',
      message: `Se ingresaron ${stock.quantity} ${stock.unit} de ${stock.name}.`,
      time: 'Hace un momento',
      read: false,
      type: 'info'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    upsertInventoryItem(changedItem).catch((err) => console.error('Error guardando insumo:', err));
    insertExpense(newExpense).catch((err) => console.error('Error guardando gasto:', err));
    insertNotification(newNotif).catch((err) => console.error('Error guardando notificación:', err));
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventory((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    upsertInventoryItem(updatedItem).catch((err) => console.error('Error actualizando insumo:', err));
  };

  // Marca/desmarca un operario como inactivo (salió del taller o está de
  // vacaciones) sin borrar su historial de pagos ni de producción. Como
  // solo entran a la pantalla de autoservicio los operarios activos, esto
  // también lo saca de la lista de selección compartida.
  const handleToggleOperativeActive = (operativeId: string) => {
    let toggledOperative: Operative | null = null;
    setOperatives((prev) =>
      prev.map((op) => {
        if (op.id !== operativeId) return op;
        toggledOperative = { ...op, active: !op.active };
        return toggledOperative;
      })
    );
    setSelectedOperative((prev) =>
      prev && prev.id === operativeId ? { ...prev, active: !prev.active } : prev
    );
    if (toggledOperative) {
      upsertOperative(toggledOperative).catch((err) => console.error('Error actualizando operario:', err));
    }
  };

  // Guarda el número de WhatsApp del operario (para enviarle el recibo de
  // pago directo a su chat).
  const handleUpdateOperativePhone = (operativeId: string, phone: string) => {
    let updatedOperative: Operative | null = null;
    setOperatives((prev) =>
      prev.map((op) => {
        if (op.id !== operativeId) return op;
        updatedOperative = { ...op, phone };
        return updatedOperative;
      })
    );
    setSelectedOperative((prev) => (prev && prev.id === operativeId ? { ...prev, phone } : prev));
    if (updatedOperative) {
      upsertOperative(updatedOperative).catch((err) => console.error('Error actualizando teléfono:', err));
    }
  };

  // Paga a un operario todo lo que tiene pendiente dentro del período
  // elegido (día/semana/quincena/mes). Genera el registro de pago (base del
  // recibo) y marca esos registros de producción como ya pagados, para que
  // dejen de contar en "Nómina Pendiente".
  const handlePayOperativePeriod = (operativeId: string, period: PayrollPeriod): PayrollPayment | null => {
    const startISO = getPeriodStartISO(period);
    const todayISO = toISODate(new Date());
    const operative = operatives.find((o) => o.id === operativeId);
    if (!operative) return null;

    const entriesToPay = productionHistory.filter(
      (e) => e.operativeId === operativeId && !e.paid && e.dateISO >= startISO && e.dateISO <= todayISO
    );
    if (entriesToPay.length === 0) return null;

    const totalQty = entriesToPay.reduce((sum, e) => sum + e.batchQty, 0);
    const totalPay = entriesToPay.reduce((sum, e) => sum + e.totalPay, 0);
    const paymentId = `PAY-${Date.now().toString().slice(-6)}`;

    // El recibo solo muestra a qué quincena de nómina pertenece (1-15 o
    // 16-fin de mes) — la fecha exacta en la que se pagó ya queda registrada
    // aparte en "Fecha de pago", así que no hace falta repetirla aquí.
    const periodLabel = getQuincenaLabel(todayISO);

    const newPayment: PayrollPayment = {
      id: paymentId,
      operativeId,
      operativeName: operative.name,
      periodLabel,
      periodStartISO: startISO,
      periodEndISO: todayISO,
      totalQty,
      totalPay,
      paidDateISO: todayISO
    };

    setPayrollPayments((prev) => [newPayment, ...prev]);

    const paidIds = new Set<string>(entriesToPay.map((e) => e.id));
    setProductionHistory((prev) =>
      prev.map((e) => (paidIds.has(e.id) ? { ...e, paid: true, paymentId } : e))
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Nómina pagada',
      message: `Se pagó ${formatCOP(totalPay)} a ${operative.name} (${PAYROLL_PERIOD_LABELS[period]}). Ya puedes imprimir o enviar el recibo.`,
      time: 'Hace un momento',
      read: false,
      type: 'success'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    insertPayrollPayment(newPayment).catch((err) => console.error('Error guardando pago de nómina:', err));
    markProductionEntriesPaid(Array.from(paidIds), paymentId).catch((err) =>
      console.error('Error marcando registros como pagados:', err)
    );
    insertNotification(newNotif).catch((err) => console.error('Error guardando notificación:', err));

    return newPayment;
  };

  const handleDismissPayrollAlert = () => {
    setDismissedPayrollAlertDate(toISODate(new Date()));
  };

  const handleAddExpense = (expense: Omit<ExpenseRecord, 'id'>) => {
    const newExp: ExpenseRecord = {
      ...expense,
      id: `EXP-${Date.now().toString().slice(-4)}`
    };
    setExpenses((prev) => [newExp, ...prev]);
    insertExpense(newExp).catch((err) => console.error('Error guardando gasto:', err));
  };

  const handleAddIncome = (income: Omit<IncomeRecord, 'id'>) => {
    const newInc: IncomeRecord = {
      ...income,
      id: `INC-${Date.now().toString().slice(-4)}`
    };
    setIncomes((prev) => [newInc, ...prev]);
    insertIncome(newInc).catch((err) => console.error('Error guardando ingreso:', err));
  };

  const handleAddOrder = (orderData: {
    client: string;
    empresa: CompanyName;
    items: string;
    quantity: number;
    totalValue: number;
  }) => {
    const now = new Date();
    const entryISO = toISODate(now);
    const dueISO = getDueDateISO(entryISO);
    const facturaNumero = `PED-${orders.length + facturas.length + 1}`;

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
      dueDate: formatDateEs(dueISO),
      facturaNumero
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Un pedido nuevo es, a la vez, su propia factura: misma cantidad
    // esperada, misma fecha límite, y desde aquí arranca el seguimiento de
    // conciliación (vs. lo que registren los operarios) y de cobro al
    // cliente (10 días después de la entrega real).
    const newFactura: Factura = {
      id: `FAC-${Date.now()}`,
      facturaNumero,
      empresa: orderData.empresa,
      descripcion: orderData.items,
      cantidad: orderData.quantity,
      valorUnitario: orderData.quantity > 0 ? orderData.totalValue / orderData.quantity : null,
      talla: null,
      totalFactura: orderData.totalValue,
      funciones: [],
      asignaciones: [],
      entryDateISO: entryISO,
      dueDateISO: dueISO,
      status: 'In Progress',
      paymentStatus: 'pendiente'
    };
    setFacturas((prev) => [newFactura, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Nuevo Pedido Creado',
      message: `Pedido ${newOrder.id} (Factura ${facturaNumero}) para ${newOrder.client} ingresó a taller. Entrega límite: ${newOrder.dueDate} (día 9).`,
      time: 'Hace un momento',
      read: false,
      type: 'info'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    insertOrder(newOrder).catch((err) => console.error('Error guardando pedido:', err));
    insertFactura(newFactura).catch((err) => console.error('Error guardando factura:', err));
    insertNotification(newNotif).catch((err) => console.error('Error guardando notificación:', err));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending') => {
    const order = orders.find((o) => o.id === orderId);
    const nowISO = toISODate(new Date());
    const wasNotDelivered = order?.status !== 'Delivered';

    setOrders((prev) =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    updateOrderStatus(orderId, newStatus).catch((err) => console.error('Error actualizando estado del pedido:', err));

    // Refleja el mismo cambio de estado en la factura ligada a este pedido,
    // para que "Pedidos" y "Facturas" siempre muestren la misma información.
    if (order?.facturaNumero) {
      const linkedFactura = facturas.find((f) => f.facturaNumero === order.facturaNumero);
      let facturaPatch: Partial<Factura>;

      if (newStatus === 'Delivered' && wasNotDelivered) {
        const paymentExpected = addDaysISO(nowISO, 10);
        facturaPatch = {
          status: newStatus,
          actualDeliveryDateISO: nowISO,
          paymentExpectedDateISO: paymentExpected,
          paymentStatus: linkedFactura?.paymentStatus || 'pendiente'
        };
      } else {
        facturaPatch = { status: newStatus };
      }

      setFacturas((prev) =>
        prev.map((f) => (f.facturaNumero === order.facturaNumero ? { ...f, ...facturaPatch } : f))
      );

      updateFacturaFieldsByNumero(order.facturaNumero, facturaPatch).catch((err) =>
        console.error('Error actualizando factura ligada:', err)
      );
    }
  };

  // Marca una factura (con seguimiento en vivo) como entregada al cliente,
  // desde la vista de Facturas. Calcula la fecha esperada de pago (10 días
  // después de la entrega real) y refleja lo mismo en el pedido ligado.
  const handleMarkFacturaDelivered = (facturaId: string) => {
    const factura = facturas.find((f) => f.id === facturaId);
    if (!factura) return;
    const nowISO = toISODate(new Date());
    const paymentExpected = addDaysISO(nowISO, 10);

    const patch: Partial<Factura> = {
      status: 'Delivered',
      actualDeliveryDateISO: nowISO,
      paymentExpectedDateISO: paymentExpected,
      paymentStatus: factura.paymentStatus || 'pendiente'
    };

    setFacturas((prev) => prev.map((f) => (f.id === facturaId ? { ...f, ...patch } : f)));

    if (factura.facturaNumero) {
      setOrders((prev) =>
        prev.map((o) => (o.facturaNumero === factura.facturaNumero ? { ...o, status: 'Delivered' } : o))
      );
    }

    updateFacturaFields(facturaId, patch).catch((err) => console.error('Error actualizando factura:', err));

    const linkedOrder = orders.find((o) => o.facturaNumero === factura.facturaNumero);
    if (linkedOrder) {
      updateOrderStatus(linkedOrder.id, 'Delivered').catch((err) =>
        console.error('Error actualizando pedido ligado:', err)
      );
    }
  };

  // El cliente pagó la factura (normalmente 10 días después de la entrega).
  const handleMarkFacturaPaid = (facturaId: string) => {
    const nowISO = toISODate(new Date());
    const patch: Partial<Factura> = { paymentStatus: 'cobrado', paymentReceivedDateISO: nowISO };

    setFacturas((prev) => prev.map((f) => (f.id === facturaId ? { ...f, ...patch } : f)));
    updateFacturaFields(facturaId, patch).catch((err) => console.error('Error marcando factura como pagada:', err));
  };

  // Compara lo que dice la factura del cliente contra lo que los operarios
  // registraron con ese mismo número en Producción. Si no coincide, reparte
  // proporcionalmente el ajuste de nómina entre quienes trabajaron esa
  // factura (sin borrar el historial original) y avisa al jefe qué se ajustó.
  const handleReconcileFactura = (facturaId: string) => {
    const factura = facturas.find((f) => f.id === facturaId);
    if (!factura) return;

    const reconciliation = getFacturaReconciliation(factura, productionHistory);
    const nowISO = toISODate(new Date());

    if (reconciliation.matches || reconciliation.registeredQty === 0) {
      const patch: Partial<Factura> = {
        reconciled: true,
        reconciledAt: nowISO,
        reconciliationNote:
          reconciliation.registeredQty === 0
            ? 'Todavía no hay registros de producción con este número de factura.'
            : 'Las cantidades coinciden. No fue necesario ajustar la nómina.'
      };
      setFacturas((prev) => prev.map((f) => (f.id === facturaId ? { ...f, ...patch } : f)));
      updateFacturaFields(facturaId, patch).catch((err) => console.error('Error guardando conciliación:', err));
      return;
    }

    const adjustments = calculatePayrollAdjustments(reconciliation);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const adjustmentEntries: ProductionEntry[] = adjustments.map((adj, i) => ({
      id: `ADJ-${Date.now().toString().slice(-6)}-${i}`,
      time: timeStr,
      date: 'Hoy',
      dateISO: nowISO,
      machineId: 'N/A',
      operativeId: adj.operativeId,
      operativeName: adj.operativeName,
      garmentType: factura.descripcion,
      taskName: 'Ajuste de Nómina (Conciliación)',
      batchQty: adj.qtyAdjustment,
      ratePerPiece: adj.ratePerPiece,
      totalPay: adj.payAdjustment,
      facturaRef: String(factura.facturaNumero)
    }));

    const updatedOperatives: Operative[] = [];
    if (adjustmentEntries.length > 0) {
      setProductionHistory((prev) => [...adjustmentEntries, ...prev]);

      setOperatives((prev) =>
        prev.map((op) => {
          const adj = adjustments.find((a) => a.operativeId === op.id);
          if (!adj) return op;
          const updatedOp: Operative = {
            ...op,
            piecesCompleted: op.piecesCompleted + adj.qtyAdjustment,
            totalEarnings: op.totalEarnings + adj.payAdjustment
          };
          updatedOperatives.push(updatedOp);
          return updatedOp;
        })
      );
    }

    const noteLines = adjustments
      .map(
        (a) =>
          `${a.operativeName}: ${a.qtyAdjustment > 0 ? '+' : ''}${a.qtyAdjustment} piezas (${formatCOP(a.payAdjustment)})`
      )
      .join(' · ');

    const facturaPatch: Partial<Factura> = {
      reconciled: true,
      reconciledAt: nowISO,
      reconciliationNote:
        noteLines ||
        `Se registraron ${reconciliation.registeredQty} piezas pero la factura indica ${reconciliation.expectedQty}. No se pudo repartir el ajuste (sin registros).`
    };

    setFacturas((prev) => prev.map((f) => (f.id === facturaId ? { ...f, ...facturaPatch } : f)));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Nómina ajustada — Factura ${factura.facturaNumero}`,
      message:
        `Se registraron ${reconciliation.registeredQty} piezas pero la factura indica ${reconciliation.expectedQty}. ` +
        (noteLines ? `Ajuste aplicado: ${noteLines}.` : 'No se pudo repartir el ajuste entre operarios.'),
      time: 'Hace un momento',
      read: false,
      type: 'warning'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    if (adjustmentEntries.length > 0) {
      insertProductionEntries(adjustmentEntries).catch((err) =>
        console.error('Error guardando ajustes de nómina:', err)
      );
      updatedOperatives.forEach((op) => {
        upsertOperative(op).catch((err) => console.error('Error actualizando operario:', err));
      });
    }
    updateFacturaFields(facturaId, facturaPatch).catch((err) => console.error('Error guardando conciliación:', err));
    insertNotification(newNotif).catch((err) => console.error('Error guardando notificación:', err));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    markNotificationRead(id).catch((err) => console.error('Error marcando notificación como leída:', err));
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    markAllNotificationsRead().catch((err) => console.error('Error marcando notificaciones como leídas:', err));
  };

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  const payrollAlert = getNextPayrollAlert();
  const showPayrollAlert = payrollAlert.show && dismissedPayrollAlertDate !== toISODate(new Date());

  // Mientras se trae la información desde Supabase, se muestra una pantalla
  // de espera simple en vez del tablero (que estaría vacío/a medio llenar).
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#fefafb] px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#f797bd] border-t-[#ca2164] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#494552]">Cargando datos del taller…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#fefafb] px-4">
        <div className="text-center max-w-sm">
          <p className="text-sm text-[#494552] mb-3">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-bold text-[#ca2164] underline cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Pantalla compartida del taller: primero se elige quién va a registrar.
  if (appMode === 'select') {
    return (
      <OperativeSelectScreen
        operatives={operatives}
        onSelectOperative={(op) => {
          setActiveOperativeId(op.id);
          setAppMode('operative');
        }}
        onAdminAccess={() => setAppMode('admin')}
      />
    );
  }

  // Pantalla de autoservicio: el operario elegido registra su propia
  // producción sin ver el resto del programa.
  if (appMode === 'operative') {
    const activeOperative = operatives.find((o) => o.id === activeOperativeId);
    if (!activeOperative) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#fefafb] px-4">
          <div className="text-center">
            <p className="text-sm text-[#494552] mb-3">No se encontró ese operario.</p>
            <button
              onClick={() => {
                setActiveOperativeId(null);
                setAppMode('select');
              }}
              className="text-sm font-bold text-[#ca2164] underline cursor-pointer"
            >
              Volver a la selección
            </button>
          </div>
        </div>
      );
    }
    return (
      <OperativeKioskView
        operative={activeOperative}
        productionHistory={productionHistory}
        taskRates={taskRates}
        inventory={inventory}
        threadLogs={threadLogs}
        onAddProductionEntry={handleAddProductionEntry}
        onExit={() => {
          setActiveOperativeId(null);
          setAppMode('select');
        }}
      />
    );
  }

  // appMode === 'admin' -> panel completo de gestión del taller.
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fefafb] text-[#151c27]">
      {/* Desktop Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSearchQuery('');
        }}
        onOpenNewRecord={() => setIsNewRecordOpen(true)}
        onExitToKiosk={() => setAppMode('select')}
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

        {/* Aviso: se acerca el pago de nómina (días 14 y 29 de cada mes) */}
        {showPayrollAlert && (
          <div className="bg-[#ca2164] text-white px-4 md:px-8 py-2.5 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[18px] shrink-0">payments</span>
              <p className="text-xs font-semibold truncate">
                {payrollAlert.label} — {formatDateEs(payrollAlert.payDateISO)}. Revisa "Producción y Nómina" para pagar y generar los recibos.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCurrentView('production')}
                className="text-[11px] font-bold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md cursor-pointer transition-colors"
              >
                Ir a Nómina
              </button>
              <button
                onClick={handleDismissPayrollAlert}
                title="Ocultar por hoy"
                className="text-white/70 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {currentView === 'dashboard' && (
            <DashboardView
              orders={orders}
              inventory={inventory}
              operatives={operatives}
              productionHistory={productionHistory}
              facturas={facturas}
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
              taskRates={taskRates}
              threadLogs={threadLogs}
              searchQuery={searchQuery}
              onOpenPurchaseModal={() => setIsPurchaseModalOpen(true)}
              onEditItem={(item) => setEditingItem(item)}
              onAddThreadConsumptionLog={handleAddThreadConsumptionLog}
            />
          )}

          {currentView === 'production' && (
            <ProductionView
              operatives={operatives}
              productionHistory={productionHistory}
              taskRates={taskRates}
              payrollPayments={payrollPayments}
              inventory={inventory}
              onSelectOperative={(op) => setSelectedOperative(op)}
              onSaveGarmentRateGroup={handleSaveGarmentRateGroup}
              onDeleteGarmentRateGroup={handleDeleteGarmentRateGroup}
              onPayOperativePeriod={handlePayOperativePeriod}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'facturas' && (
            <FacturasView
              facturas={facturas}
              productionHistory={productionHistory}
              searchQuery={searchQuery}
              onMarkDelivered={handleMarkFacturaDelivered}
              onMarkPaid={handleMarkFacturaPaid}
              onReconcile={handleReconcileFactura}
            />
          )}

          {currentView === 'accounting' && (
            <AccountingView
              expenses={expenses}
              incomes={incomes}
              operatives={operatives}
              facturas={facturas}
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
        onToggleActive={handleToggleOperativeActive}
        onUpdatePhone={handleUpdateOperativePhone}
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
