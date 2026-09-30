// Genera el recibo de pago de nómina de un operario: una versión imprimible
// (se abre en una pestaña nueva lista para imprimir o guardar como PDF) y una
// versión en IMAGEN lista para enviar por WhatsApp — así llega como una foto
// del recibo, no como un mensaje de texto suelto.
import { PayrollPayment } from '../types';
import { formatCOP } from './format';
import { formatDateEs } from './deliveryDeadline';

export function buildReceiptMessage(payment: PayrollPayment): string {
  const lines = [
    'TextilePro — Recibo de Pago de Nómina',
    '',
    `Operario: ${payment.operativeName}`,
    `Período: ${payment.periodLabel}`,
    `Piezas: ${payment.totalQty.toLocaleString('es-CO')}`,
    `Total pagado: ${formatCOP(payment.totalPay)}`,
    `Fecha de pago: ${formatDateEs(payment.paidDateISO)}`
  ];
  return lines.join('\n');
}

// Abre una pestaña nueva con el recibo formateado y lanza el diálogo de
// impresión del navegador. El admin puede imprimirlo o guardarlo como PDF.
export function openPrintableReceipt(payment: PayrollPayment): void {
  const win = window.open('', '_blank', 'width=420,height=640');
  if (!win) return;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Recibo de Pago — ${payment.operativeName}</title>
<style>
  body { font-family: 'Courier New', monospace; padding: 24px; color: #151c27; }
  h1 { font-size: 16px; color: #ca2164; margin: 0 0 4px; }
  p.sub { font-size: 11px; color: #7a7583; margin: 0 0 20px; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; }
  td { padding: 6px 0; font-size: 13px; border-bottom: 1px dashed #cac4d4; }
  td.label { color: #494552; }
  td.value { text-align: right; font-weight: bold; }
  .total { margin-top: 14px; padding-top: 10px; border-top: 2px solid #151c27; display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #006c4b; }
  .footer { margin-top: 30px; font-size: 10px; color: #7a7583; text-align: center; }
</style>
</head>
<body>
  <h1>TextilePro — Recibo de Pago de Nómina</h1>
  <p class="sub">Taller de confección · Documento generado automáticamente</p>
  <table>
    <tr><td class="label">Operario</td><td class="value">${payment.operativeName}</td></tr>
    <tr><td class="label">Período</td><td class="value">${payment.periodLabel}</td></tr>
    <tr><td class="label">Piezas</td><td class="value">${payment.totalQty.toLocaleString('es-CO')}</td></tr>
    <tr><td class="label">Fecha de pago</td><td class="value">${formatDateEs(payment.paidDateISO)}</td></tr>
  </table>
  <div class="total"><span>Total Pagado</span><span>${formatCOP(payment.totalPay)}</span></div>
  <p class="footer">Recibí a satisfacción el pago descrito arriba.<br /><br />______________________________<br />Firma del operario</p>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}

const RECEIPT_WIDTH = 640;
const RECEIPT_HEIGHT = 860;

// Dibuja el recibo en un <canvas> (mismos datos que la versión imprimible)
// para poder convertirlo en una imagen PNG real.
function drawReceiptCanvas(payment: PayrollPayment): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const scale = 2; // más nítido al verlo en el celular
  canvas.width = RECEIPT_WIDTH * scale;
  canvas.height = RECEIPT_HEIGHT * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(scale, scale);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, RECEIPT_WIDTH, RECEIPT_HEIGHT);

  const marginX = 44;
  let y = 64;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ca2164';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('TextilePro — Recibo de Pago de Nómina', marginX, y);
  y += 24;

  ctx.fillStyle = '#7a7583';
  ctx.font = '13px Arial, sans-serif';
  ctx.fillText('Taller de confección · Documento generado automáticamente', marginX, y);
  y += 34;

  ctx.strokeStyle = '#cac4d4';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginX, y);
  ctx.lineTo(RECEIPT_WIDTH - marginX, y);
  ctx.stroke();
  y += 40;

  const rows: [string, string][] = [
    ['Operario', payment.operativeName],
    ['Período', payment.periodLabel],
    ['Piezas', payment.totalQty.toLocaleString('es-CO')],
    ['Fecha de pago', formatDateEs(payment.paidDateISO)]
  ];

  rows.forEach(([label, value]) => {
    ctx.fillStyle = '#494552';
    ctx.font = '15px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, marginX, y);

    ctx.fillStyle = '#151c27';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(value, RECEIPT_WIDTH - marginX, y);

    y += 18;
    ctx.strokeStyle = '#cac4d4';
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(marginX, y);
    ctx.lineTo(RECEIPT_WIDTH - marginX, y);
    ctx.stroke();
    ctx.setLineDash([]);
    y += 26;
  });

  y += 10;
  ctx.strokeStyle = '#151c27';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(marginX, y);
  ctx.lineTo(RECEIPT_WIDTH - marginX, y);
  ctx.stroke();
  y += 36;

  ctx.fillStyle = '#151c27';
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Total Pagado', marginX, y);

  ctx.fillStyle = '#006c4b';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(formatCOP(payment.totalPay), RECEIPT_WIDTH - marginX, y);

  y += 100;
  ctx.fillStyle = '#494552';
  ctx.font = '13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Recibí a satisfacción el pago descrito arriba.', RECEIPT_WIDTH / 2, y);

  y += 56;
  ctx.strokeStyle = '#7a7583';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(RECEIPT_WIDTH / 2 - 110, y);
  ctx.lineTo(RECEIPT_WIDTH / 2 + 110, y);
  ctx.stroke();

  y += 18;
  ctx.fillStyle = '#7a7583';
  ctx.font = '11px Arial, sans-serif';
  ctx.fillText('Firma del operario', RECEIPT_WIDTH / 2, y);

  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95));
}

// Arma el recibo como archivo de imagen (PNG) listo para compartir o descargar.
export async function buildReceiptImageFile(payment: PayrollPayment): Promise<File | null> {
  const canvas = drawReceiptCanvas(payment);
  const blob = await canvasToBlob(canvas);
  if (!blob) return null;
  const safeName = payment.operativeName.replace(/[^a-zA-Z0-9]+/g, '_');
  return new File([blob], `Recibo_${safeName}_${payment.paidDateISO}.png`, { type: 'image/png' });
}

function downloadReceiptImage(file: File): void {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// Envía el recibo por WhatsApp como FOTO (no como texto). En celular, usa el
// panel nativo de "Compartir" del navegador (funciona en Chrome/Android y
// Safari/iOS): ahí el jefe elige WhatsApp y el recibo llega adjunto como
// imagen. Si el navegador no soporta compartir archivos (típico en
// computadores de escritorio), se descarga la foto del recibo y se abre
// WhatsApp con el chat listo para adjuntarla manualmente — WhatsApp Web no
// permite adjuntar archivos automáticamente desde un enlace, así que ese
// último paso manual es inevitable en ese caso.
export async function openWhatsAppReceipt(payment: PayrollPayment, phone?: string): Promise<void> {
  const file = await buildReceiptImageFile(payment);
  const caption = `Recibo de pago — ${payment.operativeName} (${payment.periodLabel})`;

  if (file && typeof navigator.share === 'function') {
    const canShareFiles =
      typeof navigator.canShare !== 'function' || navigator.canShare({ files: [file] });
    if (canShareFiles) {
      try {
        await navigator.share({ files: [file], title: 'Recibo de Pago', text: caption });
        return;
      } catch {
        // El jefe cerró el panel de compartir sin elegir nada, o el navegador
        // lo rechazó: seguimos con el respaldo de descargar + abrir WhatsApp.
      }
    }
  }

  if (file) downloadReceiptImage(file);

  const text = encodeURIComponent(
    file
      ? `${caption}\n\n(Se descargó la foto del recibo — adjúntala aquí antes de enviar)`
      : caption
  );
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
  const base = cleanPhone ? `https://wa.me/${cleanPhone}` : 'https://wa.me/';
  window.open(`${base}?text=${text}`, '_blank');
}
