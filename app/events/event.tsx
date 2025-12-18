import Button, { ButtonVariant } from '../...components/Button';
import { dateToString } from '../...helpers/date';
import { LevelToColor, LevelToString } from '../...helpers/enum';
import { Level } from '../...types/enum';

export default function Event(props: {
  token: string;
  name: string;
  date: string;
  sport: string;
  experience: string;
  weight: string;
  level: Level;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEvent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handlePopUp = () => {
    props.setIsPopUp(true);
    props.setCurrentEvent(props.token);
  };
  const levelColor = 'bg-' + LevelToColor(props.level);

  return (
    <div className="h-130 text-center flex flex-col justify-around items-center m-2 pb-2 bg-foreground rounded-3xl">
      <div className="h-1/3 w-14/15 m-3 flex bg-[url(/boxing.png)] bg-cover bg-center rounded-3xl">
        <span className={`pill ${levelColor} text-white mt-4 ml-4`}>
          {LevelToString(props.level)}
        </span>
      </div>
      <div className="h-2/3 w-13/15 flex flex-col items-start justify-around">
        <h3 className="font-extrabold">{props.name}</h3>
        <span className="text-gray-300">{dateToString(props.date)}</span>

        <span className="pill">{props.sport}</span>

        <div className="bg-black rounded-2xl w-full min-h-15 flex flex-row justify-around items-center">
          <div className="flex flex-col w-1/2 items-start pl-3">
            <span className="text-gray-300">Experience : </span>
            <span className="text-accent">{props.experience}</span>
          </div>
          <div className="flex flex-col w-1/2 items-start pl-3">
            <span className="text-gray-300">Weight : </span>
            <span className="text-accent">{props.weight}</span>
          </div>
        </div>

        <Button
          onClick={handlePopUp}
          variant={ButtonVariant.Primary}
          className="h-10 w-full flex justify-center items-center">
          View Details
        </Button>
      </div>
    </div>
  );
}
