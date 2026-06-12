import React, { useState } from 'react';
import PageHeader from './components/PageHeader/PageHeader.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import PreviewPanel from './components/PreviewPanel/PreviewPanel.jsx';
import { useCardState } from './hooks/useCardState.js';
import { downloadPDF, downloadPNG, printCards } from './utils/cardExport.js';

export default function App() {
  const cardState = useCardState();
  const [activeTab, setActiveTab] = useState('form');

  return (
    <>
      <PageHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-layout">
        <div className={`app-layout__panel app-layout__panel--sidebar ${activeTab === 'form' ? 'app-layout__panel--active' : ''}`}>
          <Sidebar
            cardState={cardState}
            onGenerate={() => { cardState.generate(); setActiveTab('preview'); }}
            onDownloadPDF={() => downloadPDF(cardState.effectiveCardBg)}
            onDownloadPNG={() => downloadPNG(cardState.effectiveCardBg)}
            onPrint={printCards}
          />
        </div>
        <div className={`app-layout__panel app-layout__panel--preview ${activeTab === 'preview' ? 'app-layout__panel--active' : ''}`}>
          <PreviewPanel cardState={cardState} />
        </div>
      </div>
    </>
  );
}
