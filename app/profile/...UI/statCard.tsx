import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StatCardProps {
  icon: IconDefinition;
  borderColor: string;
  textColor: string;
  label: string;
  count: number;
}

export default function StatCard(props: StatCardProps) {
  return (
    <div className={`card gap-2 items-center text-center border-2 ${props.borderColor}`}>
      <div className="iconCard bg-transparent">
        <FontAwesomeIcon icon={props.icon} className={`text-3xl ${props.textColor}`} />
      </div>
      <span className="text-sm text-grey">{props.label}</span>
      <span className={`text-4xl ${props.textColor}`}>{props.count}</span>
    </div>
  );
}
