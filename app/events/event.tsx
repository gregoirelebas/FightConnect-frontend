import Button, { ButtonVariant } from "../...components/Button";

export default function Event(props: {
  name: string;
  date: string;
  sport: string;
  experience: string;
  weight: string;
  level: string;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const date = new Date(props.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const structuredDate = `${year}-${month}-${day}`

  return (
    <div className="w-69 h-79 flex flex-col justify-around items-center m-3 font-extrabold bg-[url(/boxing.png)] bg-cover rounded-3xl">
      <div className="flex flex-col items-center">
        <h3>{props.name}</h3>
        <span>{structuredDate}</span>
      </div>
      <span>Sport : {props.sport}</span>
      <span>Expérience : {props.experience}</span>
      <div className="flex flex-row w-60 justify-around">
        <span>Weight : {props.weight}</span>
        <span>-</span>
        <span>Level : {props.level}</span>
      </div>
      <Button onClick={() => props.setIsPopUp(true)} variant={ButtonVariant.Primary} className="h-10 w-40 flex justify-center items-center">More info</Button>
    </div>
  );
}
