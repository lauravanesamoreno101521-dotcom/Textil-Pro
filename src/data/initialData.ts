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
  },
  {
    id: 'INV-006',
    name: 'Tela Algodón Jersey Azul Marino',
    category: 'Telas',
    currentStock: 45,
    unit: 'Metros',
    reorderPoint: 60,
    status: 'Bajo',
    costPerUnit: 8.50,
    lastUpdated: 'Hoy, 10:00'
  },
  {
    id: 'INV-007',
    name: 'Botones 4 Orificios Resina',
    category: 'Accesorios',
    currentStock: 1400,
    unit: 'Unidades',
    reorderPoint: 300,
    status: 'OK',
    costPerUnit: 0.15,
    lastUpdated: '15 Ago'
  },
  {
    id: 'INV-008',
    name: 'Cremalleras Invisibles 18cm',
    category: 'Accesorios',
    currentStock: 18,
    unit: 'Unidades',
    reorderPoint: 50,
    status: 'Crítico',
    costPerUnit: 0.90,
    lastUpdated: 'Hoy, 11:20'
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
    avatar: 'https://ui-avatars.com/api/?name=Damelis&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Argenis&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Yuli&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Mongui&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Jorge&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Ana&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Maria&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Despelusado%20%28Externo%29&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Alexander&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Cristian&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Juan&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Andrea&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Alejandra&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Puki&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Rosalin&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Alexis&background=674bb5&color=fff&bold=true&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Laura&background=674bb5&color=fff&bold=true&size=128',
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

export const LOGO_URL ='https://lh3.googleusercontent.com/aida/AP1WRLv-AK5eRa0-PhGfWEzYDqzfbMxijETLgqs1XMAo3Z-V9PE3BeYGiRF3PrsilBfeIkHq26ZSGf5AcOZuES7EQhdbl5kJY5gIDNTUhqkRIs-r0t1bO9T5wq4xQiuGidSpNrfQqKMxXJFqjjKTyrrxO6JWErtOwK5M4IoSN4OZ36sKBHr-A68XIS1FIjk6Q91ItWzLQyNOYCTT7jO6Mx-J6rQ_Z5lpE6983d6GRdQ3T3aYY5DPRbg5V0j47B4';
export const MANAGER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC54cX66fz6lfivESOH8LJ-T6H1d36UTQgd9UlYs4S1NjQXYpaZ8nmitgDHNV9ufUdsNwMZ08WiiM5VqyVJvleDspK9F4xn07T7FKRtgI0z2V8iF9fqt-01qG8tWc-4RD1z_Y-38QRK1kubgT9TZvljQz1K7AC9wR5mV05KaqLe1HxTHirjITOcPanDUwH2CCWW13vlsrYPysUtvhBTYa4RufOzdRwI-0E4AoeygFmTBkUR_3MdnY1n';
