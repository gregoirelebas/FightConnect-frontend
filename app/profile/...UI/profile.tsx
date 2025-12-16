'use client';

import Header from '@/app/...UI/Header';
import FighterStats from './fighterStats';
import UsersInfos from './userInfos';

import { Fighter } from '@/app/...types/fighter';
import { EventStatus, Level, Role, Sport } from '@/app/...types/enum';
import PromoterStats from './promoterStats';
import { sortAscend } from '@/app/...helpers/date';
import EventCard from './eventCard';
import { useEffect, useState } from 'react';
import { Promoter } from '@/app/...types/promoter';
import { setFighterState, setPromoterState } from '@/app/...helpers/states';
import { getCookie } from '@/app/...helpers/cookies';
import Cookies from '@/app/...types/cookies';

export default function ProfileComponent({ username }: { username: string | undefined }) {
  const [user, setUser] = useState<Fighter | Promoter>();
  const [userToken, setUserToken] = useState<string | undefined>('');
  const [profileToken, setProfileToken] = useState<string>('');

  useEffect(() => {
    async function fetchUser() {
      const token = await getCookie(Cookies.token);
      setUserToken(token);

      let url;
      if (username) {
        url = process.env.NEXT_PUBLIC_API_URL + `users/profile/${username}`;
      } else {
        url = process.env.NEXT_PUBLIC_API_URL + `users/me/${token}`;
      }

      const request = await fetch(url).then((response) => response.json());

      if (!request.result) {
        console.error(request.error);
        return;
      }

      setProfileToken(request.data.userId.token);

      if (request.data.userId.role === Role.Fighter) {
        setFighterState(request.data, setUser);
      } else if (request.data.userId.role === Role.Promoter) {
        setPromoterState(request.data, setUser);
      }
    }

    fetchUser();
  }, [username]);

  const eventHistory = [
    {
      sport: Sport.EnglishBoxing,
      name: 'Mortal Kombat',
      level: Level.Pro,
      status: EventStatus.Completed,
      date: '2023-01-01',
    },
    {
      sport: Sport.MMA,
      name: 'Ultimate Showdown',
      level: Level.Amateur,
      status: EventStatus.Cancelled,
      date: '2023-05-14',
    },
    {
      sport: Sport.Jiujitsu,
      name: 'Grapple Fest',
      level: Level.Pro,
      status: EventStatus.Upcoming,
      date: '2024-02-04',
    },
  ];

  eventHistory.sort((a, b) => sortAscend(a.date, b.date));

  const eventsCards = eventHistory.map((event, index) => (
    <EventCard
      key={index}
      sport={event.sport}
      name={event.name}
      level={event.level}
      status={event.status}
      date={event.date}
    />
  ));

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
