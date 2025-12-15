'use client';
import profile from '@/public/defaultProfile.png';
import Button, { ButtonVariant } from '@/app/...components/Button';
import Pills from '@/app/...components/Pills';
import { SportToString } from '@/app/...helpers/enum';
import { DateToString, SortAscend } from '@/app/...helpers/date';

import Image from 'next/image';
import { Sport } from '@/app/...types/enum';
import { Fighter } from '@/app/...types/fighter';

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className={`text-center card border border-${color}`}>
      <span>{label}</span>
      <span className={`text-4xl text-${color}`}>{count}</span>
    </div>
  );
}

function EventCard({
  sport,
  promoter,
  name,
  date,
}: {
  sport: Sport;
  promoter: string;
  name: string;
  date: Date;
}) {
  return (
    <div className="flex px-5 py-3 bg-background rounded-xl">
      <div className="w-1/4">
        <Pills>{SportToString(sport)}</Pills>
      </div>
      <div className="w-full grid grid-cols-3 items-center ">
        <span className="text-xl">{name}</span>
        <span>Promoter: {promoter}</span>
        <span className="text-right text-grey text-sm">{DateToString(date)}</span>
      </div>
    </div>
  );
}

export default function FigtherInfos({ user }: { user: Fighter }) {
  const sportPills = user.sports.map((sport: Sport, index: number) => (
    <Pills key={index}>{SportToString(sport)}</Pills>
  ));

  const eventHistory = [
    {
      sport: Sport.EnglishBoxing,
      name: 'Mortal Kombat',
      promoter: 'John Doe',
      date: '2023-01-01',
    },
    {
      sport: Sport.MMA,
      name: 'Ultimate Showdown',
      promoter: 'Not John Doe',
      date: '2023-05-14',
    },
    {
      sport: Sport.Jiujitsu,
      name: 'Grapple Fest',
      promoter: 'Jane Smith',
      date: '2024-02-04',
    },
  ];

  eventHistory.sort((a, b) => SortAscend(new Date(a.date), new Date(b.date)));

  const eventsCards = eventHistory.map((event, index) => (
    <EventCard
      key={index}
      sport={event.sport}
      name={event.name}
      promoter={event.promoter}
      date={new Date(event.date)}
    />
  ));

  return (
    <div className="flex flex-col gap-5 my-10 mx-100">
      <div className="card flex-row gap-10">
        <div>
          <Image src={profile} alt="Profile Picture" width={150} height={0} />
        </div>
        <div>
          <div className="flex flex-col gap-7">
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-bold">{user.name}</h1>
                <Button variant={ButtonVariant.Ternary} className=" text-accent" onClick={() => {}}>
                  Settings
                </Button>
              </div>
              <div className="flex gap-3">
                <span className="text-grey">
                  Weight: <span className="text-white">{user.weight}kg</span>
                </span>
                <span className="text-grey">•</span>
                <span className="text-grey">
                  Height: <span className="text-white">{user.height}cm</span>
                </span>
              </div>
            </div>
            <p className="text-grey">{user.bio}</p>
            <div className="flex flex-col gap-2">
              <span className="text-lg">Martial arts</span>
              <div className="flex gap-3">{sportPills}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-3">
        <StatCard label="Wins" count={user.victoryCount} color="success" />
        <StatCard label="Defeats" count={user.defeatCount} color="error" />
        <StatCard label="Draws" count={user.drawCount} color="warning" />
      </div>
      <div className="card">
        <h3 className="font-bold">Fight history</h3>
        <div className="flex flex-col scroll-my-1 gap-3">{eventsCards}</div>
      </div>
    </div>
  );
}
