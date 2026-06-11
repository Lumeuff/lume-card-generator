import React from 'react';
import { FormField, FormInput, FormSelect } from '../FormField/FormField.jsx';
import UploadArea from '../UploadArea/UploadArea.jsx';
import FontControl from '../FontControl/FontControl.jsx';
import './Sidebar.css';

export default function Sidebar({ cardState, onGenerate, onDownloadPDF, onDownloadPNG, onPrint }) {
  const {
    form, updateForm,
    photoURL, setPhotoURL, handlePhoto,
    bgURL, setBgURL, handleBg,
    cardBgColor, setCardBgColor,
    generated, clearAll,
    fontSizes, fontTarget, setFontTarget,
    presetSize, setPresetSize, customSize, setCustomSize,
    applyPreset, applyCustom, resetFontSizes,
  } = cardState;

  return (
    <aside className="sidebar">

      {/* ── Dados do estudante ─────────────────────────── */}
      <div className="sidebar__section-title">Dados do Estudante</div>

      <FormField label="Instituto">
        <FormInput
          value={form.instituto}
          onChange={v => updateForm('instituto', v)}
          placeholder="Ex: Instituto de Computação"
        />
      </FormField>

      <FormField label="Nome do Aluno">
        <FormInput
          value={form.nome}
          onChange={v => updateForm('nome', v)}
          placeholder="Nome completo"
        />
      </FormField>

      <FormField label="Curso">
        <FormInput
          value={form.curso}
          onChange={v => updateForm('curso', v)}
          placeholder="Ex: Ciência da Computação"
        />
      </FormField>

      <FormField label="Turma">
        <FormInput
          value={form.turma}
          onChange={v => updateForm('turma', v)}
          placeholder="Ex: CC2023.1"
        />
      </FormField>

      <FormField label="Término Previsto">
        <FormInput
          value={form.terminoPrevisto}
          onChange={v => updateForm('terminoPrevisto', v)}
          placeholder="Ex: DEZ/2027"
        />
      </FormField>

      <FormField label="Conteúdo do QR Code">
        <FormInput
          value={form.qr}
          onChange={v => updateForm('qr', v)}
          placeholder="URL ou texto"
        />
      </FormField>

      {/* ── Visual do cartão ───────────────────────────── */}
      <div className="sidebar__section-title">Visual do Cartão</div>

      <FormField label="Cor de Fundo">
        <div className="sidebar__color-row">
          <input
            className="sidebar__color-input"
            type="color"
            value={cardBgColor}
            onChange={e => setCardBgColor(e.target.value)}
          />
          <span className="sidebar__color-value">{cardBgColor.toUpperCase()}</span>
          <button
            className="sidebar__color-reset"
            onClick={() => setCardBgColor('#006DBF')}
            title="Resetar para azul LUME"
          >
            ↺
          </button>
        </div>
      </FormField>

      <FormField label="Imagem de Fundo (opcional)">
        <UploadArea
          previewURL={bgURL}
          onFile={setBgURL}
          icon="🖼"
          placeholder="Clique para carregar"
        />
        {bgURL && (
          <button className="sidebar__remove-btn" onClick={() => setBgURL(null)}>
            ✕ Remover imagem de fundo
          </button>
        )}
      </FormField>

      {/* ── Foto do estudante ─────────────────────────── */}
      <div className="sidebar__section-title">Foto do Estudante</div>

      <UploadArea
        previewURL={photoURL}
        onFile={setPhotoURL}
        icon="📷"
        placeholder="Clique para carregar"
      />
      {photoURL && (
        <button className="sidebar__remove-btn" onClick={() => setPhotoURL(null)}>
          ✕ Remover foto
        </button>
      )}

      {/* ── Tamanhos de fonte ─────────────────────────── */}
      <div className="sidebar__section-title">Tamanho de Fonte</div>
      <FontControl
        fontSizes={fontSizes}
        fontTarget={fontTarget}
        setFontTarget={setFontTarget}
        presetSize={presetSize}
        setPresetSize={setPresetSize}
        customSize={customSize}
        setCustomSize={setCustomSize}
        applyPreset={applyPreset}
        applyCustom={applyCustom}
        resetFontSizes={resetFontSizes}
      />

      {/* ── Ações principais ──────────────────────────── */}
      <div className="sidebar__actions">
        <button className="sidebar__btn sidebar__btn--primary" onClick={onGenerate}>
          Gerar Carteirinha
        </button>
        <button className="sidebar__btn sidebar__btn--secondary" onClick={clearAll}>
          Limpar
        </button>
      </div>

      {/* ── Exportar ──────────────────────────────────── */}
      {generated && (
        <div className="sidebar__export">
          <div className="sidebar__section-title" style={{ marginTop: 0 }}>Exportar</div>
          <div className="sidebar__export-row">
            <button className="sidebar__btn sidebar__btn--primary" onClick={onDownloadPDF}>
              📄 PDF
            </button>
            <button className="sidebar__btn sidebar__btn--secondary" onClick={onDownloadPNG}>
              🖼 PNG
            </button>
          </div>
          <button
            className="sidebar__btn sidebar__btn--secondary sidebar__btn--block"
            onClick={onPrint}
          >
            🖨 Imprimir
          </button>
        </div>
      )}

    </aside>
  );
}
