'use client';

import { useEffect, useState } from 'react';
import { dateToString } from '@/app/...helpers/date';
import { setFighterState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';
import { Event } from '@/app/...types/event';
import { LevelToColor, LevelToString, SportToString } from '@/app/...helpers/enum';

import FighterApplicant from './fighterApplicant';
import { Fighter } from '@/app/...types/fighter';
import { ApplicationStatus } from '@/app/...types/enum';
import InfoCard from './infoCard';

interface Application {
  fighter: Fighter;
  status: ApplicationStatus;
  date: string;
}

export default function EventInfos({ token }: { token: string | undefined }) {
  const [event, setEvent] = useState<Event>();
  const [applications, setApplications] = useState<Application[]>([]);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEvent() {
      const eventRequest = await fetch(process.env.NEXT_PUBLIC_API_URL + `events/${token}`).then(
        (response) => response.json()
      );

      if (!eventRequest.result) {
        console.error(eventRequest.error);
        return;
      }

      setEvent(eventRequest.data);

      const userToken = await getCookie(Cookies.token);
      if (userToken) {
        setIsAdmin(userToken === eventRequest.data.promoterToken);
      }

      const applicationRequest = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `users/applicants/${token}`
      ).then((response) => response.json());

      if (!applicationRequest.result) {
        console.error(applicationRequest.error);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      applicationRequest.data.forEach((x: any) => {
        setFighterState(x.fighter, (value: Fighter) => {
          const application: Application = {
            fighter: value,
            status: x.status,
            date: x.date,
          };

          setApplications((prev) => [...prev, application]);
        });
      });
    }

    fetchEvent();
  }, [token]);

  const applicationElements = applications.map((application: Application, i: number) => {
    if (application.status != ApplicationStatus.Denied) {
      return <FighterApplicant key={i} fighter={application.fighter} isAdmin={isAdmin} />;
    }
  });

  return (
    event && (
      <div className="flex flex-col mx-100 my-10 gap-10">
        <div className="h-80 card justify-end bg-[url('@/public/LandingFond.jpg')] bg-cover bg-center">
          <div className="flex gap-5">
            <span className={`pill bg-${LevelToColor(event.level)} text-white`}>
              {' '}
              {LevelToString(event.level)}
            </span>
            <span className="pill">{SportToString(event.sport)}</span>
          </div>
          <h1>{event.name}</h1>
          <span className="text-grey">{event.clubName}</span>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <InfoCard text="Date" data={dateToString(event.date)} color="bg-accent" />
          <InfoCard text="Location" data={event.city} color="bg-error" />
          <InfoCard text="Experience" data={`${event.experience} fights`} color="bg-warning" />
          <InfoCard text="Weight class" data={`${event.weight} kg`} color="bg-success" />
        </div>
        <div className="card">
          <h3>Description</h3>
          <p className="text-grey">{event.description}</p>
        </div>
        <div>
          <h2 className="font-bold mb-5">Fighter applicants</h2>
          {applications.length == 0 ? (
            <div className="card">
              <h3>No applicants yet</h3>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">{applicationElements}</div>
          )}
        </div>
      </div>
    )
  );
}
