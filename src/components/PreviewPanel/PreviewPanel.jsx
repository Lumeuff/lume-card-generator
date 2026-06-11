import React from 'react';
import CardFront from '../CardFront/CardFront.jsx';
import CardBack from '../CardBack/CardBack.jsx';
import './PreviewPanel.css';

export default function PreviewPanel({ cardState }) {
  const {
    cardBgColor, bgURL,
    displayInstituto, displayNome, displayCurso, displayTurma, displayTermino,
    photoURL, fontSizes, qrContent,
  } = cardState;

  return (
    <main className="preview-panel">
      <div className="preview-panel__wrapper">
        <div className="preview-panel__label">Frente</div>
        <CardFront
          cardBgColor={cardBgColor}
          bgURL={bgURL}
          displayInstituto={displayInstituto}
          displayNome={displayNome}
          displayCurso={displayCurso}
          displayTurma={displayTurma}
          displayTermino={displayTermino}
          photoURL={photoURL}
          fontSizes={fontSizes}
        />
      </div>

      <div className="preview-panel__wrapper">
        <div className="preview-panel__label">Verso</div>
        <CardBack
          cardBgColor={cardBgColor}
          bgURL={bgURL}
          qrContent={qrContent}
          fontSizes={fontSizes}
        />
      </div>
    </main>
  );
}
