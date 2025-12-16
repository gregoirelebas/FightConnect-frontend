'use client';

import { useEffect, useState } from 'react';
import Button, { ButtonVariant } from '@/app/...components/Button';
import { dateToString } from '@/app/...helpers/date';
import { setCookieState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';
import { Event } from '@/app/...types/event';

export default function EventInfos({ token }: { token: string | undefined }) {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [event, setEvent] = useState<Event>();

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

  return (
    (!event && <div>Loading...</div>) ||
    (event && (
      <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex justify-center items-center">
        <div className="w-1/2 h-2/3 bg-white flex justify-center items-center flex-col">
          <div className="h-1/10 w-full bg-gray-300 flex justify-around items-center">
            <h3 className="text-black pl-65 font-bold flex justify-center">Event : {event.name}</h3>
            <p className="pl-30 text-2xl font-bold text-black">X</p>
          </div>
          <div className="h-9/10 w-full border-2 border-gray-950 border-l-0 border-r-0 border-b-0 ">
            <div className="h-1/3 w-full bg-white text-black flex flex-col justify-around items-center">
              <div className="w-full flex flex-row justify-around">
                <p>{event.name}</p>
                <p>{dateToString(event.date)}</p>
                <p>{event.level}</p>
              </div>
              <span>{event.description}</span>
            </div>
            <div className="h-2/3 w-full pt-10 bg-gray-300 border-black border-2 border-l-0 border-r-0 border-b-0 flex flex-col items-center overflow-y-auto">
              {/* Fighter div for accept ou refuse  */}
              <div className="min-h-10 w-9/10 mt-3 bg-foreground text-white flex justify-around items-center ">
                <span>Fighter Name</span>
                <span>Date</span>
                <span>Catégorie</span>
                <div className="flex flex-row w-40 justify-around">
                  <Button
                    variant={ButtonVariant.Accept}
                    className="w-15 h-8 text-xs flex justify-center items-center">
                    Accept
                  </Button>
                  <Button
                    variant={ButtonVariant.Refuse}
                    className="w-15 h-8 text-xs flex justify-center items-center">
                    Refuse
                  </Button>
                </div>
              </div>
              <div className="min-h-10 w-9/10 mt-3 bg-foreground text-white flex justify-around items-center overflow-y-auto">
                <span>Fighter Name</span>
                <span>Date</span>
                <span>Catégorie</span>
                <div className="flex flex-row w-40 justify-around">
                  <Button
                    variant={ButtonVariant.Accept}
                    className="w-15 h-8 text-xs flex justify-center items-center">
                    Accept
                  </Button>
                  <Button
                    variant={ButtonVariant.Refuse}
                    className="w-15 h-8 text-xs flex justify-center items-center">
                    Refuse
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
