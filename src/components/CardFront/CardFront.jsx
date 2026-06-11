import React from 'react';
import brasaoLume from '../../assets/brasao-lume.png';
import './CardFront.css';

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

export default function CardFront({
  cardBgColor, bgURL,
  displayInstituto, displayNome,
  displayCurso, displayTurma, displayTermino,
  photoURL, fontSizes,
  cardScale = 0.75,
  cardMarginBottom,
}) {
  const mb = cardMarginBottom !== undefined ? cardMarginBottom : (cardScale - 1) * 408;

  const cardStyle = {
    '--card-bg': cardBgColor,
    transform: `scale(${cardScale})`,
    marginBottom: `${mb}px`,
  };

  return (
    <div className="card card-front" id="card-front" style={cardStyle}>
      {bgURL && <img className="card__bg-image" src={bgURL} alt="" />}

      <WavesSVG />

      {/* LUME branding — top right */}
      <div className="card-front__brand">
        <img
          className="card-front__brand-brasao"
          src={brasaoLume}
          alt="Brasão LUME"
          style={{ height: fontSizes.brasao + 'px', width: 'auto' }}
        />
        <div className="card-front__brand-text">
          <span className="card-front__brand-name">LUME</span>
          <span className="card-front__brand-sub">Movimento de<br />Estudantes da UFF</span>
        </div>
      </div>

      {/* Student info — left */}
      <div className="card-front__info">
        <span className="card-front__info-label" style={{ fontSize: fontSizes['field-label'] + 'px' }}>Instituto</span>
        <p className="card-front__info-institution" style={{ fontSize: fontSizes.institution + 'px' }}>{displayInstituto}</p>

        <span className="card-front__info-label" style={{ fontSize: fontSizes['field-label'] + 'px' }}>Nome do Aluno</span>
        <p className="card-front__info-name" style={{ fontSize: fontSizes.name + 'px' }}>{displayNome}</p>

        <span className="card-front__info-label" style={{ fontSize: fontSizes['field-label'] + 'px' }}>Curso</span>
        <p className="card-front__info-value" style={{ fontSize: fontSizes['field-value'] + 'px' }}>{displayCurso}</p>

        <span className="card-front__info-label" style={{ fontSize: fontSizes['field-label'] + 'px' }}>Turma</span>
        <p className="card-front__info-value" style={{ fontSize: fontSizes['field-value'] + 'px' }}>{displayTurma}</p>

        <span className="card-front__info-label" style={{ fontSize: fontSizes['field-label'] + 'px' }}>Término Previsto</span>
        <p className="card-front__info-value" style={{ fontSize: fontSizes['field-value'] + 'px' }}>{displayTermino}</p>
      </div>

      {/* Photo — right */}
      <div className="card-front__photo">
        {photoURL
          ? <img className="card-front__photo-img" src={photoURL} alt="Foto" />
          : <span className="card-front__photo-placeholder">👤</span>
        }
      </div>

      {/* NFC */}
      <div className="card__nfc">
        <div className="card__nfc-ring"></div>
        <span className="card__nfc-label">NFC</span>
      </div>
    </div>
  );
}
