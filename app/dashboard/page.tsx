'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { getCookie } from '../...helpers/cookies';
import Cookies from '../...types/cookies';
import { Event } from '../...types/event';
import { dateToString, getFormatedDate } from '../...helpers/date';
import EventsDisplay from './EventsDisplay';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const [futureDates, setFutureDates] = useState<string[]>([]);
  const [previousDates, setPreviousDates] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  const [currentDate, setCurrentDate] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const now = Date.now();
      setCurrentDate(now);

      const promoterToken = await getCookie(Cookies.token);

      const request = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `events/promoter/${promoterToken}`
      ).then((response) => response.json());

      if (!request.result) {
        console.error(request.error);
        return;
      }

      if (request.data) {
        setAllEvents(request.data);

        const futureDates = [];
        const previousDates = [];

        for (const event of request.data) {
          const eventDate = new Date(event.date).getTime();
          if (now > eventDate) {
            previousDates.push(getFormatedDate(event.date));
          } else {
            futureDates.push(getFormatedDate(event.date));
          }
        }

        setFutureDates(futureDates);
        setPreviousDates(previousDates);
      }
    }

    fetchData();
  }, []);

  function displayEvent(token: string) {
    router.push('/events/' + token);
  }

  const futureEventsComponents = allEvents.map((data: Event, i) => {
    const eventDate = new Date(data.date).getTime();

    if (currentDate <= eventDate) {
      return (
        <EventsDisplay
          key={i}
          token={data.token}
          name={data.name}
          date={dateToString(data.date)}
          level={data.level}
          displayEvent={displayEvent}
          fighterAsk={3}
        />
      );
    }
  });

  const previousEventsComponents = allEvents.map((data: Event, i) => {
    const eventDate = new Date(data.date).getTime();

    if (currentDate > eventDate) {
      return (
        <EventsDisplay
          key={i}
          token={data.token}
          name={data.name}
          date={dateToString(data.date)}
          level={data.level}
          displayEvent={displayEvent}
          fighterAsk={3}
        />
      );
    }
  });

  const setCalendarTitleClass = (date: Date) => {
    const formatedDate = moment(date).format('DD-MM-YYYY');
    if (futureDates.includes(formatedDate)) {
      return 'validateDate';
    } else if (previousDates.includes(formatedDate)) {
      return 'passedDate';
    }
    return undefined;
  };

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] font-sans">
      <div className="h-full w-3/10 flex justify-center ">
        <div className="flex flex-col h-2/3 w-full justify-around items-center">
          <h3>Fight Calendar</h3>
          <Calendar
            className="text-black"
            tileClassName={({ date }: { date: Date }) => setCalendarTitleClass(date)}
            locale="en"
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
            {futureEventsComponents}
          </div>
        </div>
        <div className="h-1/2 w-4/5 flex flex-col justify-around items-center">
          <h3 className="border border-t-0 border-l-0 border-r-0 w-full flex justify-center">
            Passed Fights
          </h3>
          <div className="h-4/5 w-full pl-3 pr-3  flex flex-col items-center overflow-y-auto">
            {previousEventsComponents}
          </div>
        </div>
      </div>
    </div>
  );
}
