interface InfoCardProps {
  text: string;
  data: string;
  bgColor: string;
  textColor: string;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <div className={`h-fit pl-2 rounded-2xl ${props.bgColor}`}>
      <div className="h-full flex flex-col p-5 rounded-l-none rounded-xl gap-2 bg-foreground">
        <span className="text-xl">{props.text}</span>
        <span className={`${props.textColor} text-lg`}>{props.data}</span>
      </div>
    </div>
  );
}
