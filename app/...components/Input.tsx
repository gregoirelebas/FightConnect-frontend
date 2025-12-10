interface InputProps {
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  pattern?: string;
  value: string | number;
  required?: boolean;
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
  const handleKeyDown = (key: string) => {
    if (key === 'Enter' && props.onValidate) {
      props.onValidate();
    }
  };

  return (
    <div>
      <div>{props.label}</div>
      <input
        className={`${props.className ? props.className : ''} input`}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type ? props.type : 'text'}
        pattern={props.pattern ? props.pattern : undefined}
        required={props.required ? props.required : false}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDownCapture={(e) => handleKeyDown(e.key)}
      />
    </div>
  );
}
