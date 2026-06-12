import React from 'react';
import './PageHeader.css';

export default function PageHeader({ activeTab, setActiveTab }) {
  return (
    <header className="page-header">
      <div className="page-header__brand">
        <span className="page-header__lume">LUME</span>
        <span className="page-header__divider">|</span>
        <span className="page-header__sub">Movimento de Estudantes da UFF</span>
      </div>

      <span className="page-header__title">Gerador de Carteirinha</span>

      {/* Tab switcher — mobile only */}
      <nav className="page-header__tabs" aria-label="Navegação mobile">
        <button
          className={`page-header__tab ${activeTab === 'form' ? 'page-header__tab--active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          ✏️ Dados
        </button>
        <button
          className={`page-header__tab ${activeTab === 'preview' ? 'page-header__tab--active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          🪪 Cartão
        </button>
      </nav>
    </header>
  );
}
