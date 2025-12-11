"use client";
import Button, { ButtonVariant } from "@/app/...components/Button";


export default function upcomingEvent(props: {
  name : string,
  date : string,
  level : string;
  askFighter : number
}) {
  
  return (
    <div className="bg-gray-500 mt-3 min-h-18 w-full rounded-2xl flex flex-row justify-around items-center">
      <span>{props.name}</span>
      <span>{props.date}</span>
      <span>{props.level}</span>
      <span>{props.askFighter}</span>
      <Button variant={ButtonVariant.Primary} className="w-35 h-10 text-xs">
        Go to Fight Page
      </Button>
    </div>
  );
}
