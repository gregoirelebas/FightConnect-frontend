import { dateToString } from '@/app/...helpers/date';
import {
  EventStatusToColor,
  EventStatusToString,
  LevelToColor,
  LevelToString,
} from '@/app/...helpers/enum';
import { EventStatus, Level } from '@/app/...types/enum';

interface DashboardEventProps {
  token: string;
  name: string;
  date: string;
  level: Level;
  city: string;
  fighterCount: number;
  isCancelled: boolean;
  displayEvent: (token: string) => void;
}

export default function DashboardEvent(props: DashboardEventProps) {
  return (
    <div
      className="card border border-white px-5 gap-2 bg-background hover:bg-foreground-hover hover:border-accent cursor-pointer"
      onClick={() => props.displayEvent(props.token)}>
      <div className="flex justify-between items-center">
        <span className="font-semibold">{props.name}</span>
        <div className="flex gap-2">
          {props.isCancelled && (
            <span className={`pill bg-${EventStatusToColor(EventStatus.Cancelled)[0]} text-white`}>
              {EventStatusToString(EventStatus.Cancelled)}
            </span>
          )}
          <span className={`pill bg-${LevelToColor(props.level)} text-white`}>
            {LevelToString(props.level)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-grey">{props.date}</span>
        <span className="text-sm text-grey">{props.city}</span>
        <span className="text-sm text-grey">{props.fighterCount} fighters</span>
      </div>
    </div>
  );
}
