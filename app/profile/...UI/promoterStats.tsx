import { faCalendar, faFistRaised } from '@fortawesome/free-solid-svg-icons';
import StatCard from './statCard';

interface PromoterStatsProps {
  eventCount: number;
  fighterCount: number;
}

export default function PromoterStats(props: PromoterStatsProps) {
  return (
    <div className="grid gap-5 grid-cols-2">
      <StatCard
        icon={faCalendar}
        borderColor="border-primary"
        textColor="text-primary"
        label="Total events"
        count={props.eventCount}
      />
      <StatCard
        icon={faFistRaised}
        borderColor="border-accent"
        textColor="text-accent"
        label="Fighters promoted"
        count={props.fighterCount}
      />
    </div>
  );
}
