export interface RadioButtonProps {
  name: string;
  value: string | undefined;
  currentValue?: string;
  label: string;
  description?: string;
  isChecked?: boolean;
  onChange: (value: string) => void;
}

/**
 * A customizable radio button component with label and optional description.
 *
 * @component
 * @example
 * <RadioButton
 *   name="options"
 *   value="option1"
 *   label="Option 1"
 *   isChecked={false}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * @param {RadioButtonProps} props - The component props
 * @param {string} props.name - The name attribute for the radio input
 * @param {string} props.value - The value of the radio button
 * @param {string} props.label - The label text displayed next to the radio button
 * @param {boolean} [props.isChecked] - Whether the radio button is checked (default: false)
 * @param {string} [props.description] - Optional description text displayed below the label
 * @param {(value: string) => void} props.onChange - Callback function invoked when the radio button value changes
 * @returns {JSX.Element} A styled radio button with label and optional description
 */
export default function RadioButton(props: RadioButtonProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          name={props.name}
          type="radio"
          checked={props.currentValue ? props.value === props.currentValue : undefined}
          defaultChecked={props.isChecked ? props.isChecked : false}
          value={props.value}
          className="peer sr-only"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="w-5 h-5 rounded-full border-2 border-grey peer-checked:border-accent transition-all duration-200 group-hover:border-accent"></div>
        <div className="absolute w-2.5 h-2.5 rounded-full bg-accent scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
      </div>
      <div className="flex-1">
        <div className="text-white group-hover:text-accent transition-colors duration-200">
          {props.label}
        </div>
        {props.description && <div className="text-sm text-grey mt-1">{props.description}</div>}
      </div>
    </label>
  );
}
