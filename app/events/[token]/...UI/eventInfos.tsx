'use client';

import { useEffect, useState } from 'react';
import { dateToString } from '@/app/...helpers/date';
import { setCookieState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';
import { Event } from '@/app/...types/event';
import { LevelToString, SportToString } from '@/app/...helpers/enum';

import FighterApplicant from './fighterApplicant';
import { Fighter } from '@/app/...types/fighter';

export default function EventInfos({ token }: { token: string | undefined }) {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [event, setEvent] = useState<Event>();
  const [fighters, setFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    async function fetchEvent() {
      const request = await fetch(process.env.NEXT_PUBLIC_API_URL + `events/${token}`).then(
        (response) => response.json()
      );

      if (!request.result) {
        console.error(request.error);
        return;
      }

      setEvent(request.data);

      const _token = await getCookie(Cookies.token);
      if (_token) {
        setCookieState(_token, setUserToken);
      }
    }

    fetchEvent();
  }, [token]);

  function createInfoCard(text: string, data: string, color: string) {
    return (
      <div className={`h-30 pl-2 rounded-2xl ${color}`}>
        <div className="h-full flex flex-col p-5 rounded-l-none rounded-xl gap-2 bg-foreground">
          <span className="text-xl">{text}</span>
          <span>{data}</span>
        </div>
      </div>
    );
  }

  const applicants = fighters.map((fighter: Fighter, i: number) => {
    return <FighterApplicant key={i} fighter={fighter} />;
  });

  return (
    event && (
      <div className="flex flex-col mx-100 my-10 gap-10">
        <div className="h-80 card justify-end bg-[url('@/public/LandingFond.jpg')] bg-cover bg-center">
          <div className="flex gap-5">
            <span className="pill">{LevelToString(event.level)}</span>
            <span className="pill">{SportToString(event.sport)}</span>
          </div>
          <h1>{event.name}</h1>
          <span className="text-grey">{event.clubName}</span>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {createInfoCard('Date', dateToString(event.date), 'bg-accent')}
          {createInfoCard('Location', 'Event city', 'bg-error')}
          {createInfoCard('Experience', `${event.experience} fights`, 'bg-warning')}
          {createInfoCard('Weight class', `${event.weight} kg`, 'bg-success')}
        </div>
        <div className="card">
          <h3>Description</h3>
          <p className="text-grey">{event.description}</p>
        </div>
        <div>
          <h2 className="font-bold mb-5">Fighter Applicants</h2>
          {fighters.length == 0 ? (
            <div className="card">
              <h3>No applicants yet</h3>
            </div>
          ) : (
            <div className="grid grid-cols-3 scroll-my-0">{applicants}</div>
          )}
        </div>
      </div>
    )
  );
}
