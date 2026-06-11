import React from 'react';
import { FormField, FormSelect } from '../FormField/FormField.jsx';
import './FontControl.css';

const FONT_TARGETS = [
  { value: 'name',            label: 'Nome do Aluno' },
  { value: 'institution',     label: 'Instituto' },
  { value: 'field-label',     label: 'Rótulos dos Campos' },
  { value: 'field-value',     label: 'Valores dos Campos' },
  { value: 'back-info',       label: 'Texto Informativo (Verso)' },
  { value: 'qr-title',        label: 'Título QR Code' },
  { value: 'qr-caption',      label: 'Legenda QR Code' },
  { value: 'lume-back-logo',  label: 'LUME Logo (Verso)' },
  { value: 'brasao',          label: 'Brasão (altura px)' },
];

const PRESETS = ['7','8','9','10','11','12','14','16','18','20','22','24','26','28','30','32','40','48','56','64'];

export default function FontControl({
  fontTarget, setFontTarget,
  presetSize, setPresetSize,
  customSize, setCustomSize,
  applyPreset, applyCustom, resetFontSizes,
  fontSizes,
}) {
  return (
    <div className="font-ctrl">
      <FormField label="Elemento do Cartão">
        <FormSelect value={fontTarget} onChange={setFontTarget}>
          {FONT_TARGETS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </FormSelect>
      </FormField>

      <FormField label="Tamanho Predefinido">
        <FormSelect
          value={presetSize}
          onChange={v => { setPresetSize(v); applyPreset(v); }}
        >
          <option value="">— Selecione —</option>
          {PRESETS.map(p => (
            <option key={p} value={p}>{p} px</option>
          ))}
        </FormSelect>
      </FormField>

      <FormField label="Tamanho Personalizado (px)">
        <div className="font-ctrl__row">
          <input
            className="font-ctrl__input"
            type="number"
            value={customSize}
            onChange={e => setCustomSize(e.target.value)}
            placeholder="Ex: 13"
            min="1"
            max="200"
          />
          <button className="font-ctrl__apply-btn" onClick={applyCustom}>
            Aplicar
          </button>
        </div>
      </FormField>

      <div className="font-ctrl__current">
        Tamanho atual: <strong>{fontSizes[fontTarget]}px</strong>
      </div>

      <button className="font-ctrl__reset-btn" onClick={resetFontSizes}>
        ↺ Resetar Tamanhos
      </button>
    </div>
  );
}
