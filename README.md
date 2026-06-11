# 🎓 LUME Card Generator

Gerador de carteirinhas digitais para o Movimento de Estudantes da UFF — LUME.

## Stack
- **React 18** + **Vite 4**
- CSS modular por componente com **variáveis CSS**
- Nomenclatura **BEM** em todas as classes
- Export via **html2canvas** + **jsPDF**
- QR Code via **qrcode.react**

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Servidor de desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

## Estrutura

```
src/
├── variables.css              ← tokens de cor e dimensão
├── App.jsx / App.css
├── assets/
│   └── brasao-lume.png
├── components/
│   ├── PageHeader/
│   ├── Sidebar/
│   ├── FormField/
│   ├── UploadArea/
│   ├── FontControl/
│   ├── CardFront/             ← frente do cartão
│   ├── CardBack/              ← verso do cartão
│   └── PreviewPanel/
├── hooks/
│   └── useCardState.js        ← toda a lógica de estado
└── utils/
    └── cardExport.js          ← PDF, PNG, Imprimir
```

## Dimensões
Cartão físico CR-80: **85,6 × 54 mm** (padrão PVC/NFC).
