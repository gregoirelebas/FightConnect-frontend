import Button, { ButtonVariant } from '@/app/...components/Button';
import { LevelToColor, LevelToString } from '../...helpers/enum';
import { Level } from '../...types/enum';

interface EventsDisplayProps {
  token: string;
  name: string;
  date: string;
  level: Level;
  fighterAsk: number;
  isPromoter: boolean;
  displayEvent: (token: string) => void;
}

export default function EventsDisplay(props: EventsDisplayProps) {
  const message = props.isPromoter ? 'Manage Event' : 'More info';
  const levelColor = 'bg-' + LevelToColor(props.level);
  return (
    <div className="bg-gray-900 border-white rounded-2xl pl-10 border border-l-0 border-t-0 border-r-0 mt-3 min-h-18 w-full grid grid-cols-5 items-center">
      <span className='bg-accent rounded-3xl w-30 flex justify-center text-black font-bold'>{props.name}</span>
      <span>{props.date}</span>
      <span className={`pill ${levelColor}`}>{LevelToString(props.level)}</span>
      {props.isPromoter && <span>{props.fighterAsk}</span>}
      <Button
        variant={ButtonVariant.Primary}
        onClick={() => props.displayEvent(props.token)}
        className="w-35 h-10 text-xs">
        {message}
      </Button>
    </div>
  );
}
