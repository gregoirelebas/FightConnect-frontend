interface InfoCardProps {
  text: string;
  data: string;
  color: string;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <div className={`h-30 pl-2 rounded-2xl ${props.color}`}>
      <div className="h-full flex flex-col p-5 rounded-l-none rounded-xl gap-2 bg-foreground">
        <span className="text-xl">{props.text}</span>
        <span>{props.data}</span>
      </div>
    </div>
  );
}
