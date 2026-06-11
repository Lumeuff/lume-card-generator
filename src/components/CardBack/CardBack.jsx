import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './CardBack.css';

function WavesSVG() {
  const paths = Array.from({ length: 12 }, (_, i) => {
    const x = 358 + i * 13;
    return `M ${x} -20 C ${x+140} 75, ${x-110} 185, ${x+55} 250 C ${x+220} 315, ${x-90} 378, ${x+55} 448`;
  });
  return (
    <svg className="card__waves" viewBox="0 0 648 408" preserveAspectRatio="none">
      <g stroke="rgba(255,255,255,0.11)" strokeWidth="1.3" fill="none">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}

export default function CardBack({
  cardBgColor, bgURL,
  qrContent, fontSizes,
}) {
  const cardStyle = { '--card-bg': cardBgColor };

  return (
    <div className="card card-back" id="card-back" style={cardStyle}>
      {bgURL && <img className="card__bg-image" src={bgURL} alt="" />}

      <WavesSVG />

      {/* ── Info text – left center ───────────────────── */}
      <div
        className="card-back__info"
        style={{ fontSize: fontSizes['back-info'] + 'px' }}
      >
        Uso pessoal e intransferível.
        Válida para identificação nos serviços
        do ecossistema LUME
        em unidades da UFF.
        <br /><br />
        Em caso de perda ou roubo,
        comunique imediatamente.
        <br /><br />
        Mais informações:{' '}
        <strong>lumeuff.me</strong>
      </div>

      {/* ── QR panel – right ──────────────────────────── */}
      <div className="card-back__qr-panel">
        <p
          className="card-back__qr-title"
          style={{ fontSize: fontSizes['qr-title'] + 'px' }}
        >
          Este é o QR Code<br />da sua carteirinha<br />digital.
        </p>

        <div className="card-back__qr-code">
          <QRCodeSVG
            value={qrContent}
            size={130}
            fgColor="#1a3a5c"
            bgColor="transparent"
            level="M"
          />
        </div>

        <div className="card-back__qr-divider" />

        <p
          className="card-back__qr-caption"
          style={{ fontSize: fontSizes['qr-caption'] + 'px' }}
        >
          Escaneie para visualizar<br />
          o seu perfil na plataforma<br />
          <strong>Lume Personality</strong>
        </p>
      </div>

      {/* ── LUME logo – bottom left ───────────────────── */}
      <div
        className="card-back__lume-logo"
        style={{ fontSize: fontSizes['lume-back-logo'] + 'px' }}
      >
        <span className="card-back__lume-wordmark">LUME</span>
        <span className="card-back__lume-sep">|</span>
        <span className="card-back__lume-sub">
          Movimento de<br />Estudantes da UFF
        </span>
      </div>

      {/* ── NFC ───────────────────────────────────────── */}
      <div className="card__nfc">
        <div className="card__nfc-ring"></div>
        <span className="card__nfc-label">NFC</span>
      </div>
    </div>
  );
}
