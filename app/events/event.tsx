import Button, { ButtonVariant } from "../...components/Button";
import { dateToString } from "../...helpers/date";

export default function Event(props: {
  token: string;
  name: string;
  date: string;
  sport: string;
  experience: string;
  weight: string;
  level: string;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEvent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handlePopUp = () => {
    props.setIsPopUp(true);
    props.setCurrentEvent(props.token);
  };

  return (
    <div className="h-80 text-center flex flex-col justify-around items-center m-3 font-extrabold bg-[url(/boxing.png)] bg-cover bg-center rounded-3xl">
      <div className="flex flex-col items-center">
        <h3 className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">{props.name}</h3>
        <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">
          {dateToString(props.date)}
        </span>
      </div>
      <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">Sport : {props.sport}</span>
      <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">Experience : {props.experience}</span>
      <div className="flex flex-row w-60 justify-around">
        <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">Weight : {props.weight}</span>
        <span>-</span>
        <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">Level : {props.level}</span>
      </div>
      <Button
        onClick={handlePopUp}
        variant={ButtonVariant.Primary}
        className="h-10 w-40 flex justify-center items-center"
      >
        More info
      </Button>
    </div>
  );
}
