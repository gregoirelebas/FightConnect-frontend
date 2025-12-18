'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getCookie, setCookie } from '@/app/...helpers/cookies';
import Cookies from '@/app/...types/cookies';
import { Event } from '@/app/...types/Event';
import {
  dateToString,
  getFormatedDate,
  getCalendarDate,
  getWeekDay,
  isSameDate,
} from '@/app/...helpers/date';
import DashboardEvent from './event';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, EventStatus, Role } from '@/app/...types/enum';
import InfoCard from '@/app/...UI/InfoCard';

export default function Dashboard() {
  const router = useRouter();

  const [upcomingDates, setFutureDates] = useState<string[]>([]);
  const [previousDates, setPreviousDates] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [today, setToday] = useState<number>();

  const [isPromoter, setIsPromoter] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const now = Date.now();
      setToday(now);

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
        setEvents(request.data);

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
        city={event.city}
        level={event.level}
        isCancelled={true}
        displayEvent={displayEvent}
        fighterCount={fighterCount}
      />
    );
  }

  const upcomingEvents = events.map((event: Event, i) => {
    const eventDate = new Date(event.date).getTime();

    if (today && today <= eventDate) {
      return createEventDisplay(i, event);
    }
  });

  const completedEvents = events.map((event: Event, i) => {
    const eventDate = new Date(event.date).getTime();

    if (today && today > eventDate) {
      return createEventDisplay(i, event);
    }
  });

  const setCalendarTitleClass = (date: Date) => {
    const calendarDate = getCalendarDate(date);

    if (today) console.log(new Date(today) + ' / ' + date);

    let dateClass = '';

    if (upcomingDates.includes(calendarDate)) {
      dateClass = 'upcoming';
    } else if (previousDates.includes(calendarDate)) {
      dateClass = 'previous';
    }
    if (date.getTime() === selectedDate?.getTime()) {
      dateClass += ' selected';
    }

    if (today && isSameDate(new Date(today), date)) {
      dateClass += ' active';
    }

    return dateClass;
  };

  const selectAndSaveDate = (date: Date | undefined) => {
    setSelectedDate(date);

    if (date) {
      if (today && date.getTime() < today) {
        setCookie(Cookies.date, date.toString());
      }
    } else {
      setCookie(Cookies.date, '');
    }
  };

  return (
    <div className="flex flex-col gap-10 my-10 mx-60">
      <div>
        <div className="flex justify-between items-center">
          <h1>Dashboard</h1>
          {isPromoter && (
            <Link href={'/events/create'}>
              <Button variant={ButtonVariant.Secondary}>Create a new event</Button>
            </Link>
          )}
        </div>
        <span>Manage your events and track your schedule</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <InfoCard
          text="Upcoming Events"
          data={upcomingDates.length.toString()}
          bgColor="bg-accent"
          textColor="text-accent"
        />
        <InfoCard
          text="Completed Events"
          data={previousDates.length.toString()}
          bgColor="bg-success"
          textColor="text-success"
        />
        <InfoCard
          text="Total Events"
          data={(upcomingDates.length + previousDates.length).toString()}
          bgColor="bg-primary"
          textColor="text-primary"
        />
      </div>
      <div className="flex gap-5">
        <div className="w-2/3 flex flex-col gap-5">
          <div className="card">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-bold">Upcoming events</h3>
              <span className="pill">{upcomingDates.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-5">{upcomingEvents}</div>
          </div>
          <div className="card">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-bold">Completed events</h3>
              <span className="pill">{previousDates.length.toString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-5">{completedEvents}</div>
          </div>
        </div>
        <div className="w-1/3 card">
          <Calendar
            formatShortWeekday={getWeekDay}
            showNeighboringMonth={false}
            locale="en"
            value={selectedDate}
            onClickDay={(value) => {
              selectAndSaveDate(value);
            }}
            onActiveStartDateChange={() => {
              selectAndSaveDate(undefined);
            }}
            tileClassName={({ date }: { date: Date }) => {
              return setCalendarTitleClass(date);
            }}
          />
        </div>
      </div>
    </div>
  );
}
