import Button, { ButtonVariant } from "../...components/Button";

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
  const date = new Date(props.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const structuredDate = `${year}-${month}-${day}`;

  const handlePopUp = () => {
    props.setIsPopUp(true);
    props.setCurrentEvent(props.token);
  };

  return (
    <div className="h-80 flex flex-col justify-around items-center m-3 font-extrabold bg-[url(/boxing.png)] bg-cover bg-center rounded-3xl">
      <div className="flex flex-col items-center">
        <h3 className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">{props.name}</h3>
        <span className="drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">{structuredDate}</span>
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
