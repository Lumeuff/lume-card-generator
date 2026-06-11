import { useState, useEffect, useRef } from 'react';

const DEFAULT_FONT_SIZES = {
  name:              26,
  institution:       14,
  'field-label':     10,
  'field-value':     13,
  'back-info':        9,
  'qr-title':        10,
  'qr-caption':       9,
  'lume-back-logo':  18,
  brasao:            52,
};

const PRESETS = ['7','8','9','10','11','12','14','16','18','20','22','24','26','28','30','32','40','48','56','64'];

export function useCardState() {
  // ── Form ──────────────────────────────────────────────
  const [form, setForm] = useState({
    instituto: '', nome: '', curso: '',
    turma: '', terminoPrevisto: '', qr: '',
  });
  const updateForm = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  // ── Assets ────────────────────────────────────────────
  const [photoURL,      setPhotoURL]      = useState(null);
  const [bgURL,         setBgURL]         = useState(null);
  const [cardBgColor,   setCardBgColor]   = useState('#006DBF');
  const [cardBgEnabled, setCardBgEnabled] = useState(true);
  const [generated,     setGenerated]     = useState(false);

  const photoInputRef = useRef(null);
  const bgInputRef    = useRef(null);

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoURL(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleBg = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setBgURL(ev.target.result);
    reader.readAsDataURL(file);
  };

  // effectiveCardBg: when disabled the card has no colour fill
  const effectiveCardBg = cardBgEnabled ? cardBgColor : 'transparent';

  // ── Font sizes ────────────────────────────────────────
  const [fontSizes,  setFontSizes]  = useState({ ...DEFAULT_FONT_SIZES });
  const [fontTarget, setFontTarget] = useState('name');
  const [presetSize, setPresetSize] = useState('');
  const [customSize, setCustomSize] = useState('');

  useEffect(() => {
    const cur = String(fontSizes[fontTarget]);
    setPresetSize(PRESETS.includes(cur) ? cur : '');
    setCustomSize(cur);
  }, [fontTarget]);

  const applyPreset = val => {
    if (!val) return;
    const n = parseFloat(val);
    setFontSizes(prev => ({ ...prev, [fontTarget]: n }));
    setCustomSize(val); setPresetSize(val);
  };

  const applyCustom = () => {
    const v = parseFloat(customSize);
    if (!isNaN(v) && v >= 1 && v <= 200) {
      setFontSizes(prev => ({ ...prev, [fontTarget]: v }));
      setPresetSize(PRESETS.includes(String(v)) ? String(v) : '');
    }
  };

  const resetFontSizes = () => {
    setFontSizes({ ...DEFAULT_FONT_SIZES });
    const cur = String(DEFAULT_FONT_SIZES[fontTarget]);
    setPresetSize(PRESETS.includes(cur) ? cur : '');
    setCustomSize(cur);
  };

  // ── Actions ───────────────────────────────────────────
  const generate = () => setGenerated(true);

  const clearAll = () => {
    setForm({ instituto:'', nome:'', curso:'', turma:'', terminoPrevisto:'', qr:'' });
    setPhotoURL(null); setBgURL(null);
    setCardBgColor('#006DBF'); setCardBgEnabled(true);
    setGenerated(false);
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (bgInputRef.current)    bgInputRef.current.value    = '';
  };

  // ── Display helpers ───────────────────────────────────
  const displayNome      = (form.nome      || 'NOME DO ALUNO').toUpperCase();
  const displayInstituto = form.instituto  || 'Instituto';
  const displayCurso     = form.curso      || '—';
  const displayTurma     = form.turma      || '—';
  const displayTermino   = form.terminoPrevisto || '—';
  const qrContent        = form.qr         || 'https://lumeuff.me';

  return {
    form, updateForm,
    photoURL, setPhotoURL, photoInputRef, handlePhoto,
    bgURL, setBgURL, bgInputRef, handleBg,
    cardBgColor, setCardBgColor,
    cardBgEnabled, setCardBgEnabled,
    effectiveCardBg,
    generated, generate, clearAll,
    fontSizes, fontTarget, setFontTarget,
    presetSize, setPresetSize, customSize, setCustomSize,
    applyPreset, applyCustom, resetFontSizes,
    displayNome, displayInstituto, displayCurso,
    displayTurma, displayTermino, qrContent,
    PRESETS,
  };
}
