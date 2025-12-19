import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { ButtonVariant } from '../...components/Button';
import { dateToString } from '../...helpers/date';
import { LevelToColor, LevelToString } from '../...helpers/enum';
import { Level } from '../...types/enum';
import { faCalendar, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Event(props: {
  token: string;
  name: string;
  date: string;
  city: string;
  sport: string;
  experience: string;
  weight: string;
  fighterCount: number;
  level: Level;
}) {
  const levelColor = 'bg-' + LevelToColor(props.level);

  return (
    <div className="h-130 text-center flex flex-col justify-center items-center m-2 pb-2 bg-foreground rounded-3xl">
      <div className="h-1/3 w-14/15 m-3 flex justify-between pt-5 px-5 bg-[url(/boxing.png)] bg-cover bg-center rounded-3xl">
        <span className={`pill ${levelColor} text-white`}>{LevelToString(props.level)}</span>
        <span className="pill">{props.sport}</span>
      </div>
      <div className="h-2/3 w-13/15 flex flex-col items-start justify-around">
        <h3 className="w-full font-extrabold">{props.name}</h3>
        <div className="w-full flex justify-between gap-5 text-grey">
          <div className="flex gap-1">
            <FontAwesomeIcon icon={faMapPin} className="pt-1" />
            <span>{props.city}</span>
          </div>
          <div className="flex gap-1">
            <FontAwesomeIcon icon={faCalendar} className="pt-1" />
            <span>{dateToString(props.date)}</span>
          </div>
        </div>
        <div className="bg-black rounded-2xl w-full min-h-15 flex flex-row p-2 justify-around items-center">
          <div className="flex flex-col w-1/2 items-start pl-3">
            <span className="text-sm text-grey">Experience</span>
            <span className="text-lg text-accent">{props.experience}</span>
          </div>
          <div className="flex flex-col w-1/2 items-start pl-3">
            <span className="text-sm text-grey">Weight</span>
            <span className="text-lg text-accent">{props.weight}</span>
          </div>
          <div className="flex flex-col w-1/2 items-start pl-3">
            <span className="text-sm text-grey">Fighters</span>
            <span className="text-lg text-accent">{props.fighterCount}</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Link href={'/events/' + props.token} className="w-full">
            <Button
              variant={ButtonVariant.Primary}
              className="h-10 w-full flex justify-center items-center">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
