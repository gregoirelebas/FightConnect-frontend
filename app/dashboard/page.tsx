"use client";
import Button, { ButtonVariant } from "@/app/...components/Button";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import PopUpEventDashboard from "./PopUpEventDashboard";

export default function Dashboard() {
  const validateDate = ["04-12-2025", "14-12-2025", "24-12-2025"];
  const waitingDate = ["08-12-2025", "18-12-2025"];

  const [isPopUp, setIsPopUp] = useState(false);

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] font-sans ml-3 mr-3">
      <div className="h-full w-1/5 flex justify-center mt-2 ">
        <div className="flex flex-col h-2/3 w-full justify-around items-center">
          <h3>Fight Calendar</h3>
          <Calendar
            className="bg-white text-black rounded-2xl"
            tileClassName={({ date, view }: { date: Date; view: string }) => {
              const formattedDate = moment(date).format("DD-MM-YYYY");
              if (validateDate.includes(formattedDate)) {
                return "validateDate";
              } else if (waitingDate.includes(formattedDate)) {
                return "waitingDate";
              }
              return undefined;
            }}
          />
          <Link href="/events/create">
            <Button variant={ButtonVariant.Primary} className="w-35 h-10 text-sm">
              Create a Fight
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-full w-4/5 pl-5 flex flex-col">
        <div className="h-1/2 w-full flex flex-col justify-around items-center">
          <h3>Upcoming Fights</h3>
          <div className="h-4/5 w-full pl-3 pr-3 border border-gray-500 flex flex-col items-center overflow-y-auto">
            <div className="bg-white text-black mt-3 min-h-18 w-full rounded-2xl flex flex-row justify-around items-center">
              <span>Event Fight Name</span>
              <span>Date</span>
              <span>Catégorie</span>
              <span>Number Fighter</span>
              <Button
                onClick={() => setIsPopUp(true)}
                variant={ButtonVariant.Primary}
                className="w-35 h-10 text-xs"
              >
                Manage Event
              </Button>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full flex flex-col justify-around items-center">
          <h3>Passed Fights</h3>
          <div className="h-4/5 w-full pl-3 pr-3 border border-gray-500 flex flex-col items-center overflow-y-auto"></div>
        </div>
      </div>
      {isPopUp && <PopUpEventDashboard setIsPopUp={setIsPopUp} />}
    </div>
  );
}
