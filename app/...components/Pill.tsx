interface PillProps {
  bgColor: string;
  textColor: string;
  children: React.ReactNode;
}

export default function Pill(props: PillProps) {
  return (
    <span
      className={`w-fit h-fit px-3 py-1 rounded-full bg-${props.bgColor} text-${props.textColor} font-bold`}>
      {props.children}
    </span>
  );
}
