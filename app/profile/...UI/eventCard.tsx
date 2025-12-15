import { EventStatus, Level, Sport } from '@/app/...types/enum';
import {
  EventStatusToColor,
  EventStatusToString,
  LevelToString,
  SportToString,
} from '@/app/...helpers/enum';
import { DateToString } from '@/app/...helpers/date';

import Pill from '@/app/...components/Pill';

interface EventCardProps {
  sport: Sport;
  promoter: string;
  name: string;
  level: Level;
  status: EventStatus;
  date: Date;
}

export default function EventCard(props: EventCardProps) {
  return (
    <div className="flex items-center px-5 py-3 bg-background rounded-xl cursor-pointer">
      <div className="w-1/4">
        <Pill bgColor="accent" textColor="background">
          {SportToString(props.sport)}
        </Pill>
      </div>
      <div className="w-full grid grid-cols-5 items-center">
        <span className="text-xl">{props.name}</span>
        <span>Promoter: {props.promoter}</span>
        <Pill bgColor="accent" textColor="background">
          {LevelToString(props.level)}
        </Pill>
        <Pill
          bgColor={EventStatusToColor(props.status)}
          textColor={props.status === EventStatus.Cancelled ? 'white' : 'background'}>
          {EventStatusToString(props.status)}
        </Pill>
        <span className="text-right text-grey text-sm">{DateToString(props.date)}</span>
      </div>
    </div>
  );
}
