import { InventoryItem, Operative, ProductionEntry, ExpenseRecord, IncomeRecord, ActivityOrder, NotificationItem, GarmentRateGroup } from '../types';

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Hilo Poliéster Negro',
    category: 'Hilos',
    currentStock: 450,
    unit: 'Conos',
    reorderPoint: 100,
    status: 'OK',
    costPerUnit: 3.50,
    lastUpdated: 'Hoy, 09:15'
  },
  {
    id: 'INV-002',
    name: 'Agujas Industriales 90/14',
    category: 'Agujas',
    currentStock: 12,
    unit: 'Paq. (100)',
    reorderPoint: 20,
    status: 'Crítico',
    costPerUnit: 14.20,
    lastUpdated: 'Ayer, 16:40'
  },
  {
    id: 'INV-003',
    name: 'Aceite Lubricante Máquinas',
    category: 'Repuestos',
    currentStock: 5,
    unit: 'Litros',
    reorderPoint: 5,
    status: 'Bajo',
    costPerUnit: 18.00,
    lastUpdated: '18 Ago'
  },
  {
    id: 'INV-004',
    name: 'Hilo Remalladora Blanco',
    category: 'Hilos',
    currentStock: 800,
    unit: 'Conos',
    reorderPoint: 150,
    status: 'OK',
    costPerUnit: 3.20,
    lastUpdated: 'Hoy, 08:30'
  },
  {
    id: 'INV-005',
    name: 'Correas Motor Tipo A',
    category: 'Repuestos',
    currentStock: 2,
    unit: 'Unidades',
    reorderPoint: 8,
    status: 'Crítico',
    costPerUnit: 12.50,
    lastUpdated: '17 Ago'
  }
];

// Operarios reales del taller, extraídos y normalizados de "NOMINA 2026.xlsx"
// (hojas COOLKIDS e IMPERIUM). piecesCompleted, ratePerPiece y totalEarnings
// son el acumulado histórico de lo que va del año, calculado a partir de las
// facturas reales (ver INITIAL_FACTURAS en data/facturasData.ts). Los avatares
// son generados a partir de las iniciales del nombre (no hay fotos reales).
export const INITIAL_OPERATIVES: Operative[] = [
  {
    id: 'OP-001',
    name: 'Damelis',
    avatar: 'https://ui-avatars.com/api/?name=Damelis&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Dobladillos · Dobladillo de Bota',
    piecesCompleted: 135728,
    ratePerPiece: 68.4,
    totalEarnings: 9283502
  },
  {
    id: 'OP-002',
    name: 'Argenis',
    avatar: 'https://ui-avatars.com/api/?name=Argenis&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Cierres · Encauchado',
    piecesCompleted: 105263,
    ratePerPiece: 71.3,
    totalEarnings: 7504770
  },
  {
    id: 'OP-003',
    name: 'Yuli',
    avatar: 'https://ui-avatars.com/api/?name=Yuli&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Remates · Enmangado',
    piecesCompleted: 88155,
    ratePerPiece: 69.31,
    totalEarnings: 6109806
  },
  {
    id: 'OP-004',
    name: 'Mongui',
    avatar: 'https://ui-avatars.com/api/?name=Mongui&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Cierres · Enmangado',
    piecesCompleted: 65288,
    ratePerPiece: 74.41,
    totalEarnings: 4857874
  },
  {
    id: 'OP-005',
    name: 'Jorge',
    avatar: 'https://ui-avatars.com/api/?name=Jorge&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Sesgos · Pise de Plana',
    piecesCompleted: 61666,
    ratePerPiece: 76.23,
    totalEarnings: 4700919
  },
  {
    id: 'OP-006',
    name: 'Ana',
    avatar: 'https://ui-avatars.com/api/?name=Ana&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Remates · Hombros',
    piecesCompleted: 72670,
    ratePerPiece: 52.93,
    totalEarnings: 3846370
  },
  {
    id: 'OP-007',
    name: 'Maria',
    avatar: 'https://ui-avatars.com/api/?name=Maria&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Pise de Plana · Unión de Sesgo',
    piecesCompleted: 58996,
    ratePerPiece: 58.16,
    totalEarnings: 3431475
  },
  {
    id: 'OP-008',
    name: 'Despelusado (Externo)',
    avatar: 'https://ui-avatars.com/api/?name=Despelusado%20%28Externo%29&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Contratista Externo',
    active: true,
    specialty: 'Servicio Externo de Despelusado',
    piecesCompleted: 31549,
    ratePerPiece: 93.67,
    totalEarnings: 2955094
  },
  {
    id: 'OP-009',
    name: 'Alexander',
    avatar: 'https://ui-avatars.com/api/?name=Alexander&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Despelusado',
    piecesCompleted: 29537,
    ratePerPiece: 88.74,
    totalEarnings: 2621078
  },
  {
    id: 'OP-010',
    name: 'Cristian',
    avatar: 'https://ui-avatars.com/api/?name=Cristian&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Sesgos · Despelusado',
    piecesCompleted: 20529,
    ratePerPiece: 70.45,
    totalEarnings: 1446338
  },
  {
    id: 'OP-011',
    name: 'Juan',
    avatar: 'https://ui-avatars.com/api/?name=Juan&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Sesgos · Pise de Plana',
    piecesCompleted: 17827,
    ratePerPiece: 62.95,
    totalEarnings: 1122174
  },
  {
    id: 'OP-012',
    name: 'Andrea',
    avatar: 'https://ui-avatars.com/api/?name=Andrea&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Despelusado',
    piecesCompleted: 11900,
    ratePerPiece: 84.21,
    totalEarnings: 1002069
  },
  {
    id: 'OP-013',
    name: 'Alejandra',
    avatar: 'https://ui-avatars.com/api/?name=Alejandra&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Sesgos · Hombros',
    piecesCompleted: 13305,
    ratePerPiece: 74.4,
    totalEarnings: 989888
  },
  {
    id: 'OP-014',
    name: 'Puki',
    avatar: 'https://ui-avatars.com/api/?name=Puki&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Despelusado',
    piecesCompleted: 2982,
    ratePerPiece: 108.08,
    totalEarnings: 322293
  },
  {
    id: 'OP-015',
    name: 'Rosalin',
    avatar: 'https://ui-avatars.com/api/?name=Rosalin&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Hombros · Cierres',
    piecesCompleted: 3954,
    ratePerPiece: 59.02,
    totalEarnings: 233362
  },
  {
    id: 'OP-016',
    name: 'Alexis',
    avatar: 'https://ui-avatars.com/api/?name=Alexis&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Despelusado',
    piecesCompleted: 1344,
    ratePerPiece: 68.0,
    totalEarnings: 91392
  },
  {
    id: 'OP-017',
    name: 'Laura',
    avatar: 'https://ui-avatars.com/api/?name=Laura&background=ca2164&color=fff&bold=true&size=128',
    shift: 'Turno General',
    active: true,
    specialty: 'Cierres',
    piecesCompleted: 300,
    ratePerPiece: 65.0,
    totalEarnings: 19500
  }
];

// Se deja vacío intencionalmente: los registros de producción de ejemplo
// (con operarios ficticios) se retiraron al cargar los operarios reales.
// El historial real de trabajo por factura vive ahora en INITIAL_FACTURAS
// (data/facturasData.ts). Los nuevos registros que se guarden desde
// "Registrar Producción" se irán agregando aquí.
export const INITIAL_PRODUCTION_HISTORY: ProductionEntry[] = [];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'EXP-001',
    concept: 'Factura Eléctrica',
    reference: 'Ref: ELEC-092',
    category: 'Servicios',
    amount: 450.00,
    date: '18 Ago 2026',
    time: '11:00 AM'
  },
  {
    id: 'EXP-002',
    concept: 'Proveedor Internet',
    reference: 'Ref: NET-110',
    category: 'Internet',
    amount: 120.00,
    date: '17 Ago 2026',
    time: '09:30 AM'
  },
  {
    id: 'EXP-003',
    concept: 'Reparación Máquina 3',
    reference: 'Mecánico Externo',
    category: 'Mantenimiento',
    amount: 850.00,
    date: '16 Ago 2026',
    time: '15:20 PM'
  },
  {
    id: 'EXP-004',
    concept: 'Agua Potable Taller',
    reference: 'Ref: AGU-044',
    category: 'Servicios',
    amount: 85.00,
    date: '15 Ago 2026',
    time: '10:15 AM'
  },
  {
    id: 'EXP-005',
    concept: 'Compra de Hilos y Agujas Mayorista',
    reference: 'Fac: TEX-8891',
    category: 'Insumos',
    amount: 1145.00,
    date: '14 Ago 2026',
    time: '16:00 PM'
  }
];

export const INITIAL_INCOMES: IncomeRecord[] = [
  {
    id: 'INC-001',
    client: 'Cliente Alpha S.A.',
    clientCode: 'C1',
    concept: 'Pago tareas lote #4502',
    amount: 28500.00,
    date: 'Hoy',
    time: '10:30 AM'
  },
  {
    id: 'INC-002',
    client: 'Boutique Beta',
    clientCode: 'C2',
    concept: 'Anticipo colección verano',
    amount: 16700.00,
    date: 'Ayer',
    time: '14:15 PM'
  },
  {
    id: 'INC-003',
    client: 'Local Sports Club',
    clientCode: 'C3',
    concept: 'Liquidación pedido 120 uniformes',
    amount: 8400.00,
    date: '16 Ago',
    time: '11:45 AM'
  }
];

export const INITIAL_INCOME = INITIAL_INCOMES;

export const INITIAL_ORDERS: ActivityOrder[] = [
  {
    id: '#ORD-092',
    client: 'Boutique Elegance',
    items: '50 Blusas de Seda',
    quantity: 50,
    status: 'In Progress',
    date: 'Hoy',
    totalValue: 3500.00
  },
  {
    id: '#ORD-091',
    client: 'Local Sports Club',
    items: '120 Uniformes',
    quantity: 120,
    status: 'Delivered',
    date: 'Ayer',
    totalValue: 8400.00
  },
  {
    id: '#ORD-090',
    client: 'Fashion Hub Inc',
    items: '200 Chaquetas de Mezclilla',
    quantity: 200,
    status: 'Delayed',
    date: '17 Ago',
    totalValue: 12600.00
  },
  {
    id: '#ORD-089',
    client: 'City Retailers',
    items: '80 Vestidos de Verano',
    quantity: 80,
    status: 'In Progress',
    date: '16 Ago',
    totalValue: 5200.00
  },
  {
    id: '#ORD-088',
    client: 'Private Label X',
    items: '30 Trajes a Medida',
    quantity: 30,
    status: 'Delivered',
    date: '15 Ago',
    totalValue: 4500.00
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOT-001',
    title: 'Stock Crítico de Agujas',
    message: 'Agujas Industriales 90/14 tiene solo 12 paquetes restantes (Punto reorden: 20).',
    time: 'Hace 15 min',
    type: 'alert',
    read: false
  },
  {
    id: 'NOT-002',
    title: 'Historial de facturas cargado',
    message: 'Se cargaron 60 facturas reales de Coolkids e Imperium con su desglose de labores y operarios.',
    time: 'Hace 45 min',
    type: 'success',
    read: false
  },
  {
    id: 'NOT-003',
    title: 'Ingreso registrado',
    message: 'Se acreditó pago de $28,500.00 de Cliente Alpha S.A.',
    time: 'Hace 2 horas',
    type: 'info',
    read: true
  }
];

// Tarifas estandarizadas por labor, tomadas de "PRECIO FUNCION.xlsx".
// Precios en pesos colombianos (COP) por pieza/unidad trabajada.
export const INITIAL_TASK_RATES: GarmentRateGroup[] = [
  {
    id: 'PANTALONETA_4_PARTES',
    garmentName: 'Pantaloneta 4 Partes',
    tasks: [
      { id: 'p4p-delantero', name: 'Delantero', price: 43 },
      { id: 'p4p-trasero', name: 'Trasero', price: 43 },
      { id: 'p4p-remate-tiro', name: 'Remate Tiro', price: 64 },
      { id: 'p4p-pise-plana-1', name: 'Pise Plana 1', price: 55 },
      { id: 'p4p-pise-plana-2', name: 'Pise Plana 2', price: 55 },
      { id: 'p4p-cierre-lados', name: 'Cierre Lados', price: 57 },
      { id: 'p4p-pise-caucho', name: 'Pise Caucho', price: 62.5 },
      { id: 'p4p-encauchado', name: 'Encauchado', price: 60 },
      { id: 'p4p-dobladillo', name: 'Dobladillo', price: 68 },
      { id: 'p4p-remate', name: 'Remate', price: 43 }
    ]
  },
  {
    id: 'SHORT_NINA',
    garmentName: 'Short Niña',
    tasks: [
      { id: 'sn-delantero', name: 'Delantero', price: 43 },
      { id: 'sn-trasero', name: 'Trasero', price: 43 },
      { id: 'sn-tiro', name: 'Tiro', price: 52.7 },
      { id: 'sn-pise-de-plana-1', name: 'Pise de Plana 1', price: 52.7 },
      { id: 'sn-pise-de-plana-2', name: 'Pise de Plana 2', price: 55 },
      { id: 'sn-encauchado', name: 'Encauchado', price: 60 },
      { id: 'sn-sesgo', name: 'Sesgo', price: 65 },
      { id: 'sn-pise-caucho', name: 'Pise Caucho', price: 65 },
      { id: 'sn-cierre-de-lados', name: 'Cierre de Lados', price: 55 },
      { id: 'sn-remate', name: 'Remate', price: 43 }
    ]
  },
  {
    id: 'FRANELILLA_BEISBOLERA',
    garmentName: 'Franelilla Beisbolera',
    tasks: [
      { id: 'fb-hombros', name: 'Hombros', price: 58 },
      { id: 'fb-cierre-lados', name: 'Cierre Lados', price: 65 },
      { id: 'fb-sesgo-cuello', name: 'Sesgo Cuello', price: 60 },
      { id: 'fb-sesgo-mangas', name: 'Sesgo Mangas', price: 68 },
      { id: 'fb-dobladillo', name: 'Dobladillo', price: 66 },
      { id: 'fb-remate', name: 'Remate', price: 43 }
    ]
  },
  {
    id: 'PANTALON_PIJAMA',
    garmentName: 'Pantalón Pijama',
    tasks: [
      { id: 'pp-delan-trasero', name: 'Delan-Trasero', price: 80 },
      { id: 'pp-cierre-de-tiro', name: 'Cierre de Tiro', price: 95 },
      { id: 'pp-dobladillo-bota', name: 'Dobladillo Bota', price: 68 },
      { id: 'pp-encauchada', name: 'Encauchada', price: 60 },
      { id: 'pp-pise-caucho', name: 'Pise Caucho', price: 65 },
      { id: 'pp-remate', name: 'Remate', price: 43 }
    ]
  }
];

// Logo del taller: una miniatura de máquina de coser (imagen enviada por la
// usuaria), incrustada aquí mismo como data URI para que funcione siempre,
// sin depender de un enlace externo que pueda caerse.
export const LOGO_URL = 'data:image/png;base64,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';
export const MANAGER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC54cX66fz6lfivESOH8LJ-T6H1d36UTQgd9UlYs4S1NjQXYpaZ8nmitgDHNV9ufUdsNwMZ08WiiM5VqyVJvleDspK9F4xn07T7FKRtgI0z2V8iF9fqt-01qG8tWc-4RD1z_Y-38QRK1kubgT9TZvljQz1K7AC9wR5mV05KaqLe1HxTHirjITOcPanDUwH2CCWW13vlsrYPysUtvhBTYa4RufOzdRwI-0E4AoeygFmTBkUR_3MdnY1n';
