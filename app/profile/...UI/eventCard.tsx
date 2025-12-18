import { EventStatus, Level, Sport } from '@/app/...types/enum';
import {
  EventStatusToColor,
  EventStatusToString,
  LevelToColor,
  LevelToString,
  SportToString,
} from '@/app/...helpers/enum';
import { dateToString } from '@/app/...helpers/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapPin, faUsers } from '@fortawesome/free-solid-svg-icons';

interface EventCardProps {
  token: string;
  sport: Sport;
  name: string;
  level: Level;
  city: string;
  fighterCount: number;
  status: EventStatus;
  date: string;
  onClick: (token: string) => void;
}

export default function EventCard(props: EventCardProps) {
  const levelColor = 'bg-' + LevelToColor(props.level);

  const eventColors = EventStatusToColor(props.status).map((color, i) => {
    if (i == 0) return 'bg-' + color;
    else if (i == 1) return 'text-' + color;
  });

  return (
    <div
      className="card bg-background cursor-pointer transition-all duration-200 hover:bg-foreground-hover active:scale-95"
      onClick={() => props.onClick(props.token)}>
      <div className="flex justify-between items-center">
        <h3>{props.name}</h3>
        <span className={`pill ${eventColors[0]} ${eventColors[1]}`}>
          {EventStatusToString(props.status)}
        </span>
      </div>
      <div className="w-full flex justify-between items-center gap-5">
        <div className="flex gap-5 text-grey text-sm">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendar} />
            <span>{dateToString(props.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faMapPin} />
            <span>{props.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUsers} />
            <span>{props.fighterCount}</span>
          </div>
        </div>
        <div className="flex gap-5">
          <span className={`pill ${levelColor}`}>{LevelToString(props.level)}</span>
          <span className={`pill`}>{SportToString(props.sport)}</span>
        </div>
      </div>
    </div>
  );
}
