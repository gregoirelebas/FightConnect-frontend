interface StatCardProps {
  borderColor: string;
  textColor: string;
  label: string;
  count: number;
}

export default function StatCard(props: StatCardProps) {
  return (
    <div className={`card text-center border-2 ${props.borderColor}`}>
      <span>{props.label}</span>
      <span className={`text-4xl ${props.textColor}`}>{props.count}</span>
    </div>
  );
}
