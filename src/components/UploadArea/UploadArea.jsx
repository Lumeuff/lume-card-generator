import React, { useRef } from 'react';
import './UploadArea.css';

export default function UploadArea({ accept, previewURL, onFile, onClear, icon, placeholder }) {
  const inputRef = useRef(null);

  const handleChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onFile(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-area" onClick={() => inputRef.current?.click()}>
      <input
        className="upload-area__input"
        ref={inputRef}
        type="file"
        accept={accept || 'image/*'}
        onChange={handleChange}
      />
      {previewURL ? (
        <img className="upload-area__preview" src={previewURL} alt="preview" />
      ) : (
        <>
          <span className="upload-area__icon">{icon || '📁'}</span>
          <span className="upload-area__text">{placeholder || 'Clique para carregar'}</span>
        </>
      )}
    </div>
  );
}
