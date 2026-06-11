import React, { useRef, useState, useEffect } from 'react';
import CardFront from '../CardFront/CardFront.jsx';
import CardBack from '../CardBack/CardBack.jsx';
import './PreviewPanel.css';

function useCardScale(containerRef, cardW = 648, maxScale = 0.75, padding = 40) {
  const [scale, setScale] = useState(maxScale);
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      setScale(Math.min(maxScale, (w - padding) / cardW));
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [containerRef, cardW, maxScale, padding]);
  return scale;
}

export default function PreviewPanel({ cardState }) {
  const {
    effectiveCardBg, bgURL,
    displayInstituto, displayNome, displayCurso, displayTurma, displayTermino,
    photoURL, fontSizes, qrContent,
  } = cardState;

  const containerRef = useRef(null);
  const cardScale = useCardScale(containerRef);
  const cardMarginBottom = (cardScale - 1) * 408;

  return (
    <main className="preview-panel" ref={containerRef}>
      <div className="preview-panel__wrapper">
        <div className="preview-panel__label">Frente</div>
        <CardFront
          cardBgColor={effectiveCardBg}
          bgURL={bgURL}
          displayInstituto={displayInstituto}
          displayNome={displayNome}
          displayCurso={displayCurso}
          displayTurma={displayTurma}
          displayTermino={displayTermino}
          photoURL={photoURL}
          fontSizes={fontSizes}
          cardScale={cardScale}
          cardMarginBottom={cardMarginBottom}
        />
      </div>
      <div className="preview-panel__wrapper">
        <div className="preview-panel__label">Verso</div>
        <CardBack
          cardBgColor={effectiveCardBg}
          bgURL={bgURL}
          qrContent={qrContent}
          fontSizes={fontSizes}
          cardScale={cardScale}
          cardMarginBottom={cardMarginBottom}
        />
      </div>
    </main>
  );
}
