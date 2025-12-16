import { EventStatus, Level, Sport } from '@/app/...types/enum';
import {
  EventStatusToColor,
  EventStatusToString,
  LevelToColor,
  LevelToString,
  SportToString,
} from '@/app/...helpers/enum';
import { dateToString } from '@/app/...helpers/date';

interface EventCardProps {
  sport: Sport;
  name: string;
  level: Level;
  status: EventStatus;
  date: string;
}

export default function EventCard(props: EventCardProps) {
  const eventColors = EventStatusToColor(props.status);

  return (
    <div className="grid grid-cols-5 items-center px-5 py-3 bg-background rounded-xl cursor-pointer">
      <span className="pill">{SportToString(props.sport)}</span>
      <span className="text-xl">{props.name}</span>
      <span className={`pill bg-${LevelToColor(props.level)} text-white}`}>
        {LevelToString(props.level)}
      </span>
      <span className={`pill bg-${eventColors[0]} text-${eventColors[1]}`}>
        {EventStatusToString(props.status)}
      </span>
      <span className="text-right text-grey">{dateToString(props.date)}</span>
    </div>
  );
}
