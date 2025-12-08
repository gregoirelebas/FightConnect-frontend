interface InputProps {
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  onValidate?: () => void;
}

export default function Input(props: InputProps) {
  const handleKeyDown = (key: string) => {
    if (key === 'Enter' && props.onValidate) {
      props.onValidate();
    }
  };

  return (
    <div className="flex-col items-center">
      <div>
        <span className="text-sm">{props.label}</span>
      </div>
      <input
        className={`${
          props.className ? props.className : ''
        } bg-background border text-md border-grey mt-1 px-4 py-3 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-grey`}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type ? props.type : 'text'}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDownCapture={(e) => handleKeyDown(e.key)}
      />
    </div>
  );
}
