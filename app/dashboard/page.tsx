"use client";
import Button, { ButtonVariant } from "@/app/...components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import PopUpEventDashboard from "./PopUpEventDashboard";
import { getCookie } from "../...helpers/cookies";
import Cookies from "../...types/cookies";
import { Event } from "../...types/Event";
import { DateToString } from "../...helpers/date";
import EventsDisplay from "./EventsDisplay";

export default function Dashboard() {
  const [validateDate, setValidateDate] = useState<string[]>([]);
  const [PassedDate, setPassedDate] = useState<string[]>([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [allEvent, setAllEvent] = useState<Event[]>([]);
  const [token, setToken] = useState<string>("");
  const [currentEvent, setCurrentEvent] = useState("");

  const getEventByToken = async () => {
    const value = await getCookie(Cookies.token);
    setToken(value ?? "");

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + `events/promoter/${value}`).then(
      (response) => response.json()
    );

    setAllEvent(request.data);
  };

  useEffect(() => {
    getEventByToken();
  }, []);

  const getFormatedDate = (date: string) => {
    const temporaryDate = new Date(date);
    const year = temporaryDate.getFullYear();
    let temporaryMonth = temporaryDate.getMonth() + 1;
    let month;
    let day;
    if (temporaryMonth < 10) {
      month = "0" + temporaryMonth;
    } else {
      month = temporaryMonth;
    }
    if (temporaryDate.getDate() < 10) {
      day = "0" + temporaryDate.getDate();
    } else {
      day = temporaryDate.getDate();
    }
    const formatDate = `${day}-${month}-${year}`;
    return formatDate;
  };

  useEffect(() => {
    let nowDate = Date.now();
    let futurDate = [];
    let passedDate = [];
    for (let data of allEvent) {
      let eventDate = new Date(data.date).getTime();
      if (nowDate > eventDate) {
        passedDate.push(getFormatedDate(data.date));
      } else {
        futurDate.push(getFormatedDate(data.date));
      }
    }
    setValidateDate(futurDate);
    setPassedDate(passedDate);
  }, [allEvent]);

  const listUpcomingEvent = allEvent.map((data: any, i) => {
    let nowDate = Date.now();
    let theDate = new Date(data.date);
    let eventDate = new Date(data.date).getTime();

    if (nowDate <= eventDate) {
      return (
        <EventsDisplay
          token={data.token}
          setIsPopUp={setIsPopUp}
          name={data.name}
          date={DateToString(theDate)}
          level={data.level}
          setCurrentEvent={setCurrentEvent}
          fighterAsk={3}
        />
      );
    }
  });

  const listPassedEvent = allEvent.map((data: any, i) => {
    let nowDate = Date.now();
    let theDate = new Date(data.date);
    let eventDate = new Date(data.date).getTime();

    if (nowDate > eventDate) {
      return (
        <EventsDisplay
          token={data.token}
          setIsPopUp={setIsPopUp}
          name={data.name}
          date={DateToString(theDate)}
          level={data.level}
          setCurrentEvent={setCurrentEvent}
          fighterAsk={3}
        />
      );
    }
  });

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] font-sans">
      <div className="h-full w-3/10 flex justify-center ">
        <div className="flex flex-col h-2/3 w-full justify-around items-center">
          <h3>Fight Calendar</h3>
          <Calendar
            className="text-black"
            tileClassName={({ date }: { date: Date }) => {
              const formattedDate = moment(date).format("DD-MM-YYYY");
              if (validateDate.includes(formattedDate)) {
                return "validateDate";
              } else if (PassedDate.includes(formattedDate)) {
                return "passedDate";
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
      <div className="h-full w-7/10 flex flex-col items-center justify-around border border-t-0 border-b-0 border-r-0">
        <div className="h-1/2 w-4/5 pt-5 flex flex-col justify-around items-center">
          <h3 className="border border-t-0 border-l-0 border-r-0 w-full flex justify-center">
            Upcoming Fights
          </h3>
          <div className="h-4/5 w-full pl-3 pr-3 flex flex-col items-center overflow-y-auto">
            {listUpcomingEvent}
          </div>
        </div>
        <div className="h-1/2 w-4/5 flex flex-col justify-around items-center">
          <h3 className="border border-t-0 border-l-0 border-r-0 w-full flex justify-center">
            Passed Fights
          </h3>
          <div className="h-4/5 w-full pl-3 pr-3  flex flex-col items-center overflow-y-auto">
            {listPassedEvent}
          </div>
        </div>
      </div>
      {isPopUp && (
        <PopUpEventDashboard
          setIsPopUp={setIsPopUp}
          token={currentEvent}
        />
      )}
    </div>
  );
}
