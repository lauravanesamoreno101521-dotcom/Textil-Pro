// Capa de acceso a datos: todas las funciones que leen y escriben en
// Supabase viven aquí. App.tsx no habla con Supabase directamente — solo
// llama a estas funciones y guarda el resultado en su estado de React.
//
// Cada tipo de dato tiene:
//   - un "mapper" fromRow/toRow que traduce entre el nombre de columna en
//     la base de datos (snake_case, ej. "current_stock") y el campo de la
//     app (camelCase, ej. "currentStock")
//   - funciones fetchX / insertX / updateX para leer y escribir
//
// Además, subscribeTable() deja una "suscripción en vivo": cuando CUALQUIER
// computador conectado cambia una tabla, todos los demás lo reciben al
// instante sin necesidad de recargar la página.
import { supabase } from './supabaseClient';
import {
  InventoryItem,
  Operative,
  ProductionEntry,
  PayrollPayment,
  ExpenseRecord,
  IncomeRecord,
  ActivityOrder,
  NotificationItem,
  GarmentRateGroup,
  TaskRate,
  ThreadConsumptionLog,
  Factura,
  FacturaFuncion,
  FacturaAsignacion
} from '../types';

// ============================================================================
// Utilidades genéricas
// ============================================================================

// Reemplaza (por id) o agrega al principio un elemento dentro de una lista
// ya cargada en el estado de React — es lo que usan tanto las respuestas de
// escritura como los eventos en vivo para actualizar la pantalla.
export function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((i) => i.id === item.id);
  if (idx === -1) return [item, ...list];
  const copy = [...list];
  copy[idx] = item;
  return copy;
}

export function removeById<T extends { id: string }>(list: T[], id: string): T[] {
  return list.filter((i) => i.id !== id);
}

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

// Se suscribe a los cambios en vivo de una tabla. Devuelve una función para
// cancelar la suscripción (llamarla en el cleanup de un useEffect).
function subscribeTable<Row extends object>(
  table: string,
  onChange: (event: RealtimeEvent, row: Row, oldRow: Row | null) => void
): () => void {
  const channel = supabase
    .channel(`realtime:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => {
        const event = payload.eventType as RealtimeEvent;
        onChange(event, (payload.new ?? {}) as Row, (payload.old ?? null) as Row | null);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ============================================================================
// Inventario (Hilos, Agujas, Repuestos)
// ============================================================================
interface InventoryRow {
  id: string;
  name: string;
  category: 'Hilos' | 'Agujas' | 'Repuestos';
  current_stock: number;
  unit: string;
  reorder_point: number;
  status: 'OK' | 'Crítico' | 'Bajo';
  cost_per_unit: number | null;
  last_updated: string | null;
}

function inventoryFromRow(row: InventoryRow): InventoryItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    currentStock: row.current_stock,
    unit: row.unit,
    reorderPoint: row.reorder_point,
    status: row.status,
    costPerUnit: row.cost_per_unit ?? undefined,
    lastUpdated: row.last_updated ?? undefined
  };
}

function inventoryToRow(item: InventoryItem): InventoryRow {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    current_stock: item.currentStock,
    unit: item.unit,
    reorder_point: item.reorderPoint,
    status: item.status,
    cost_per_unit: item.costPerUnit ?? null,
    last_updated: item.lastUpdated ?? null
  };
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  const { data, error } = await supabase.from('inventory_items').select('*').order('name');
  if (error) throw error;
  return (data as InventoryRow[]).map(inventoryFromRow);
}

export async function upsertInventoryItem(item: InventoryItem): Promise<void> {
  const { error } = await supabase.from('inventory_items').upsert(inventoryToRow(item));
  if (error) throw error;
}

export async function bulkInsertInventory(items: InventoryItem[]): Promise<void> {
  if (items.length === 0) return;
  const { error } = await supabase.from('inventory_items').insert(items.map(inventoryToRow));
  if (error) throw error;
}

export function subscribeInventory(
  onUpsert: (item: InventoryItem) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<InventoryRow>('inventory_items', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as InventoryRow).id);
    else onUpsert(inventoryFromRow(row));
  });
}

// ============================================================================
// Operarios
// ============================================================================
interface OperativeRow {
  id: string;
  name: string;
  avatar: string | null;
  shift: string | null;
  active: boolean;
  specialty: string | null;
  pieces_completed: number;
  rate_per_piece: number;
  total_earnings: number;
  assigned_machine: string | null;
  phone: string | null;
}

function operativeFromRow(row: OperativeRow): Operative {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar ?? '',
    shift: row.shift ?? '',
    active: row.active,
    specialty: row.specialty ?? '',
    piecesCompleted: row.pieces_completed,
    ratePerPiece: row.rate_per_piece,
    totalEarnings: row.total_earnings,
    assignedMachine: row.assigned_machine ?? undefined,
    phone: row.phone ?? undefined
  };
}

function operativeToRow(op: Operative): OperativeRow {
  return {
    id: op.id,
    name: op.name,
    avatar: op.avatar ?? null,
    shift: op.shift ?? null,
    active: op.active,
    specialty: op.specialty ?? null,
    pieces_completed: op.piecesCompleted,
    rate_per_piece: op.ratePerPiece,
    total_earnings: op.totalEarnings,
    assigned_machine: op.assignedMachine ?? null,
    phone: op.phone ?? null
  };
}

export async function fetchOperatives(): Promise<Operative[]> {
  const { data, error } = await supabase.from('operatives').select('*').order('name');
  if (error) throw error;
  return (data as OperativeRow[]).map(operativeFromRow);
}

export async function upsertOperative(op: Operative): Promise<void> {
  const { error } = await supabase.from('operatives').upsert(operativeToRow(op));
  if (error) throw error;
}

export async function bulkInsertOperatives(ops: Operative[]): Promise<void> {
  if (ops.length === 0) return;
  const { error } = await supabase.from('operatives').insert(ops.map(operativeToRow));
  if (error) throw error;
}

export function subscribeOperatives(
  onUpsert: (op: Operative) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<OperativeRow>('operatives', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as OperativeRow).id);
    else onUpsert(operativeFromRow(row));
  });
}

// ============================================================================
// Producción
// ============================================================================
interface ProductionRow {
  id: string;
  time: string | null;
  date: string | null;
  date_iso: string;
  machine_id: string | null;
  operative_id: string | null;
  operative_name: string | null;
  garment_type: string | null;
  task_name: string | null;
  batch_qty: number;
  rate_per_piece: number;
  total_pay: number;
  factura_ref: string | null;
  paid: boolean;
  payment_id: string | null;
}

function productionFromRow(row: ProductionRow): ProductionEntry {
  return {
    id: row.id,
    time: row.time ?? '',
    date: row.date ?? '',
    dateISO: row.date_iso,
    machineId: row.machine_id ?? '',
    operativeId: row.operative_id ?? '',
    operativeName: row.operative_name ?? '',
    garmentType: row.garment_type ?? '',
    taskName: row.task_name ?? '',
    batchQty: row.batch_qty,
    ratePerPiece: row.rate_per_piece,
    totalPay: row.total_pay,
    facturaRef: row.factura_ref ?? undefined,
    paid: row.paid,
    paymentId: row.payment_id ?? undefined
  };
}

function productionToRow(entry: ProductionEntry): ProductionRow {
  return {
    id: entry.id,
    time: entry.time ?? null,
    date: entry.date ?? null,
    date_iso: entry.dateISO,
    machine_id: entry.machineId ?? null,
    operative_id: entry.operativeId ?? null,
    operative_name: entry.operativeName ?? null,
    garment_type: entry.garmentType ?? null,
    task_name: entry.taskName ?? null,
    batch_qty: entry.batchQty,
    rate_per_piece: entry.ratePerPiece,
    total_pay: entry.totalPay,
    factura_ref: entry.facturaRef ?? null,
    paid: entry.paid ?? false,
    payment_id: entry.paymentId ?? null
  };
}

export async function fetchProductionHistory(): Promise<ProductionEntry[]> {
  const { data, error } = await supabase
    .from('production_entries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as ProductionRow[]).map(productionFromRow);
}

export async function insertProductionEntry(entry: ProductionEntry): Promise<void> {
  const { error } = await supabase.from('production_entries').insert(productionToRow(entry));
  if (error) throw error;
}

export async function insertProductionEntries(entries: ProductionEntry[]): Promise<void> {
  if (entries.length === 0) return;
  const { error } = await supabase.from('production_entries').insert(entries.map(productionToRow));
  if (error) throw error;
}

export async function bulkInsertProductionHistory(entries: ProductionEntry[]): Promise<void> {
  if (entries.length === 0) return;
  const { error } = await supabase.from('production_entries').insert(entries.map(productionToRow));
  if (error) throw error;
}

// Marca un grupo de registros como pagados (parte de handlePayOperativePeriod).
export async function markProductionEntriesPaid(ids: string[], paymentId: string): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase
    .from('production_entries')
    .update({ paid: true, payment_id: paymentId })
    .in('id', ids);
  if (error) throw error;
}

export function subscribeProductionHistory(
  onUpsert: (entry: ProductionEntry) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<ProductionRow>('production_entries', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as ProductionRow).id);
    else onUpsert(productionFromRow(row));
  });
}

// ============================================================================
// Pagos de Nómina
// ============================================================================
interface PayrollPaymentRow {
  id: string;
  operative_id: string | null;
  operative_name: string | null;
  period_label: string | null;
  period_start_iso: string | null;
  period_end_iso: string | null;
  total_qty: number;
  total_pay: number;
  paid_date_iso: string | null;
}

function payrollPaymentFromRow(row: PayrollPaymentRow): PayrollPayment {
  return {
    id: row.id,
    operativeId: row.operative_id ?? '',
    operativeName: row.operative_name ?? '',
    periodLabel: row.period_label ?? '',
    periodStartISO: row.period_start_iso ?? '',
    periodEndISO: row.period_end_iso ?? '',
    totalQty: row.total_qty,
    totalPay: row.total_pay,
    paidDateISO: row.paid_date_iso ?? ''
  };
}

function payrollPaymentToRow(p: PayrollPayment): PayrollPaymentRow {
  return {
    id: p.id,
    operative_id: p.operativeId ?? null,
    operative_name: p.operativeName ?? null,
    period_label: p.periodLabel ?? null,
    period_start_iso: p.periodStartISO || null,
    period_end_iso: p.periodEndISO || null,
    total_qty: p.totalQty,
    total_pay: p.totalPay,
    paid_date_iso: p.paidDateISO || null
  };
}

export async function fetchPayrollPayments(): Promise<PayrollPayment[]> {
  const { data, error } = await supabase
    .from('payroll_payments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as PayrollPaymentRow[]).map(payrollPaymentFromRow);
}

export async function insertPayrollPayment(payment: PayrollPayment): Promise<void> {
  const { error } = await supabase.from('payroll_payments').insert(payrollPaymentToRow(payment));
  if (error) throw error;
}

export function subscribePayrollPayments(
  onUpsert: (p: PayrollPayment) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<PayrollPaymentRow>('payroll_payments', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as PayrollPaymentRow).id);
    else onUpsert(payrollPaymentFromRow(row));
  });
}

// ============================================================================
// Consumo real de hilo
// ============================================================================
interface ThreadLogRow {
  id: string;
  hilo_item_id: string;
  garment_type: string | null;
  task_name: string | null;
  grams_used: number;
  pieces_produced: number;
  date_iso: string | null;
  note: string | null;
}

function threadLogFromRow(row: ThreadLogRow): ThreadConsumptionLog {
  return {
    id: row.id,
    hiloItemId: row.hilo_item_id,
    garmentType: row.garment_type ?? '',
    taskName: row.task_name ?? '',
    gramsUsed: row.grams_used,
    piecesProduced: row.pieces_produced,
    dateISO: row.date_iso ?? '',
    note: row.note ?? undefined
  };
}

function threadLogToRow(log: ThreadConsumptionLog): ThreadLogRow {
  return {
    id: log.id,
    hilo_item_id: log.hiloItemId,
    garment_type: log.garmentType ?? null,
    task_name: log.taskName ?? null,
    grams_used: log.gramsUsed,
    pieces_produced: log.piecesProduced,
    date_iso: log.dateISO || null,
    note: log.note ?? null
  };
}

export async function fetchThreadLogs(): Promise<ThreadConsumptionLog[]> {
  const { data, error } = await supabase
    .from('thread_consumption_logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as ThreadLogRow[]).map(threadLogFromRow);
}

export async function insertThreadLog(log: ThreadConsumptionLog): Promise<void> {
  const { error } = await supabase.from('thread_consumption_logs').insert(threadLogToRow(log));
  if (error) throw error;
}

export function subscribeThreadLogs(
  onUpsert: (log: ThreadConsumptionLog) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<ThreadLogRow>('thread_consumption_logs', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as ThreadLogRow).id);
    else onUpsert(threadLogFromRow(row));
  });
}

// ============================================================================
// Gastos e Ingresos (Contabilidad)
// ============================================================================
interface ExpenseRow {
  id: string;
  concept: string | null;
  reference: string | null;
  category: ExpenseRecord['category'] | null;
  amount: number;
  date: string | null;
  time: string | null;
}

function expenseFromRow(row: ExpenseRow): ExpenseRecord {
  return {
    id: row.id,
    concept: row.concept ?? '',
    reference: row.reference ?? '',
    category: (row.category ?? 'Otros') as ExpenseRecord['category'],
    amount: row.amount,
    date: row.date ?? '',
    time: row.time ?? ''
  };
}

function expenseToRow(e: ExpenseRecord): ExpenseRow {
  return {
    id: e.id,
    concept: e.concept ?? null,
    reference: e.reference ?? null,
    category: e.category,
    amount: e.amount,
    date: e.date ?? null,
    time: e.time ?? null
  };
}

export async function fetchExpenses(): Promise<ExpenseRecord[]> {
  const { data, error } = await supabase
    .from('expense_records')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as ExpenseRow[]).map(expenseFromRow);
}

export async function insertExpense(expense: ExpenseRecord): Promise<void> {
  const { error } = await supabase.from('expense_records').insert(expenseToRow(expense));
  if (error) throw error;
}

export async function bulkInsertExpenses(expenses: ExpenseRecord[]): Promise<void> {
  if (expenses.length === 0) return;
  const { error } = await supabase.from('expense_records').insert(expenses.map(expenseToRow));
  if (error) throw error;
}

export function subscribeExpenses(
  onUpsert: (e: ExpenseRecord) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<ExpenseRow>('expense_records', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as ExpenseRow).id);
    else onUpsert(expenseFromRow(row));
  });
}

interface IncomeRow {
  id: string;
  client: string | null;
  client_code: string | null;
  concept: string | null;
  amount: number;
  date: string | null;
  time: string | null;
}

function incomeFromRow(row: IncomeRow): IncomeRecord {
  return {
    id: row.id,
    client: row.client ?? '',
    clientCode: row.client_code ?? '',
    concept: row.concept ?? '',
    amount: row.amount,
    date: row.date ?? '',
    time: row.time ?? ''
  };
}

function incomeToRow(inc: IncomeRecord): IncomeRow {
  return {
    id: inc.id,
    client: inc.client ?? null,
    client_code: inc.clientCode ?? null,
    concept: inc.concept ?? null,
    amount: inc.amount,
    date: inc.date ?? null,
    time: inc.time ?? null
  };
}

export async function fetchIncomes(): Promise<IncomeRecord[]> {
  const { data, error } = await supabase
    .from('income_records')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as IncomeRow[]).map(incomeFromRow);
}

export async function insertIncome(income: IncomeRecord): Promise<void> {
  const { error } = await supabase.from('income_records').insert(incomeToRow(income));
  if (error) throw error;
}

export async function bulkInsertIncomes(incomes: IncomeRecord[]): Promise<void> {
  if (incomes.length === 0) return;
  const { error } = await supabase.from('income_records').insert(incomes.map(incomeToRow));
  if (error) throw error;
}

export function subscribeIncomes(
  onUpsert: (inc: IncomeRecord) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<IncomeRow>('income_records', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as IncomeRow).id);
    else onUpsert(incomeFromRow(row));
  });
}

// ============================================================================
// Pedidos (ActivityOrder)
// ============================================================================
interface OrderRow {
  id: string;
  client: string | null;
  items: string | null;
  quantity: number;
  status: ActivityOrder['status'];
  date: string | null;
  due_date: string | null;
  total_value: number | null;
  entry_date_iso: string | null;
  due_date_iso: string | null;
  factura_numero: string | null;
}

function orderFromRow(row: OrderRow): ActivityOrder {
  return {
    id: row.id,
    client: row.client ?? '',
    items: row.items ?? '',
    quantity: row.quantity,
    status: row.status,
    date: row.date ?? undefined,
    dueDate: row.due_date ?? undefined,
    totalValue: row.total_value ?? undefined,
    entryDateISO: row.entry_date_iso ?? undefined,
    dueDateISO: row.due_date_iso ?? undefined,
    facturaNumero: row.factura_numero ?? undefined
  };
}

function orderToRow(order: ActivityOrder): OrderRow {
  return {
    id: order.id,
    client: order.client ?? null,
    items: order.items ?? null,
    quantity: order.quantity,
    status: order.status,
    date: order.date ?? null,
    due_date: order.dueDate ?? null,
    total_value: order.totalValue ?? null,
    entry_date_iso: order.entryDateISO ?? null,
    due_date_iso: order.dueDateISO ?? null,
    factura_numero: order.facturaNumero ?? null
  };
}

export async function fetchOrders(): Promise<ActivityOrder[]> {
  const { data, error } = await supabase
    .from('activity_orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as OrderRow[]).map(orderFromRow);
}

export async function insertOrder(order: ActivityOrder): Promise<void> {
  const { error } = await supabase.from('activity_orders').insert(orderToRow(order));
  if (error) throw error;
}

export async function bulkInsertOrders(orders: ActivityOrder[]): Promise<void> {
  if (orders.length === 0) return;
  const { error } = await supabase.from('activity_orders').insert(orders.map(orderToRow));
  if (error) throw error;
}

export async function updateOrderStatus(orderId: string, status: ActivityOrder['status']): Promise<void> {
  const { error } = await supabase.from('activity_orders').update({ status }).eq('id', orderId);
  if (error) throw error;
}

export function subscribeOrders(
  onUpsert: (order: ActivityOrder) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<OrderRow>('activity_orders', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as OrderRow).id);
    else onUpsert(orderFromRow(row));
  });
}

// ============================================================================
// Notificaciones
// ============================================================================
interface NotificationRow {
  id: string;
  title: string | null;
  message: string | null;
  time: string | null;
  type: NotificationItem['type'];
  read: boolean;
}

function notificationFromRow(row: NotificationRow): NotificationItem {
  return {
    id: row.id,
    title: row.title ?? '',
    message: row.message ?? '',
    time: row.time ?? '',
    type: row.type,
    read: row.read
  };
}

function notificationToRow(n: NotificationItem): NotificationRow {
  return {
    id: n.id,
    title: n.title ?? null,
    message: n.message ?? null,
    time: n.time ?? null,
    type: n.type,
    read: n.read
  };
}

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as NotificationRow[]).map(notificationFromRow);
}

export async function insertNotification(notif: NotificationItem): Promise<void> {
  const { error } = await supabase.from('notifications').insert(notificationToRow(notif));
  if (error) throw error;
}

export async function bulkInsertNotifications(notifs: NotificationItem[]): Promise<void> {
  if (notifs.length === 0) return;
  const { error } = await supabase.from('notifications').insert(notifs.map(notificationToRow));
  if (error) throw error;
}

export async function markNotificationRead(id: string): Promise<void> {
  const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id);
  if (error) throw error;
}

export async function markAllNotificationsRead(): Promise<void> {
  // Actualiza todas las que todavía están sin leer.
  const { error } = await supabase.from('notifications').update({ read: true }).eq('read', false);
  if (error) throw error;
}

export function subscribeNotifications(
  onUpsert: (n: NotificationItem) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<NotificationRow>('notifications', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as NotificationRow).id);
    else onUpsert(notificationFromRow(row));
  });
}

// ============================================================================
// Prendas y Tarifas por Labor (GarmentRateGroup + TaskRate)
// ============================================================================
interface GarmentGroupRow {
  id: string;
  garment_name: string;
}

interface TaskRateRow {
  id: string;
  group_id: string;
  name: string;
  price: number;
  hilo_item_id: string | null;
  grams_per_piece: number | null;
}

function taskRateFromRow(row: TaskRateRow): TaskRate {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    hiloItemId: row.hilo_item_id ?? undefined,
    gramsPerPiece: row.grams_per_piece ?? undefined
  };
}

function taskRateToRow(groupId: string, task: TaskRate): TaskRateRow {
  return {
    id: task.id,
    group_id: groupId,
    name: task.name,
    price: task.price,
    hilo_item_id: task.hiloItemId ?? null,
    grams_per_piece: task.gramsPerPiece ?? null
  };
}

export async function fetchTaskRates(): Promise<GarmentRateGroup[]> {
  const [{ data: groups, error: groupsError }, { data: tasks, error: tasksError }] = await Promise.all([
    supabase.from('garment_rate_groups').select('*').order('garment_name'),
    supabase.from('task_rates').select('*')
  ]);
  if (groupsError) throw groupsError;
  if (tasksError) throw tasksError;

  const tasksByGroup = new Map<string, TaskRate[]>();
  (tasks as TaskRateRow[]).forEach((row) => {
    const list = tasksByGroup.get(row.group_id) ?? [];
    list.push(taskRateFromRow(row));
    tasksByGroup.set(row.group_id, list);
  });

  return (groups as GarmentGroupRow[]).map((g) => ({
    id: g.id,
    garmentName: g.garment_name,
    tasks: tasksByGroup.get(g.id) ?? []
  }));
}

// Guarda una prenda completa: crea/actualiza el grupo y reemplaza todas sus
// labores por la lista actual (más simple y seguro que calcular cuáles
// labores puntuales cambiaron, se agregaron o se borraron).
export async function saveGarmentRateGroup(group: GarmentRateGroup): Promise<void> {
  const { error: groupError } = await supabase
    .from('garment_rate_groups')
    .upsert({ id: group.id, garment_name: group.garmentName });
  if (groupError) throw groupError;

  const { error: deleteError } = await supabase.from('task_rates').delete().eq('group_id', group.id);
  if (deleteError) throw deleteError;

  if (group.tasks.length > 0) {
    const { error: insertError } = await supabase
      .from('task_rates')
      .insert(group.tasks.map((t) => taskRateToRow(group.id, t)));
    if (insertError) throw insertError;
  }
}

export async function deleteGarmentRateGroup(groupId: string): Promise<void> {
  const { error } = await supabase.from('garment_rate_groups').delete().eq('id', groupId);
  if (error) throw error;
}

export async function bulkInsertTaskRates(groups: GarmentRateGroup[]): Promise<void> {
  if (groups.length === 0) return;
  const { error: groupsError } = await supabase
    .from('garment_rate_groups')
    .insert(groups.map((g) => ({ id: g.id, garment_name: g.garmentName })));
  if (groupsError) throw groupsError;

  const allTasks = groups.flatMap((g) => g.tasks.map((t) => taskRateToRow(g.id, t)));
  if (allTasks.length > 0) {
    const { error: tasksError } = await supabase.from('task_rates').insert(allTasks);
    if (tasksError) throw tasksError;
  }
}

// Cualquier cambio en cualquiera de las dos tablas simplemente vuelve a
// traer todo el árbol de prendas+labores — esta parte cambia poco, así que
// no hace falta una fusión más fina evento por evento.
export function subscribeTaskRates(onChange: () => void): () => void {
  const unsubGroups = subscribeTable<GarmentGroupRow>('garment_rate_groups', () => onChange());
  const unsubTasks = subscribeTable<TaskRateRow>('task_rates', () => onChange());
  return () => {
    unsubGroups();
    unsubTasks();
  };
}

// ============================================================================
// Facturas (+ funciones y asignaciones anidadas)
// ============================================================================
interface FacturaRow {
  id: string;
  factura_numero: string;
  empresa: Factura['empresa'];
  descripcion: string | null;
  cantidad: number | null;
  valor_unitario: number | null;
  talla: string | null;
  total_factura: number | null;
  entry_date_iso: string | null;
  due_date_iso: string | null;
  status: Factura['status'] | null;
  actual_delivery_date_iso: string | null;
  payment_expected_date_iso: string | null;
  payment_status: Factura['paymentStatus'] | null;
  payment_received_date_iso: string | null;
  reconciled: boolean | null;
  reconciled_at: string | null;
  reconciliation_note: string | null;
}

interface FacturaFuncionRow {
  id: string;
  factura_id: string;
  nombre: string | null;
  precio: number | null;
  cantidad: number | null;
  valor: number | null;
}

interface FacturaAsignacionRow {
  id: string;
  factura_id: string;
  operative_id: string | null;
  operative_name: string | null;
  detalle: string | null;
  cantidad: number | null;
  valor: number | null;
  prestamos: number | null;
}

function facturaFuncionFromRow(row: FacturaFuncionRow): FacturaFuncion {
  return {
    id: row.id,
    nombre: row.nombre ?? '',
    precio: row.precio,
    cantidad: row.cantidad,
    valor: row.valor
  };
}

function facturaAsignacionFromRow(row: FacturaAsignacionRow): FacturaAsignacion {
  return {
    id: row.id,
    operativeId: row.operative_id,
    operativeName: row.operative_name ?? '',
    detalle: row.detalle ?? '',
    cantidad: row.cantidad,
    valor: row.valor,
    prestamos: row.prestamos
  };
}

function facturaFromRow(
  row: FacturaRow,
  funciones: FacturaFuncion[],
  asignaciones: FacturaAsignacion[]
): Factura {
  return {
    id: row.id,
    facturaNumero: row.factura_numero,
    empresa: row.empresa,
    descripcion: row.descripcion ?? '',
    cantidad: row.cantidad,
    valorUnitario: row.valor_unitario,
    talla: row.talla,
    totalFactura: row.total_factura,
    funciones,
    asignaciones,
    entryDateISO: row.entry_date_iso ?? undefined,
    dueDateISO: row.due_date_iso ?? undefined,
    status: row.status ?? undefined,
    actualDeliveryDateISO: row.actual_delivery_date_iso ?? undefined,
    paymentExpectedDateISO: row.payment_expected_date_iso ?? undefined,
    paymentStatus: row.payment_status ?? undefined,
    paymentReceivedDateISO: row.payment_received_date_iso ?? undefined,
    reconciled: row.reconciled ?? undefined,
    reconciledAt: row.reconciled_at ?? undefined,
    reconciliationNote: row.reconciliation_note ?? undefined
  };
}

function facturaToRow(f: Factura): FacturaRow {
  return {
    id: f.id,
    factura_numero: String(f.facturaNumero),
    empresa: f.empresa,
    descripcion: f.descripcion ?? null,
    cantidad: f.cantidad,
    valor_unitario: f.valorUnitario,
    talla: f.talla,
    total_factura: f.totalFactura,
    entry_date_iso: f.entryDateISO ?? null,
    due_date_iso: f.dueDateISO ?? null,
    status: f.status ?? null,
    actual_delivery_date_iso: f.actualDeliveryDateISO ?? null,
    payment_expected_date_iso: f.paymentExpectedDateISO ?? null,
    payment_status: f.paymentStatus ?? null,
    payment_received_date_iso: f.paymentReceivedDateISO ?? null,
    reconciled: f.reconciled ?? null,
    reconciled_at: f.reconciledAt ?? null,
    reconciliation_note: f.reconciliationNote ?? null
  };
}

export async function fetchFacturas(): Promise<Factura[]> {
  const [
    { data: facturaRows, error: facturasError },
    { data: funcionRows, error: funcionesError },
    { data: asignacionRows, error: asignacionesError }
  ] = await Promise.all([
    supabase.from('facturas').select('*').order('created_at', { ascending: false }),
    supabase.from('factura_funciones').select('*'),
    supabase.from('factura_asignaciones').select('*')
  ]);
  if (facturasError) throw facturasError;
  if (funcionesError) throw funcionesError;
  if (asignacionesError) throw asignacionesError;

  const funcionesByFactura = new Map<string, FacturaFuncion[]>();
  (funcionRows as FacturaFuncionRow[]).forEach((row) => {
    const list = funcionesByFactura.get(row.factura_id) ?? [];
    list.push(facturaFuncionFromRow(row));
    funcionesByFactura.set(row.factura_id, list);
  });

  const asignacionesByFactura = new Map<string, FacturaAsignacion[]>();
  (asignacionRows as FacturaAsignacionRow[]).forEach((row) => {
    const list = asignacionesByFactura.get(row.factura_id) ?? [];
    list.push(facturaAsignacionFromRow(row));
    asignacionesByFactura.set(row.factura_id, list);
  });

  return (facturaRows as FacturaRow[]).map((row) =>
    facturaFromRow(row, funcionesByFactura.get(row.id) ?? [], asignacionesByFactura.get(row.id) ?? [])
  );
}

// Inserta una factura nueva (ej. al crear un Pedido) — normalmente sin
// funciones/asignaciones todavía, ya que ese desglose solo existe en las
// facturas históricas importadas.
export async function insertFactura(factura: Factura): Promise<void> {
  const { error } = await supabase.from('facturas').insert(facturaToRow(factura));
  if (error) throw error;

  if (factura.funciones.length > 0) {
    const { error: funcionesError } = await supabase.from('factura_funciones').insert(
      factura.funciones.map((fn) => ({
        id: fn.id,
        factura_id: factura.id,
        nombre: fn.nombre,
        precio: fn.precio,
        cantidad: fn.cantidad,
        valor: fn.valor
      }))
    );
    if (funcionesError) throw funcionesError;
  }

  if (factura.asignaciones.length > 0) {
    const { error: asignacionesError } = await supabase.from('factura_asignaciones').insert(
      factura.asignaciones.map((a) => ({
        id: a.id,
        factura_id: factura.id,
        operative_id: a.operativeId,
        operative_name: a.operativeName,
        detalle: a.detalle,
        cantidad: a.cantidad,
        valor: a.valor,
        prestamos: a.prestamos
      }))
    );
    if (asignacionesError) throw asignacionesError;
  }
}

// Para el cargue inicial masivo de las 60 facturas históricas del Excel.
export async function bulkInsertFacturas(facturas: Factura[]): Promise<void> {
  if (facturas.length === 0) return;
  const { error } = await supabase.from('facturas').insert(facturas.map(facturaToRow));
  if (error) throw error;

  const allFunciones = facturas.flatMap((f) =>
    f.funciones.map((fn) => ({
      id: fn.id,
      factura_id: f.id,
      nombre: fn.nombre,
      precio: fn.precio,
      cantidad: fn.cantidad,
      valor: fn.valor
    }))
  );
  if (allFunciones.length > 0) {
    const { error: funcionesError } = await supabase.from('factura_funciones').insert(allFunciones);
    if (funcionesError) throw funcionesError;
  }

  const allAsignaciones = facturas.flatMap((f) =>
    f.asignaciones.map((a) => ({
      id: a.id,
      factura_id: f.id,
      operative_id: a.operativeId,
      operative_name: a.operativeName,
      detalle: a.detalle,
      cantidad: a.cantidad,
      valor: a.valor,
      prestamos: a.prestamos
    }))
  );
  if (allAsignaciones.length > 0) {
    const { error: asignacionesError } = await supabase.from('factura_asignaciones').insert(allAsignaciones);
    if (asignacionesError) throw asignacionesError;
  }
}

// Actualiza solo los campos planos de una factura (entrega, cobro,
// conciliación, cambio de estado) — nunca toca funciones/asignaciones.
export async function updateFacturaFields(id: string, patch: Partial<Factura>): Promise<void> {
  const row: Record<string, unknown> = {};
  if ('facturaNumero' in patch) row.factura_numero = String(patch.facturaNumero);
  if ('empresa' in patch) row.empresa = patch.empresa;
  if ('descripcion' in patch) row.descripcion = patch.descripcion;
  if ('cantidad' in patch) row.cantidad = patch.cantidad;
  if ('valorUnitario' in patch) row.valor_unitario = patch.valorUnitario;
  if ('talla' in patch) row.talla = patch.talla;
  if ('totalFactura' in patch) row.total_factura = patch.totalFactura;
  if ('entryDateISO' in patch) row.entry_date_iso = patch.entryDateISO ?? null;
  if ('dueDateISO' in patch) row.due_date_iso = patch.dueDateISO ?? null;
  if ('status' in patch) row.status = patch.status ?? null;
  if ('actualDeliveryDateISO' in patch) row.actual_delivery_date_iso = patch.actualDeliveryDateISO ?? null;
  if ('paymentExpectedDateISO' in patch) row.payment_expected_date_iso = patch.paymentExpectedDateISO ?? null;
  if ('paymentStatus' in patch) row.payment_status = patch.paymentStatus ?? null;
  if ('paymentReceivedDateISO' in patch) row.payment_received_date_iso = patch.paymentReceivedDateISO ?? null;
  if ('reconciled' in patch) row.reconciled = patch.reconciled ?? null;
  if ('reconciledAt' in patch) row.reconciled_at = patch.reconciledAt ?? null;
  if ('reconciliationNote' in patch) row.reconciliation_note = patch.reconciliationNote ?? null;

  const { error } = await supabase.from('facturas').update(row).eq('id', id);
  if (error) throw error;
}

// Actualiza por número de factura (se usa cuando un Pedido cambia de
// estado y hay que reflejarlo en su factura ligada).
export async function updateFacturaFieldsByNumero(
  facturaNumero: string,
  patch: Partial<Factura>
): Promise<void> {
  const row: Record<string, unknown> = {};
  if ('status' in patch) row.status = patch.status ?? null;
  if ('actualDeliveryDateISO' in patch) row.actual_delivery_date_iso = patch.actualDeliveryDateISO ?? null;
  if ('paymentExpectedDateISO' in patch) row.payment_expected_date_iso = patch.paymentExpectedDateISO ?? null;
  if ('paymentStatus' in patch) row.payment_status = patch.paymentStatus ?? null;

  const { error } = await supabase.from('facturas').update(row).eq('factura_numero', facturaNumero);
  if (error) throw error;
}

// Cambios en vivo sobre la tabla plana de facturas — conserva las
// funciones/asignaciones que ya estaban cargadas localmente, ya que esta
// tabla no las trae.
export function subscribeFacturas(
  onUpsert: (row: FacturaRow) => void,
  onDelete: (id: string) => void
): () => void {
  return subscribeTable<FacturaRow>('facturas', (event, row, oldRow) => {
    if (event === 'DELETE') onDelete((oldRow as FacturaRow).id);
    else onUpsert(row);
  });
}

export function facturaRowToPartial(row: FacturaRow): Omit<Factura, 'funciones' | 'asignaciones'> {
  return {
    id: row.id,
    facturaNumero: row.factura_numero,
    empresa: row.empresa,
    descripcion: row.descripcion ?? '',
    cantidad: row.cantidad,
    valorUnitario: row.valor_unitario,
    talla: row.talla,
    totalFactura: row.total_factura,
    entryDateISO: row.entry_date_iso ?? undefined,
    dueDateISO: row.due_date_iso ?? undefined,
    status: row.status ?? undefined,
    actualDeliveryDateISO: row.actual_delivery_date_iso ?? undefined,
    paymentExpectedDateISO: row.payment_expected_date_iso ?? undefined,
    paymentStatus: row.payment_status ?? undefined,
    paymentReceivedDateISO: row.payment_received_date_iso ?? undefined,
    reconciled: row.reconciled ?? undefined,
    reconciledAt: row.reconciled_at ?? undefined,
    reconciliationNote: row.reconciliation_note ?? undefined
  };
}

// ============================================================================
// Conteo rápido (para decidir si hay que sembrar los datos iniciales)
// ============================================================================
export async function tableIsEmpty(table: string): Promise<boolean> {
  const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true });
  if (error) throw error;
  return (count ?? 0) === 0;
}
