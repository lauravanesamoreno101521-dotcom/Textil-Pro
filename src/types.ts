export type NavView = 'dashboard' | 'inventory' | 'production' | 'facturas' | 'accounting' | 'help';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Hilos' | 'Agujas' | 'Repuestos' | 'Telas' | 'Accesorios';
  currentStock: number;
  unit: string;
  reorderPoint: number;
  status: 'OK' | 'Crítico' | 'Bajo';
  costPerUnit?: number;
  lastUpdated?: string;
}

export interface Operative {
  id: string; // e.g. "OP-001"
  name: string;
  avatar: string;
  shift: string;
  active: boolean;
  specialty: string;
  piecesCompleted: number;
  ratePerPiece: number;
  totalEarnings: number;
  assignedMachine?: string;
}

export interface ProductionEntry {
  id: string;
  time: string;
  date: string; // texto para mostrar (ej. "Hoy")
  dateISO: string; // fecha real en formato YYYY-MM-DD, usada para agrupar nómina por día/semana/mes
  machineId: string;
  operativeId: string;
  operativeName: string;
  garmentType: string; // nombre real de la prenda (ej. "Short Niña"), tomado de GarmentRateGroup
  taskName: string; // labor específica realizada (ej. "Dobladillo"), tomada de TaskRate
  batchQty: number;
  ratePerPiece: number;
  totalPay: number;
}

export interface ExpenseRecord {
  id: string;
  concept: string;
  reference: string;
  category: 'Servicios' | 'Internet' | 'Mantenimiento' | 'Insumos' | 'Nómina' | 'Otros';
  amount: number;
  date: string;
  time: string;
}

export interface IncomeRecord {
  id: string;
  client: string;
  clientCode: string;
  concept: string;
  amount: number;
  date: string;
  time: string;
}

export interface ActivityOrder {
  id: string; // e.g. "#ORD-092"
  client: string;
  items: string;
  quantity: number;
  status: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending';
  date?: string;
  dueDate?: string;
  totalValue?: number;
  // Fecha real de ingreso del pedido (YYYY-MM-DD). A partir de esta fecha el
  // taller tiene 9 días para entregar (ver utils/deliveryDeadline.ts): al
  // día 8 la prenda debe estar en despeluce, y el día 9 es para empacar y
  // enviar. Opcional para no romper pedidos de ejemplo sin fecha real.
  entryDateISO?: string;
  // Fecha límite de entrega (día 9), calculada automáticamente a partir de
  // entryDateISO al crear el pedido.
  dueDateISO?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'alert';
  read: boolean;
}

// Tarifa estandarizada de una labor puntual (ej. "Dobladillo") dentro del
// proceso de confección de una prenda. El precio está en pesos colombianos
// (COP) por unidad/pieza trabajada.
export interface TaskRate {
  id: string;
  name: string;
  price: number; // COP por pieza
}

// Agrupa todas las labores estandarizadas de un tipo de prenda (ej. "Short
// Niña"). Esta es la base de precios que luego se enlazará con el registro
// de producción de cada operario para calcular su nómina automáticamente.
export interface GarmentRateGroup {
  id: string;
  garmentName: string;
  tasks: TaskRate[];
}

// Etiquetas en español para los estados internos de los pedidos (los valores
// internos se mantienen en inglés para no romper comparaciones de estado).
export const ORDER_STATUS_LABELS: Record<ActivityOrder['status'], string> = {
  'Pending': 'Pendiente',
  'In Progress': 'En Progreso',
  'Delivered': 'Entregado',
  'Delayed': 'Retrasado',
};

// Empresas cliente reales del taller (quienes contratan la confección).
export type CompanyName = 'COOLKIDS' | 'IMPERIUM';

// Una labor puntual dentro del desglose de una factura (ej. "Dobladillo"),
// con su precio de referencia, la cantidad total a realizar y el valor
// resultante para esa factura.
export interface FacturaFuncion {
  id: string;
  nombre: string;
  precio: number | null; // COP por unidad
  cantidad: number | null;
  valor: number | null; // COP total de esa labor en la factura
}

// Registro de qué operario realizó qué labor dentro de una factura, cuánto
// hizo y cuánto se le pagó. Es la base real para calcular la nómina.
export interface FacturaAsignacion {
  id: string;
  operativeId: string | null; // enlaza con Operative.id cuando se identificó al operario
  operativeName: string;
  detalle: string; // texto original de la labor/observación (ej. "Sesgo Manga Talla 12,6")
  cantidad: number | null;
  valor: number | null; // COP pagados por esta asignación
  prestamos: number | null; // COP en préstamos/anticipos descontados, si aplica
}

// Una factura/pedido real de una empresa cliente (Coolkids, Imperium), con
// su desglose de labores estandarizadas y qué operario hizo cada una.
export interface Factura {
  id: string;
  facturaNumero: string | number;
  empresa: CompanyName;
  descripcion: string;
  cantidad: number | null;
  valorUnitario: number | null;
  talla: string | null;
  totalFactura: number | null;
  funciones: FacturaFuncion[];
  asignaciones: FacturaAsignacion[];
}
