'use client';

import Header from '@/app/...UI/Header';
import FighterStats from './fighterStats';
import UsersInfos from './userInfos';

import { Fighter } from '@/app/...types/fighter';
import { EventStatus, Level, Role, Sport } from '@/app/...types/enum';
import PromoterStats from './promoterStats';
import { SortAscend } from '@/app/...helpers/date';
import EventCard from './eventCard';

export default function ProfileComponent() {
  const mockFighter: Fighter = {
    name: 'John Doe',
    email: 'email@email.com',
    password: 'password',
    phoneNumber: '0312345678',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profilePicture: '',
    role: Role.Fighter,
    sports: [Sport.MMA, Sport.Jiujitsu],
    level: Level.Amateur,
    weight: 80,
    height: 180,
    licenceNumber: 'string',
    victoryCount: 10,
    defeatCount: 5,
    drawCount: 3,
    lastFightDate: '2025-05-01',
  };

  const mockPromoter = {
    name: 'Jane Smith',
    email: 'email@email.col',
    password: 'password',
    phoneNumber: '0398765432',
    bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    profilePicture: '',
    role: Role.Promoter,
    sports: [Sport.EnglishBoxing],
    siret: '123 456 789 00012',
    organizations: [
      { name: 'Fight Night', date: '2023-03-15' },
      { name: 'Championship Series', date: '2023-07-22' },
    ],
  };

  const eventHistory = [
    {
      sport: Sport.EnglishBoxing,
      name: 'Mortal Kombat',
      promoter: 'John Doe',
      status: EventStatus.Completed,
      date: new Date('2023-01-01'),
    },
    {
      sport: Sport.MMA,
      name: 'Ultimate Showdown',
      promoter: 'Not John Doe',
      status: EventStatus.Cancelled,
      date: new Date('2023-05-14'),
    },
    {
      sport: Sport.Jiujitsu,
      name: 'Grapple Fest',
      promoter: 'Jane Smith',
      status: EventStatus.Upcoming,
      date: new Date('2024-02-04'),
    },
  ];

  eventHistory.sort((a, b) => SortAscend(a.date, b.date));

  const eventsCards = eventHistory.map((event, index) => (
    <EventCard
      key={index}
      sport={event.sport}
      name={event.name}
      promoter={event.promoter}
      status={event.status}
      date={new Date(event.date)}
    />
  ));

  return (
    <>
      <Header />
      <div className="flex flex-col gap-5 my-10 mx-100">
        <UsersInfos user={mockFighter} />
        <FighterStats user={mockFighter} />
        <PromoterStats user={mockPromoter} />
        <div className="card">
          <h3 className="font-bold">Fight history</h3>
          <div className="flex flex-col scroll-my-1 gap-3">{eventsCards}</div>
        </div>
      </div>
    </>
  );
}
