import React from 'react';
import './FormField.css';

export function FormField({ label, children }) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {children}
    </div>
  );
}

export function FormInput({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      className="form-field__input"
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export function FormSelect({ value, onChange, children }) {
  return (
    <select
      className="form-field__select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {children}
    </select>
  );
}
