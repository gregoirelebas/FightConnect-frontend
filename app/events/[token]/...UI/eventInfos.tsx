'use client';

import { useEffect, useState } from 'react';
import { dateToString, sortAscend } from '@/app/...helpers/date';
import { setFighterState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';
import { Application, Event } from '@/app/...types/event';
import {
  EventStatusToColor,
  EventStatusToString,
  LevelToColor,
  LevelToString,
  SportToString,
} from '@/app/...helpers/enum';

import FighterApplicant from './fighterApplicant';
import { Fighter } from '@/app/...types/fighter';
import { ApplicationStatus, EventStatus } from '@/app/...types/enum';
import InfoCard from '@/app/...UI/InfoCard';
import { getEventStatus } from '@/app/...helpers/events';

export default function EventInfos({ token }: { token: string | undefined }) {
  const [event, setEvent] = useState<Event>();
  const [applications, setApplications] = useState<Application[]>([]);

  const [userToken, setUserToken] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [status, setStatus] = useState<EventStatus | undefined>();

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
        setUserToken(userToken);
        setIsAdmin(userToken === eventRequest.data.promoterId.token);
      }

      const applicationRequest = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `users/applicants/${token}`
      ).then((response) => response.json());

      if (!applicationRequest.result) {
        console.error(applicationRequest.error);
        return;
      }

      setStatus(getEventStatus(Date.now(), eventRequest.data.date));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      applicationRequest.data.forEach((x: any) => {
        setFighterState(x.fighter, (value: Fighter) => {
          const application: Application = {
            fighter: value,
            status: x.status,
            date: x.date,
          };

          if (application.status != ApplicationStatus.Denied) {
            setApplications((prev) => [...prev, application]);
          }
        });
      });
    }

    fetchEvent();
  }, [token]);

  async function takeDecision(fighterToken: string, decision: boolean) {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fighterToken: fighterToken,
        promoterToken: userToken,
        eventToken: token,
        decision: decision,
      }),
    };

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + 'events/decision', options).then(
      (response) => response.json()
    );

    if (!request.result) {
      console.error(request.error);
      return;
    }

    if (decision) {
      const modified = applications.find((x) => x.fighter.token === fighterToken);
      if (modified) {
        //Have to remove and add again to trigger state refresh
        const buffer = applications.filter((x) => x.fighter.token !== fighterToken);
        modified.status = ApplicationStatus.Accepted;
        setApplications([...buffer, modified]);
      }
    } else {
      setApplications(applications.filter((x) => x.fighter.token !== fighterToken));
    }
  }

  const applicationElements = applications
    .sort((a, b) => sortAscend(a.date, b.date))
    .map((application: Application, i: number) => {
      return (
        <FighterApplicant
          key={i}
          fighter={application.fighter}
          showButtons={
            status === EventStatus.Upcoming &&
            isAdmin &&
            application.status === ApplicationStatus.Pending
          }
          status={application.status}
          acceptFighter={(fighterToken) => takeDecision(fighterToken, true)}
          refuseFighter={(fighterToken) => takeDecision(fighterToken, false)}
        />
      );
    });

  return (
    event && (
      <div className="flex flex-col mx-100 my-10 gap-10">
        <div className="h-80 card justify-end bg-[url('@/public/LandingFond.jpg')] bg-cover bg-center">
          <div className="w-full flex justify-between">
            <div className="flex gap-5">
              <span className={`pill bg-${LevelToColor(event.level)} text-white`}>
                {' '}
                {LevelToString(event.level)}
              </span>
              <span className="pill">{SportToString(event.sport)}</span>
            </div>
            {status && (
              <span
                className={`pill bg-${EventStatusToColor(status)[0]} text-${
                  EventStatusToColor(status)[1]
                }`}>
                {EventStatusToString(status)}
              </span>
            )}
          </div>
          <h1>{event.name}</h1>
          <span className="text-grey">{event.clubName}</span>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <InfoCard
            text="Date"
            data={dateToString(event.date)}
            bgColor="bg-accent"
            textColor="text-accent"
          />
          <InfoCard text="Location" data={event.city} bgColor="bg-error" textColor="text-error" />
          <InfoCard
            text="Experience"
            data={`${event.experience} fights`}
            bgColor="bg-warning"
            textColor="text-warning"
          />
          <InfoCard
            text="Weight class"
            data={`${event.weight} kg`}
            bgColor="bg-success"
            textColor="text-success"
          />
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
