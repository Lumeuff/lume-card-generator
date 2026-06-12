import React, { useState, useEffect } from 'react';
import { FormField, FormInput, FormSelect } from '../FormField/FormField.jsx';
import UploadArea from '../UploadArea/UploadArea.jsx';
import FontControl from '../FontControl/FontControl.jsx';
import './Sidebar.css';
import { BiIdCard, BiImage } from 'react-icons/bi';

/* ── colour helpers ─────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function parseColorText(raw) {
  const s = raw.trim();
  // full hex  #rrggbb
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase();
  // short hex #rgb → #rrggbb
  if (/^#[0-9a-fA-F]{3}$/.test(s)) {
    const [, a, b, c] = s;
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase();
  }
  // rgb(r, g, b)
  const m = s.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (m) {
    const toH = n => Math.min(255, parseInt(n)).toString(16).padStart(2, '0');
    return `#${toH(m[1])}${toH(m[2])}${toH(m[3])}`;
  }
  return null;
}

/* ── Toggle switch ──────────────────────────────────── */
function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle">
      <span className="toggle__label">{label}</span>
      <span
        className={`toggle__track ${checked ? 'toggle__track--on' : ''}`}
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onChange(!checked)}
      >
        <span className="toggle__knob" />
      </span>
    </label>
  );
}

/* ── Colour section ─────────────────────────────────── */
function ColorSection({ cardBgColor, setCardBgColor, cardBgEnabled, setCardBgEnabled }) {
  // local text state for the hex/rgb input
  const [colorText, setColorText] = useState(cardBgColor);
  const [colorFormat, setColorFormat] = useState('hex'); // 'hex' | 'rgb'
  const [invalid, setInvalid] = useState(false);

  // Keep text in sync when color picker or external reset changes cardBgColor
  useEffect(() => {
    setColorText(colorFormat === 'rgb' ? hexToRgb(cardBgColor) : cardBgColor);
    setInvalid(false);
  }, [cardBgColor, colorFormat]);

  const handlePickerChange = e => {
    setCardBgColor(e.target.value);
    // text updates via the useEffect above
  };

  const handleTextChange = e => {
    setColorText(e.target.value);
    setInvalid(false);
    // live feedback: try to parse immediately
    const hex = parseColorText(e.target.value);
    if (hex) {
      setCardBgColor(hex);
      setInvalid(false);
    }
  };

  const handleTextBlur = () => {
    const hex = parseColorText(colorText);
    if (hex) {
      setCardBgColor(hex);
      setInvalid(false);
    } else {
      setInvalid(true);
      // revert to last valid
      setColorText(colorFormat === 'rgb' ? hexToRgb(cardBgColor) : cardBgColor);
      setTimeout(() => setInvalid(false), 1200);
    }
  };

  const handleFormatToggle = fmt => {
    setColorFormat(fmt);
    setColorText(fmt === 'rgb' ? hexToRgb(cardBgColor) : cardBgColor);
  };

  return (
    <div className="color-section">
      {/* Enable/disable toggle */}
      <Toggle
        label="Cor de fundo"
        checked={cardBgEnabled}
        onChange={setCardBgEnabled}
      />

      {/* Controls — greyed out when disabled */}
      <div className={`color-section__controls ${!cardBgEnabled ? 'color-section__controls--disabled' : ''}`}>

        {/* Row 1: picker + text input */}
        <div className="color-section__row">
          <input
            className="color-section__picker"
            type="color"
            value={cardBgColor}
            onChange={handlePickerChange}
            disabled={!cardBgEnabled}
            title="Seletor de cor"
          />
          <input
            className={`color-section__text ${invalid ? 'color-section__text--invalid' : ''}`}
            type="text"
            value={colorText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            disabled={!cardBgEnabled}
            placeholder="#006dbf"
            spellCheck={false}
            aria-label="Cor em hex ou rgb"
          />
          <button
            className="color-section__reset"
            onClick={() => setCardBgColor('#006DBF')}
            disabled={!cardBgEnabled}
            title="Resetar para azul LUME"
          >
            ↺
          </button>
        </div>

        {/* Row 2: format tabs */}
        <div className="color-section__format-tabs">
          <button
            className={`color-section__fmt-btn ${colorFormat === 'hex' ? 'color-section__fmt-btn--active' : ''}`}
            onClick={() => handleFormatToggle('hex')}
            disabled={!cardBgEnabled}
          >
            HEX
          </button>
          <button
            className={`color-section__fmt-btn ${colorFormat === 'rgb' ? 'color-section__fmt-btn--active' : ''}`}
            onClick={() => handleFormatToggle('rgb')}
            disabled={!cardBgEnabled}
          >
            RGB
          </button>
        </div>

        {invalid && (
          <p className="color-section__error">
            Formato inválido. Use #rrggbb, #rgb ou rgb(r, g, b).
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Sidebar ────────────────────────────────────────── */
export default function Sidebar({ cardState, onGenerate, onDownloadPDF, onDownloadPNG, onPrint }) {
  const {
    form, updateForm,
    photoURL, setPhotoURL, handlePhoto,
    bgURL, setBgURL, handleBg,
    cardBgColor, setCardBgColor,
    cardBgEnabled, setCardBgEnabled,
    generated, clearAll,
    fontSizes, fontTarget, setFontTarget,
    presetSize, setPresetSize, customSize, setCustomSize,
    applyPreset, applyCustom, resetFontSizes,
  } = cardState;

  return (
    <aside className="sidebar">

      {/* ── Dados ─────────────────────────────────────── */}
      <div className="sidebar__section-title">Dados do Estudante</div>

      <FormField label="Instituto">
        <FormInput value={form.instituto} onChange={v => updateForm('instituto', v)} placeholder="Ex: Instituto de Computação" />
      </FormField>
      <FormField label="Nome do Aluno">
        <FormInput value={form.nome} onChange={v => updateForm('nome', v)} placeholder="Nome completo" />
      </FormField>
      <FormField label="Curso">
        <FormInput value={form.curso} onChange={v => updateForm('curso', v)} placeholder="Ex: Ciência da Computação" />
      </FormField>
      <FormField label="Turma">
        <FormInput value={form.turma} onChange={v => updateForm('turma', v)} placeholder="Ex: CC2023.1" />
      </FormField>
      <FormField label="Término Previsto">
        <FormInput value={form.terminoPrevisto} onChange={v => updateForm('terminoPrevisto', v)} placeholder="Ex: DEZ/2027" />
      </FormField>
      <FormField label="Conteúdo do QR Code">
        <FormInput value={form.qr} onChange={v => updateForm('qr', v)} placeholder="URL ou texto" />
      </FormField>

      {/* ── Visual ────────────────────────────────────── */}
      <div className="sidebar__section-title">Visual do Cartão</div>

      <ColorSection
        cardBgColor={cardBgColor}
        setCardBgColor={setCardBgColor}
        cardBgEnabled={cardBgEnabled}
        setCardBgEnabled={setCardBgEnabled}
      />

      <div style={{ marginTop: 16 }}>
        <FormField label="Imagem de Fundo (opcional)">
          <UploadArea previewURL={bgURL} onFile={setBgURL} icon={<BiImage />} placeholder="Clique para carregar" />
          {bgURL && <button className="sidebar__remove-btn" onClick={() => setBgURL(null)}>✕ Remover imagem</button>}
        </FormField>
      </div>

      {/* ── Foto ──────────────────────────────────────── */}
      <div className="sidebar__section-title">Foto do Estudante</div>
	<FormField label="Foto do Estudante">
	      <UploadArea previewURL={photoURL} onFile={setPhotoURL} icon={<BiIdCard />} placeholder="Clique para carregar" />
	      {photoURL && <button className="sidebar__remove-btn" onClick={() => setPhotoURL(null)}>✕ Remover foto</button>}
	</FormField>
      {/* ── Fontes ────────────────────────────────────── */}
      <div className="sidebar__section-title">Tamanho de Fonte</div>
      <FontControl
        fontSizes={fontSizes} fontTarget={fontTarget} setFontTarget={setFontTarget}
        presetSize={presetSize} setPresetSize={setPresetSize}
        customSize={customSize} setCustomSize={setCustomSize}
        applyPreset={applyPreset} applyCustom={applyCustom} resetFontSizes={resetFontSizes}
      />

      {/* ── Ações ─────────────────────────────────────── */}
      <div className="sidebar__actions">
        <button className="sidebar__btn sidebar__btn--primary" onClick={onGenerate}>Gerar Carteirinha</button>
        <button className="sidebar__btn sidebar__btn--secondary" onClick={clearAll}>Limpar</button>
      </div>

      {/* ── Exportar ──────────────────────────────────── */}
      {generated && (
        <div className="sidebar__export">
          <div className="sidebar__section-title" style={{ marginTop: 0 }}>Exportar</div>
          <div className="sidebar__export-row">
            <button className="sidebar__btn sidebar__btn--primary" onClick={onDownloadPDF}>📄 PDF</button>
            <button className="sidebar__btn sidebar__btn--secondary" onClick={onDownloadPNG}>🖼 PNG</button>
          </div>
          <button className="sidebar__btn sidebar__btn--secondary sidebar__btn--block" onClick={onPrint}>🖨 Imprimir</button>
        </div>
      )}
    </aside>
  );
}
