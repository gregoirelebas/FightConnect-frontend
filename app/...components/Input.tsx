'use client';

import { useState } from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  className?: string;
  type?: string | undefined;
  pattern?: RegExp | undefined;
  value: string | number;
  min?: number | undefined;
  max?: number | undefined;
  required?: boolean | undefined;
  error?: string;
  onChange: (value: string | number) => void;
  onValidate?: () => void;
}

/**
 * Input component for capturing user text input with optional validation on Enter key.
 * @param props - The input component props
 * @param props.label - Display label for the input field
 * @param props.placeholder - Placeholder text shown when input is empty
 * @param props.value - Current value of the input field
 * @param props.type - HTML input type (defaults to 'text')
 * @param props.className - Additional CSS classes to apply to the input element
 * @param props.onChange - Callback function triggered when input value changes
 * @param props.onValidate - Optional callback function triggered when Enter key is pressed
 * @returns A JSX element containing a labeled input field with optional validation
 */
export default function Input(props: InputProps) {
  const [isValid, setIsValid] = useState<boolean>(true);

  const checkValidPattern = () => {
    if (props.pattern && props.value) {
      setIsValid(props.pattern.test(String(props.value)));
    }
  };

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      checkValidPattern();

      if (props.onValidate) {
        props.onValidate();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>{props.label}</div>
      <input
        className={`input ${props.className ? props.className : ''}
        ${isValid ? '' : 'border-error'}`}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        min={props.min}
        max={props.max}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
        onBlur={() => checkValidPattern()}
        onKeyDownCapture={(e) => handleKeyDown(e.key)}
      />
      {!isValid && <span className=" text-sm mt-1 text-error">{props.error}</span>}
    </div>
  );
}
