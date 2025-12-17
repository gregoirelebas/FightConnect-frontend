'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { getCookie, setCookie } from '@/app/...helpers/cookies';
import Cookies from '@/app/...types/cookies';
import { Event } from '@/app/...types/event';
import { dateToString, getFormatedDate } from '@/app/...helpers/date';
import DashboardEvent from './event';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, Role } from '@/app/...types/enum';

export default function Dashboard() {
  const router = useRouter();

  const [futureDates, setFutureDates] = useState<string[]>([]);
  const [previousDates, setPreviousDates] = useState<string[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<number>(0);

  const [isPromoter, setIsPromoter] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const now = Date.now();
      setCurrentDate(now);

      const userToken = await getCookie(Cookies.token);
      const role = await getCookie(Cookies.role);

      let url = '';
      if (role === Role.Fighter) {
        url = process.env.NEXT_PUBLIC_API_URL + `events/fighter/${userToken}`;
        setIsPromoter(false);
      } else if (role === Role.Promoter) {
        url = process.env.NEXT_PUBLIC_API_URL + `events/promoter/${userToken}`;
        setIsPromoter(true);
      } else throw new Error('Unknown role : ' + role);

      const request = await fetch(url).then((response) => response.json());

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

  function createEventDisplay(index: number, event: Event) {
    const fighterCount = event.fighters.filter(
      (application) => application.status !== ApplicationStatus.Denied
    ).length;

    return (
      <DashboardEvent
        key={index}
        token={event.token}
        name={event.name}
        date={dateToString(event.date)}
        level={event.level}
        isPromoter={isPromoter}
        displayEvent={displayEvent}
        fighterCount={fighterCount}
      />
    );
  }

  const futureEventsComponents = allEvents.map((event: Event, i) => {
    const eventDate = new Date(event.date).getTime();

    if (currentDate <= eventDate) {
      return createEventDisplay(i, event);
    }
  });

  const previousEventsComponents = allEvents.map((event: Event, i) => {
    const eventDate = new Date(event.date).getTime();

    if (currentDate > eventDate) {
      return createEventDisplay(i, event);
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

  const saveDate = () => {
    setCookie(Cookies.date, selectedDate.toString());
  };

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] font-sans">
      <div className="h-full w-3/10 flex justify-center ">
        <div className="flex flex-col h-2/3 w-full justify-around items-center">
          <div className="h-9/10 w-4/5 bg-foreground rounded-2xl flex flex-col justify-around items-center">
            <h3>Fight Calendar</h3>
            <Calendar
              onChange={(value) => setSelectedDate(value as Date)}
              className="text-black rounded-2xl"
              tileClassName={({ date }: { date: Date }) => setCalendarTitleClass(date)}
              locale="en"
            />
            <Link href="/events/create">
              {isPromoter && (
                <Button
                  onClick={() => saveDate()}
                  variant={ButtonVariant.Primary}
                  className="w-35 h-10 text-sm">
                  Create a Fight
                </Button>
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="h-full w-7/10 flex flex-col items-center justify-around border border-t-0 border-b-0 border-r-0">
        <div className="h-1/2 w-4/5 pt-5 flex flex-col justify-around items-center">
          <h3 className="border border-t-0 border-l-0 border-r-0 w-full flex justify-center">
            Upcoming Fights
          </h3>
          <div className="h-4/5 w-full bg-foreground rounded-2xl pl-3 pr-3 flex flex-col items-center overflow-y-auto">
            {futureEventsComponents}
          </div>
        </div>
        <div className="h-1/2 w-4/5 flex flex-col justify-around items-center">
          <h3 className="border border-t-0 border-l-0 border-r-0 w-full flex justify-center">
            Passed Fights
          </h3>
          <div className="h-4/5 w-full pl-3 pr-3 bg-foreground rounded-2xl  flex flex-col items-center overflow-y-auto">
            {previousEventsComponents}
          </div>
        </div>
      </div>
    </div>
  );
}
