import React from 'react';
import PageHeader from './components/PageHeader/PageHeader.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import PreviewPanel from './components/PreviewPanel/PreviewPanel.jsx';
import { useCardState } from './hooks/useCardState.js';
import { downloadPDF, downloadPNG, printCards } from './utils/cardExport.js';

export default function App() {
  const cardState = useCardState();

  return (
    <>
      <PageHeader />
      <div className="app-layout">
        <Sidebar
          cardState={cardState}
          onGenerate={cardState.generate}
          onDownloadPDF={() => downloadPDF(cardState.cardBgColor)}
          onDownloadPNG={() => downloadPNG(cardState.cardBgColor)}
          onPrint={printCards}
        />
        <PreviewPanel cardState={cardState} />
      </div>
    </>
  );
}
