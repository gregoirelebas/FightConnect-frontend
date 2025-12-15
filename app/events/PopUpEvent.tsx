import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../...components/Button";
import { Event } from "../...types/event";



export default function PopUpEvent(props: {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}) {

  const url = process.env.NEXT_PUBLIC_API_URL;
  const [event, setEvent] = useState<Event>();

  const date = event?.date ? new Date(event.date) : null;
const day = date?.getDate();
const month = date?.getMonth();
const year = date?.getFullYear();
const formatedDate = `${day} / ${month} / ${year}`

let imageUrl = "/cageMMA.png";
switch (event?.sport) {
  case "jjb":
    imageUrl = "/TTjjb.png";
    break;

  default:
    break;
}

  useEffect(() => {
    fetch(`${url}events/${props.token}`).then(response => response.json())
      .then(data => setEvent(data.data))
  }, [])
  console.log(event);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex flex-col justify-center items-center">
      <div className= {`w-150 h-100 bg-[url(${imageUrl})] bg-cover flex flex-col justify-between rounded-xl relative p-5 items-center`}>


        <h1 className="text-wight text-2xl text-center border-5 w-[40%]">EVENT</h1>
        {event &&
          <div>
            <h2 className="text-wight text-2xl flex-auto text-center font-bold"> {event.clubName} </h2>
            <h2 className="text-wight text-2xl flex-auto text-center font-bold"> {event.sport} </h2>
            <h2 className="text-wight text-2xl flex-auto text-center font-bold"> {event.level}</h2>
            <h2 className="text-wight text-2xl flex-auto text-center font-bold"> {formatedDate}</h2>
          </div>
        }



        <Button variant={ButtonVariant.Refuse} className="text-xs text-wight cursor-pointer absolute top-3 right-3" onClick={() => props.setIsPopUp(false)}>X</Button>

        <div className="flex justify-center items-end p-4">
          <Button variant={ButtonVariant.Accept}>Join</Button>
        </div>
      </div>
      {/* <p className="text-black ">The "Date" at the "Club" join for the "sport" fight.</p> */}
    </div>

  )



}
