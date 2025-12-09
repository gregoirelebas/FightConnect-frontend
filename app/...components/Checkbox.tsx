interface CheckboxProps {
  name: string;
  value: string;
  label: string;
  description?: string;
  isChecked?: boolean;
  onChange: (isChecked: boolean, value: string) => void;
}

/**
 * A customizable checkbox component with label and optional description.
 *
 * Features a styled checkbox with hover effects, peer-based styling for the visual indicator,
 * and support for descriptions below the label text.
 *
 * @param props - The checkbox component props
 * @param props.name - The name attribute for the checkbox input
 * @param props.value - The value attribute for the checkbox input
 * @param props.isChecked - Whether the checkbox is initially checked
 * @param props.label - The label text displayed next to the checkbox
 * @param props.description - Optional description text displayed below the label
 * @param props.onChange - Callback function triggered when checkbox state changes, receives (checked: boolean, value: string)
 * @returns A styled checkbox component with label and optional description
 */
export default function Checkbox(props: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          name={props.name}
          value={props.value}
          type="checkbox"
          defaultChecked={props.isChecked ? props.isChecked : false}
          className="peer sr-only"
          onChange={(e) => props.onChange(e.target.checked, e.target.value)}
        />
        <div className="w-5 h-5 rounded border-2 border-grey peer-checked:border-accent peer-checked:bg-accent transition-all duration-200 group-hover:border-accent flex items-center justify-center"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute text-white scale-0 peer-checked:scale-100 transition-transform duration-200"
          aria-hidden="true">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
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
