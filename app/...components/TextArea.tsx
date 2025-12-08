interface TextAreaProps {
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function TextArea(props: TextAreaProps) {
  return (
    <div className="flex-col items-center">
      <div>
        <span className="text-sm">{props.label}</span>
      </div>
      <div>
        <textarea
          className={`${props.className ? props.className : ''} input w-lg h-40 resize-none`}
          placeholder={props.placeholder}
          value={props.value}
          maxLength={2000}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="flex justify-end">
          <span className="text-grey text-sm">{props.value?.length}/2000</span>
        </div>
      </div>
    </div>
  );
}
