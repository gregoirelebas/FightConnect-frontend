'use client';

import Header from '@/app/...UI/Header';
import FighterStats from './fighterStats';
import UsersInfos from './userInfos';

import { Fighter } from '@/app/...types/fighter';
import { Role } from '@/app/...types/enum';
import PromoterStats from './promoterStats';
import { sortAscend } from '@/app/...helpers/date';
import EventCard from './eventCard';
import { useEffect, useState } from 'react';
import { Promoter } from '@/app/...types/promoter';
import { setFighterState, setPromoterState } from '@/app/...helpers/states';
import { getCookie } from '@/app/...helpers/cookies';
import Cookies from '@/app/...types/cookies';
import { Event } from '@/app/...types/Event';
import { getEventStatus } from '@/app/...helpers/events';
import { useRouter } from 'next/navigation';

export default function ProfileComponent({ username }: { username: string | undefined }) {
  const router = useRouter();

  const [user, setUser] = useState<Fighter | Promoter>();
  const [userToken, setUserToken] = useState<string>('');
  const [profileToken, setProfileToken] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [today, setToday] = useState<number>(0);

  useEffect(() => {
    async function fetchUser() {
      const token = await getCookie(Cookies.token);
      if (token) {
        setUserToken(token);
      }

      let url;
      if (username) {
        url = process.env.NEXT_PUBLIC_API_URL + `users/profile/${username}`;
      } else {
        url = process.env.NEXT_PUBLIC_API_URL + `users/me/${token}`;
      }

      const userRequest = await fetch(url).then((response) => response.json());

      if (!userRequest.result) {
        console.error(userRequest.error);
        return;
      }

      setProfileToken(userRequest.data.userId.token);

      if (userRequest.data.userId.role === Role.Fighter) {
        setFighterState(userRequest.data, setUser);
        url = process.env.NEXT_PUBLIC_API_URL + `events/fighter/${userRequest.data.userId.token}`;
      } else if (userRequest.data.userId.role === Role.Promoter) {
        setPromoterState(userRequest.data, setUser);
        url = process.env.NEXT_PUBLIC_API_URL + `events/promoter/${userRequest.data.userId.token}`;
      } else {
        console.error('Unknown user role: ' + userRequest.data.userId.role);
        return;
      }

      const eventRequest = await fetch(url).then((response) => response.json());

      if (!eventRequest.result) {
        console.error(eventRequest.error);
        return;
      }

      setEvents(eventRequest.data);

      setToday(Date.now());
    }

    fetchUser();
  }, [username]);

  function displayEvent(token: string) {
    router.push('/events/' + token);
  }

  events.sort((a, b) => sortAscend(a.date, b.date));

  const eventsCards = events.map((event, index) => {
    return (
      <EventCard
        key={index}
        token={event.token}
        sport={event.sport}
        name={event.name}
        level={event.level}
        status={getEventStatus(today, event.date)}
        date={event.date}
        onClick={displayEvent}
      />
    );
  });

  return (
    <>
      <Header />
      {user && (
        <div className="flex flex-col gap-5 my-10 mx-100">
          <UsersInfos user={user} isAdmin={userToken === profileToken} />
          {user.role === Role.Fighter && <FighterStats user={user as Fighter} />}
          {user.role === Role.Promoter && <PromoterStats user={user as Promoter} />}
          <div className="card">
            <h3 className="font-bold">Fighting events history</h3>
            <div className="flex flex-col scroll-my-1 gap-3">{eventsCards}</div>
          </div>
        </div>
      )}
    </>
  );
}
