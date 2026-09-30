-- ============================================================================
-- TextilePro — Esquema de base de datos para Supabase
-- ============================================================================
-- Cómo usar este archivo:
--   1. Entra a tu proyecto en supabase.com
--   2. Ve al menú "SQL Editor" (ícono de una hoja con </>) en la barra lateral
--   3. Clic en "New query"
--   4. Pega TODO el contenido de este archivo
--   5. Clic en "Run" (o Ctrl+Enter)
--   6. Debe decir "Success. No rows returned" — eso significa que ya se
--      crearon todas las tablas.
--
-- Nota sobre seguridad: como esta app no tiene un sistema de usuarios con
-- contraseña individual (es un equipo compartido con un PIN simple para el
-- administrador, igual que hoy), las políticas de abajo dejan que cualquiera
-- que tenga la "llave pública" (anon key) de tu proyecto lea y escriba estos
-- datos — es el mismo nivel de seguridad que tiene la app ahora mismo
-- (sin backend). Si más adelante quieres que cada operario tenga su propio
-- usuario con contraseña, se puede endurecer esto después.
-- ============================================================================

-- --------------------------------------------------------------------------
-- Inventario de insumos (hilos, agujas, repuestos)
-- --------------------------------------------------------------------------
create table if not exists inventory_items (
  id text primary key,
  name text not null,
  category text not null check (category in ('Hilos', 'Agujas', 'Repuestos')),
  current_stock numeric not null default 0,
  unit text not null,
  reorder_point numeric not null default 0,
  status text not null check (status in ('OK', 'Crítico', 'Bajo')),
  cost_per_unit numeric,
  last_updated text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Operarios del taller
-- --------------------------------------------------------------------------
create table if not exists operatives (
  id text primary key,
  name text not null,
  avatar text,
  shift text,
  active boolean not null default true,
  specialty text,
  pieces_completed numeric not null default 0,
  rate_per_piece numeric not null default 0,
  total_earnings numeric not null default 0,
  assigned_machine text,
  phone text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Prendas y tarifas por labor (ej. "Short Niña" -> "Dobladillo" -> $500)
-- --------------------------------------------------------------------------
create table if not exists garment_rate_groups (
  id text primary key,
  garment_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists task_rates (
  id text primary key,
  group_id text not null references garment_rate_groups(id) on delete cascade,
  name text not null,
  price numeric not null default 0,
  hilo_item_id text references inventory_items(id) on delete set null,
  grams_per_piece numeric,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Registro de producción (lo que cada operario anota en su pantalla)
-- --------------------------------------------------------------------------
create table if not exists production_entries (
  id text primary key,
  time text,
  date text,
  date_iso date not null,
  machine_id text,
  operative_id text references operatives(id) on delete set null,
  operative_name text,
  garment_type text,
  task_name text,
  batch_qty numeric not null default 0,
  rate_per_piece numeric not null default 0,
  total_pay numeric not null default 0,
  factura_ref text,
  paid boolean not null default false,
  payment_id text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Pagos de nómina ya realizados (recibos)
-- --------------------------------------------------------------------------
create table if not exists payroll_payments (
  id text primary key,
  operative_id text references operatives(id) on delete set null,
  operative_name text,
  period_label text,
  period_start_iso date,
  period_end_iso date,
  total_qty numeric not null default 0,
  total_pay numeric not null default 0,
  paid_date_iso date,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Histórico de consumo real de hilo (para alertas de inventario)
-- --------------------------------------------------------------------------
create table if not exists thread_consumption_logs (
  id text primary key,
  hilo_item_id text references inventory_items(id) on delete cascade,
  garment_type text,
  task_name text,
  grams_used numeric not null default 0,
  pieces_produced numeric not null default 0,
  date_iso date,
  note text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Gastos e ingresos generales del taller (Contabilidad)
-- --------------------------------------------------------------------------
create table if not exists expense_records (
  id text primary key,
  concept text,
  reference text,
  category text check (category in ('Servicios','Internet','Mantenimiento','Insumos','Nómina','Otros')),
  amount numeric not null default 0,
  date text,
  time text,
  created_at timestamptz not null default now()
);

create table if not exists income_records (
  id text primary key,
  client text,
  client_code text,
  concept text,
  amount numeric not null default 0,
  date text,
  time text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Pedidos (vista del Dashboard — se mantiene sincronizado con Facturas)
-- --------------------------------------------------------------------------
create table if not exists activity_orders (
  id text primary key,
  client text,
  items text,
  quantity numeric not null default 0,
  status text not null default 'Pending',
  date text,
  due_date text,
  total_value numeric,
  entry_date_iso date,
  due_date_iso date,
  factura_numero text,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Notificaciones (campanita)
-- --------------------------------------------------------------------------
create table if not exists notifications (
  id text primary key,
  title text,
  message text,
  time text,
  type text check (type in ('warning','info','success','alert')),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- Facturas (documento real del cliente, con su ciclo de vida completo)
-- --------------------------------------------------------------------------
create table if not exists facturas (
  id text primary key,
  factura_numero text not null,
  empresa text not null check (empresa in ('COOLKIDS','IMPERIUM')),
  descripcion text,
  cantidad numeric,
  valor_unitario numeric,
  talla text,
  total_factura numeric,
  entry_date_iso date,
  due_date_iso date,
  status text check (status in ('In Progress','Delivered','Delayed','Pending')),
  actual_delivery_date_iso date,
  payment_expected_date_iso date,
  payment_status text check (payment_status in ('pendiente','cobrado')),
  payment_received_date_iso date,
  reconciled boolean,
  reconciled_at text,
  reconciliation_note text,
  created_at timestamptz not null default now()
);

create table if not exists factura_funciones (
  id text primary key,
  factura_id text not null references facturas(id) on delete cascade,
  nombre text,
  precio numeric,
  cantidad numeric,
  valor numeric
);

create table if not exists factura_asignaciones (
  id text primary key,
  factura_id text not null references facturas(id) on delete cascade,
  operative_id text references operatives(id) on delete set null,
  operative_name text,
  detalle text,
  cantidad numeric,
  valor numeric,
  prestamos numeric
);

-- --------------------------------------------------------------------------
-- Índices útiles (para que los filtros por fecha/factura sean rápidos)
-- --------------------------------------------------------------------------
create index if not exists idx_production_entries_date_iso on production_entries(date_iso);
create index if not exists idx_production_entries_operative on production_entries(operative_id);
create index if not exists idx_production_entries_factura_ref on production_entries(factura_ref);
create index if not exists idx_task_rates_group on task_rates(group_id);
create index if not exists idx_factura_funciones_factura on factura_funciones(factura_id);
create index if not exists idx_factura_asignaciones_factura on factura_asignaciones(factura_id);

-- ============================================================================
-- Seguridad (RLS): habilitada en todas las tablas, con una política que
-- permite todo (leer/escribir) a cualquiera que use la llave pública (anon)
-- del proyecto — el mismo nivel de acceso que tiene la app hoy sin backend.
-- ============================================================================
do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'inventory_items','operatives','garment_rate_groups','task_rates',
      'production_entries','payroll_payments','thread_consumption_logs',
      'expense_records','income_records','activity_orders','notifications',
      'facturas','factura_funciones','factura_asignaciones'
    ])
  loop
    execute format('alter table %I enable row level security;', t);
    execute format(
      'drop policy if exists "allow_all_%1$s" on %1$I;', t
    );
    execute format(
      'create policy "allow_all_%1$s" on %1$I for all using (true) with check (true);', t
    );
  end loop;
end $$;

-- ============================================================================
-- ¡Listo! Si ves "Success" arriba, las 14 tablas y sus políticas ya existen.
-- Siguiente paso: ve a Project Settings -> API y copia el "Project URL" y la
-- "anon public key" — esos dos valores son los que necesita la app.
-- ============================================================================
