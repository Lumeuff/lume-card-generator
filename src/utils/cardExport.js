import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

async function captureCard(id, cardBgColor) {
  const card = document.getElementById(id);
  if (!card) return null;
  const origT = card.style.transform;
  const origM = card.style.marginBottom;
  card.style.transform = 'none';
  card.style.marginBottom = '0';
  await new Promise(r => setTimeout(r, 80));
  const canvas = await html2canvas(card, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: cardBgColor || '#006DBF',
    width: 648,
    height: 408,
    scrollX: 0,
    scrollY: 0,
    logging: false,
    imageTimeout: 0,
    onclone: (_doc, el) => {
      el.style.transform = 'none';
      el.style.marginBottom = '0';
    },
  });
  card.style.transform = origT;
  card.style.marginBottom = origM;
  return canvas;
}

export async function downloadPDF(cardBgColor) {
  const front = await captureCard('card-front', cardBgColor);
  const back  = await captureCard('card-back',  cardBgColor);
  if (!front || !back) return;
  const W = 85.6, H = 54;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [W, H] });
  pdf.addImage(front.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, W, H);
  pdf.addPage([W, H], 'landscape');
  pdf.addImage(back.toDataURL('image/jpeg', 0.98),  'JPEG', 0, 0, W, H);
  pdf.save('carteirinha-lume.pdf');
}

export async function downloadPNG(cardBgColor) {
  const front = await captureCard('card-front', cardBgColor);
  const back  = await captureCard('card-back',  cardBgColor);
  if (!front || !back) return;
  const GAP = 40;
  const canvas = document.createElement('canvas');
  canvas.width  = front.width;
  canvas.height = front.height + GAP + back.height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(front, 0, 0);
  ctx.drawImage(back, 0, front.height + GAP);
  const link = document.createElement('a');
  link.download = 'carteirinha-lume.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function printCards() {
  const frontSrc = document.getElementById('card-front');
  const backSrc  = document.getElementById('card-back');
  const fp = document.getElementById('print-front-page');
  const bp = document.getElementById('print-back-page');
  if (!frontSrc || !backSrc || !fp || !bp) return;
  fp.innerHTML = '';
  bp.innerHTML = '';
  const sf = (85.6 / 25.4 * 96) / 648;
  [frontSrc, backSrc].forEach((src, i) => {
    const clone = src.cloneNode(true);
    clone.style.transformOrigin = 'top left';
    clone.style.transform = `scale(${sf})`;
    clone.style.width = '648px';
    clone.style.height = '408px';
    clone.style.borderRadius = '0';
    clone.style.boxShadow = 'none';
    (i === 0 ? fp : bp).appendChild(clone);
  });
  window.print();
}
