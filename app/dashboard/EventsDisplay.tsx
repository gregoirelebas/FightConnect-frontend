import Button, { ButtonVariant } from "@/app/...components/Button";

export default function EventsDisplay(props: {
  token : string;
  name: string;
  date: string;
  level: string;
  fighterAsk: number;
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEvent: React.Dispatch<React.SetStateAction<string>>;
}) {

  const hangleManage = (token:string) => {
    props.setIsPopUp(true)
    props.setCurrentEvent(token)
  }

  return (
    <div className="bg-gray-900 border-white pl-10 border border-l-0 border-t-0 border-r-0 mt-3 min-h-18 w-full grid grid-cols-5 items-center">
      <span>{props.name}</span>
      <span>{props.date}</span>
      <span>{props.level}</span>
      <span>{props.fighterAsk}</span>
      <Button
        variant={ButtonVariant.Primary}
        onClick={() => hangleManage(props.token)}
        className="w-35 h-10 text-xs"
      >
        Manage Event
      </Button>
    </div>
  );
}
