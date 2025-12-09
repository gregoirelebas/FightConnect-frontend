interface TextAreaProps {
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

/**
 * TextArea component for user input with character limit display
 * @param {TextAreaProps} props - The component props
 * @param {string} props.label - The label text displayed above the textarea
 * @param {string} props.placeholder - The placeholder text for the textarea
 * @param {string} props.value - The current value of the textarea
 * @param {string} [props.className] - Optional additional CSS classes to apply to the textarea
 * @param {(value: string) => void} props.onChange - Callback function triggered when textarea value changes
 * @returns {JSX.Element} A textarea component with label and character counter (max 2000 characters)
 */
export default function TextArea(props: TextAreaProps) {
  return (
    <div className="flex-col items-center">
      <div className="text-sm">{props.label}</div>
      <div>
        <textarea
          className={`${props.className ? props.className : ''} input w-lg h-40 resize-none`}
          placeholder={props.placeholder}
          value={props.value}
          maxLength={2000}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="text-right text-grey text-sm">{props.value?.length}/2000</div>
      </div>
    </div>
  );
}
