import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../...components/Button";


export default function PopUpEvent(props: {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}) {

  const url = process.env.NEXT_PUBLIC_API_URL;
  const [event, setEvent] = useState<any>({});

  useEffect(() => {
    fetch(`${url}events/${props.token}`).then(response => response.json())
      .then(data => setEvent(data.data))
  }, [])
  console.log(event);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex flex-col justify-center items-center">
      <div className="w-100 h-100 bg-white flex flex-col justify-between rounded-xl relative p-5 items-center">

        <h1 className="text-black text-2xl text-center border-5 w-[50%]">EVENT</h1>
       <div>
        <h2 className="text-black text-2xl flex-auto text-center"><span className="font-bold text-3xl">Club:</span> {event.clubName} </h2>
        <h2 className="text-black text-2xl flex-auto text-center"><span className="font-bold text-3xl">sport:</span> {event.sports} </h2>
        <h2 className="text-black text-2xl flex-auto text-center"><span className="font-bold text-3xl">level:</span> {event.level}</h2>
        <h2 className="text-black text-2xl flex-auto text-center"><span className="font-bold text-3xl">date:</span> {event.date}</h2>
        </div>



        <p className="text-2xl text-black cursor-pointer absolute top-3 right-3" onClick={() => props.setIsPopUp(false)}>x</p>

        <div className="flex justify-center items-end p-4">
          <Button variant={ButtonVariant.Accept}>Join</Button>
        </div>
      </div>
      {/* <p className="text-black ">The "Date" at the "Club" join for the "sport" fight.</p> */}
    </div>

  )



}
