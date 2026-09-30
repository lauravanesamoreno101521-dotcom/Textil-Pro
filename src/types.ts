export type NavView = 'dashboard' | 'inventory' | 'production' | 'facturas' | 'accounting' | 'help';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Hilos' | 'Agujas' | 'Repuestos';
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
  // Número de WhatsApp (con indicativo, ej. "573001234567"), opcional. Se
  // usa para enviar el recibo de pago de nómina directamente por WhatsApp.
  phone?: string;
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
  // N.º de factura que el operario anotó al registrar (la que llegó o en la
  // que está trabajando). Opcional y de texto libre — es solo una referencia
  // para el jefe, no tiene que coincidir exactamente con una Factura cargada.
  facturaRef?: string;
  // true una vez este registro ya quedó incluido en un pago de nómina (ver
  // PayrollPayment). Así "Nómina Pendiente" solo suma lo que falta pagar.
  paid?: boolean;
  paymentId?: string;
}

// Un pago de nómina ya realizado a un operario por un período (día, semana,
// quincena o mes). Es la base del recibo de pago (imprimir / WhatsApp) y de
// los avisos de "se acerca pago de nómina" (días 14 y 29 de cada mes).
export interface PayrollPayment {
  id: string;
  operativeId: string;
  operativeName: string;
  periodLabel: string; // ej. "Quincena · 1-15 Ago 2026"
  periodStartISO: string;
  periodEndISO: string;
  totalQty: number;
  totalPay: number;
  paidDateISO: string;
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
  // N.º de factura real ligado a este pedido (ver Factura más abajo). Se usa
  // para conciliar cantidades: los operarios anotan este mismo número al
  // registrar producción en su pantalla de autoservicio.
  facturaNumero?: string;
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

  // --- Consumo de hilo (ver utils/threadConsumption.ts) ---
  // Insumo de hilo (InventoryItem.id, categoría "Hilos") que se gasta al
  // realizar esta labor. Opcional: solo se define en las labores que
  // realmente usan hilo.
  hiloItemId?: string;
  // Gramos de hilo estimados por pieza, ingresados manualmente por el jefe
  // mientras no haya suficiente histórico real (ver ThreadConsumptionLog).
  // Una vez haya suficientes registros de consumo real para esta combinación
  // prenda + labor + hilo, el sistema empieza a mostrar el promedio
  // calculado en su lugar (sin sobrescribir este valor manual).
  gramsPerPiece?: number;
}

// Registro de consumo real de hilo en una tarea ya terminada (se llena
// pesando el cono/rollo antes y después, o por diferencia de lo que se
// entregó al operario vs lo que sobró). Es la base del histórico que,
// una vez tenga suficientes datos, permite calcular automáticamente el
// promedio de gramos por pieza en vez de depender del valor manual.
// Este registro es solo informativo/de alerta: nunca descuenta el stock
// del inventario automáticamente.
export interface ThreadConsumptionLog {
  id: string;
  hiloItemId: string; // InventoryItem.id del hilo
  garmentType: string; // debe coincidir con GarmentRateGroup.garmentName
  taskName: string; // debe coincidir con TaskRate.name
  gramsUsed: number;
  piecesProduced: number;
  dateISO: string;
  note?: string;
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

  // --- Seguimiento de ciclo de vida (solo para facturas/pedidos nuevos, con
  // fecha real de ingreso — las 60 facturas históricas importadas del Excel
  // quedan tal cual, sin estos campos, como registros ya cerrados) ---

  // Fecha en la que llegó el pedido/factura del cliente (YYYY-MM-DD). A
  // partir de aquí el taller tiene 9 días para entregar.
  entryDateISO?: string;
  // Fecha límite de entrega (día 9), calculada desde entryDateISO.
  dueDateISO?: string;
  // Estado del pedido, mismo modelo que ActivityOrder para reusar la lógica
  // de utils/deliveryDeadline.ts.
  status?: 'In Progress' | 'Delivered' | 'Delayed' | 'Pending';
  // Fecha real en la que se entregó al cliente (puede ser distinta al día 9
  // si hubo retraso).
  actualDeliveryDateISO?: string;

  // --- Cobro al cliente: se paga 10 días después de la entrega real. Si la
  // entrega se retrasa, el cobro se corre esos mismos días. ---
  paymentExpectedDateISO?: string;
  paymentStatus?: 'pendiente' | 'cobrado';
  paymentReceivedDateISO?: string;

  // --- Conciliación de cantidades vs. lo registrado por los operarios ---
  // (ver utils/reconciliation.ts). Al día 8/9 se compara `cantidad` (lo que
  // dice la factura del cliente) contra la suma de lo que cada operario
  // anotó con este mismo facturaNumero en Producción.
  reconciled?: boolean;
  reconciledAt?: string;
  reconciliationNote?: string;
}
