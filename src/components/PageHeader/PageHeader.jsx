import React from 'react';
import './PageHeader.css';

export default function PageHeader() {
  return (
    <header className="page-header">
      <div className="page-header__brand">
        <span className="page-header__lume">LUME</span>
        <span className="page-header__divider">|</span>
        <span className="page-header__sub">Movimento de Estudantes da UFF</span>
      </div>
      <div className="page-header__title">
        Gerador de Carteirinha
      </div>
    </header>
  );
}
