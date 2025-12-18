'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { getCookie, setCookie } from '@/app/...helpers/cookies';
import Cookies from '@/app/...types/cookies';
import { Event } from '@/app/...types/Event';
import { dateToString, getFormatedDate, getWeekDay, monthToString } from '@/app/...helpers/date';
import DashboardEvent from './event';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, EventStatus, Role } from '@/app/...types/enum';
import InfoCard from '@/app/...UI/InfoCard';

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
        city={event.city}
        level={event.level}
        isCancelled={true}
        displayEvent={displayEvent}
        fighterCount={fighterCount}
      />
    );
  }

  const upcomingEvents = allEvents.map((event: Event, i) => {
    const eventDate = new Date(event.date).getTime();

    if (currentDate <= eventDate) {
      return createEventDisplay(i, event);
    }
  });

  const completedEvents = allEvents.map((event: Event, i) => {
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

  function previousMonth() {
    let year = selectedDate.getFullYear();
    let previous = selectedDate.getMonth() - 1;
    if (previous < 0) {
      year--;
      previous = 11;
    }

    setSelectedDate(new Date(year, previous));
  }

  function nextMonth() {
    let year = selectedDate.getFullYear();
    let next = selectedDate.getMonth() + 1;
    if (next >= 12) {
      year++;
      next = 0;
    }

    setSelectedDate(new Date(year, next));
  }

  function goToCreateEvent() {
    router.push('/events/create');
  }

  return (
    <div className="flex flex-col gap-10 my-10 mx-60">
      <div>
        <div className="flex justify-between items-center">
          <h1>Dashboard</h1>
          {isPromoter && (
            <Button variant={ButtonVariant.Secondary} onClick={goToCreateEvent}>
              Create a new event
            </Button>
          )}
        </div>
        <span>Manage your events and track your schedule</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <InfoCard
          text="Upcoming Events"
          data={futureDates.length.toString()}
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
          data={(futureDates.length + previousDates.length).toString()}
          bgColor="bg-primary"
          textColor="text-primary"
        />
      </div>
      <div className="flex gap-5">
        <div className="w-2/3 flex flex-col gap-5">
          <div className="card">
            <div className="w-full flex justify-between items-center">
              <h3 className="font-bold">Upcoming events</h3>
              <span className="pill">{futureDates.length}</span>
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
          <div className="flex justify-between items-center">
            <h3>
              {monthToString(selectedDate.getMonth())} {selectedDate.getFullYear()}
            </h3>
            <div className="flex gap-5">
              <Button
                variant={ButtonVariant.Ternary}
                className="text-lg font-bold text-accent"
                onClick={previousMonth}>
                {'<'}
              </Button>

              <Button
                variant={ButtonVariant.Ternary}
                className="text-lg font-bold text-accent"
                onClick={nextMonth}>
                {'>'}
              </Button>
            </div>
          </div>
          <Calendar
            formatShortWeekday={getWeekDay}
            showNavigation={false}
            showNeighboringMonth={false}
            locale="en"
            value={selectedDate}
            onClickDay={(value) => setSelectedDate(value)}
          />
        </div>
      </div>
    </div>
  );
}
