interface StatCardProps {
  color: string;
  label: string;
  count: number;
}

export default function StatCard(props: StatCardProps) {
  return (
    <div className={`card text-center border-2 border-${props.color}`}>
      <span>{props.label}</span>
      <span className={`text-4xl text-${props.color}`}>{props.count}</span>
    </div>
  );
}
