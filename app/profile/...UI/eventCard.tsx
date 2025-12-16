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
  const levelColor = 'bg-' + LevelToColor(props.level);

  const eventColors = EventStatusToColor(props.status).map((color, i) => {
    if (i == 0) return 'bg-' + color;
    else if (i == 1) return 'text-' + color;
  });

  return (
    <div className="grid grid-cols-5 items-center px-5 py-3 bg-background rounded-xl cursor-pointer">
      <span className="pill">{SportToString(props.sport)}</span>
      <span className="text-xl">{props.name}</span>
      <span className={`pill ${levelColor} text-white`}>{LevelToString(props.level)}</span>
      <span className={`pill ${eventColors[0]} ${eventColors[1]}`}>
        {EventStatusToString(props.status)}
      </span>
      <span className="text-right text-grey">{dateToString(props.date)}</span>
    </div>
  );
}
