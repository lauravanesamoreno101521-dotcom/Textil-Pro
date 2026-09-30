// Prefactura (documento provisional para que el cliente pague la tarea),
// generada automáticamente a partir de los datos de la Factura que ya se
// ingresó. Formato PROVISIONAL: en cuanto la usuaria comparta el modelo real
// que usa el taller, se actualiza solo esta plantilla — el resto del enlace
// (Factura -> Prefactura) no cambia.
import { Factura } from '../types';
import { formatCOP } from './format';
import { formatDateEs } from './deliveryDeadline';

export function openPrintablePrefactura(factura: Factura): void {
  const win = window.open('', '_blank', 'width=460,height=680');
  if (!win) return;

  const empresaLabel = factura.empresa === 'COOLKIDS' ? 'Coolkids' : 'Imperium';
  const fechaIngreso = factura.entryDateISO ? formatDateEs(factura.entryDateISO) : '—';
  const fechaLimite = factura.dueDateISO ? formatDateEs(factura.dueDateISO) : '—';

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Prefactura — ${factura.facturaNumero}</title>
<style>
  body { font-family: 'Courier New', monospace; padding: 24px; color: #151c27; }
  h1 { font-size: 16px; color: #ca2164; margin: 0 0 2px; }
  p.sub { font-size: 11px; color: #7a7583; margin: 0 0 4px; }
  .badge { display: inline-block; font-size: 10px; font-weight: bold; color: #9a3412; background: #ffedd5; border: 1px solid #fb923c55; padding: 2px 8px; border-radius: 999px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  td { padding: 6px 0; font-size: 13px; border-bottom: 1px dashed #cac4d4; }
  td.label { color: #494552; }
  td.value { text-align: right; font-weight: bold; }
  .total { margin-top: 14px; padding-top: 10px; border-top: 2px solid #151c27; display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #006c4b; }
  .footer { margin-top: 30px; font-size: 10px; color: #7a7583; text-align: center; }
</style>
</head>
<body>
  <h1>TextilePro — Prefactura</h1>
  <p class="sub">Documento provisional para gestionar el pago de esta tarea</p>
  <span class="badge">Formato provisional — pendiente del modelo oficial</span>
  <table>
    <tr><td class="label">Empresa Cliente</td><td class="value">${empresaLabel}</td></tr>
    <tr><td class="label">N.º Factura</td><td class="value">${factura.facturaNumero}</td></tr>
    <tr><td class="label">Descripción</td><td class="value">${factura.descripcion}</td></tr>
    <tr><td class="label">Cantidad</td><td class="value">${(factura.cantidad || 0).toLocaleString('es-CO')} pzas</td></tr>
    <tr><td class="label">Valor Unitario</td><td class="value">${factura.valorUnitario !== null ? formatCOP(factura.valorUnitario, 1) : '—'}</td></tr>
    <tr><td class="label">Fecha de Ingreso</td><td class="value">${fechaIngreso}</td></tr>
    <tr><td class="label">Fecha Límite de Entrega</td><td class="value">${fechaLimite}</td></tr>
  </table>
  <div class="total"><span>Total a Pagar</span><span>${formatCOP(factura.totalFactura)}</span></div>
  <p class="footer">Documento generado automáticamente por TextilePro a partir de la factura registrada en el sistema.</p>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}
