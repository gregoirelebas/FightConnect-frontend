interface PillsProps {
  children: React.ReactNode;
}

export default function Pills(props: PillsProps) {
  return (
    <span className="w-fit h-fit px-3 py-1 rounded-full bg-accent text-background">
      {props.children}
    </span>
  );
}
