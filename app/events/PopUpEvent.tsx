import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../...components/Button";


export default function PopUpEvent(props: {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) {

  const url = process.env.NEXT_PUBLIC_API_URL;
  const [event, setEvent] = useState<any>({});

  useEffect(()=>{
    fetch(`${url}/events/${props.id}`).then(response => response.json())
    .then(data=> setEvent(data.event))
  },[])

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex justify-center items-center">
      <div className="w-100 h-100 bg-white flex flex-col rounded-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-black text-2xl flex-1 text-center">EVENT</h1>
            <h2 className="text-black text-center "> {event._id} {event.clubName} {event.sports} {event.level} {event.date}</h2>
          <p className="text-2xl text-black cursor-pointer" onClick={() => props.setIsPopUp(false)}>X</p>
        </div>
        <div className="flex justify-center items-end flex-1 p-4">
          <Button variant={ButtonVariant.Accept}>Join</Button>
        </div>
      </div>
      {/* <p className="text-black ">The "Date" at the "Club" join for the "sport" fight.</p> */}
    </div>
  
  )
}
