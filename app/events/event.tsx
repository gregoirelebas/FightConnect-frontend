import Button from "../...components/Button";

export default function Event(props: {
  name: string;
  date: string;
  sport: string;
  categorie: string;
  weight: number;
  level: string;
}) {
    
  return (
    <div className="w-69 h-79 flex flex-col justify-around items-center m-3 bg-gray-700 rounded-3xl">
      <div className="flex flex-col items-center">
        <h3>{props.name}</h3>
        <h3>{props.date}</h3>
      </div>
      <h3>{props.sport}</h3>
      <h3>{props.categorie}</h3>
      <div className="flex flex-row w-60 justify-around">
        <span>{props.weight}</span>
        <span>-</span>
        <span>{props.level}</span>
      </div>
      <Button className="h-10 w-40 flex justify-center items-center">More info</Button>
    </div>
  );
}
