'use client';

import { useEffect, useState } from 'react';
import { dateToString, sortAscend } from '@/app/...helpers/date';
import { setFighterState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { getCookie } from '@/app/...helpers/cookies';
import { Application, Event } from '@/app/...types/Event';
import {
  ApplicationStatusToColor,
  ApplicationStatusToString,
  EventStatusToColor,
  EventStatusToString,
  LevelToColor,
  LevelToString,
  SportToString,
} from '@/app/...helpers/enum';

import FighterApplicant from './fighterApplicant';
import { Fighter } from '@/app/...types/fighter';
import { ApplicationStatus, EventStatus, Role } from '@/app/...types/enum';
import InfoCard from '@/app/...UI/InfoCard';
import { getEventStatus } from '@/app/...helpers/events';
import Button, { ButtonVariant } from '@/app/...components/Button';
import { faCalendar, faMapPin, faTrophy, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export default function EventInfos({ token }: { token: string | undefined }) {
  const [event, setEvent] = useState<Event>();
  const [applications, setApplications] = useState<Application[]>([]);

  const [userToken, setUserToken] = useState<string>('');
  const [userRole, setUserRole] = useState<Role>(Role.Fighter);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [status, setStatus] = useState<EventStatus>();

  const [userApplication, setUserApplication] = useState<Application | null>(null);
  const [hasApplied, setHasApplied] = useState<boolean>(false);

  const [isDecisionRequest, setDecisionRequest] = useState<boolean>(false);
  const [isCancelRequest, setCancelRequest] = useState<boolean>(false);
  const [isJoinRequest, setJoinRequest] = useState<boolean>(false);
  const [isDelete, setisDelete] = useState<boolean>(false);

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

      const role = await getCookie(Cookies.role);
      if (role) {
        setUserRole(role as Role);
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

          if (role === Role.Fighter && application.fighter.token === userToken) {
            setUserApplication(application);
            setHasApplied(true);
          }
        });
      });
    }

    fetchEvent();
  }, [token]);

  async function takeDecision(fighterToken: string, decision: boolean) {
    if (isDecisionRequest) return;

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

    setDecisionRequest(true);

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + 'events/decision', options).then(
      (response) => response.json()
    );

    setDecisionRequest(false);

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


  const popUpDeleteEvent = () => {
      return (
        <>
        <div className="absolute top-0 left-0 w-screen h-screen bg-background/70 flex flex-col justify-center items-center">
          <div className='flex flex-col border border-gray-500 justify-around items-center w-1/6 max-h-1/3 min-h-1/5 bg-foreground rounded-2xl'>
           <span>Event succesfully deleted !</span> 
           <Button variant={ButtonVariant.Primary} onClick={() => setisDelete(false)}>Go back</Button>
          </div>
          </div>
        </>
      )
    }

  async function cancelEvent() {
    if (isCancelRequest) return;

    const options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ promoterToken: userToken, eventToken: event?.token }),
    };

    setCancelRequest(true);

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + 'events/cancel', options).then(
      (response) => response.json()
    );

    setCancelRequest(false);

    
    
    if (request.result) {
     setisDelete(true)
    }

    if (!request.result) {
      console.error(request.error);
    }

    setStatus(EventStatus.Cancelled);
    setIsAdmin(false);

    if (event) {
      const buffer = event;
      buffer.status = EventStatus.Cancelled;
      setEvent(buffer);
    }
  }

  async function joinEvent() {
    if (isJoinRequest) return;

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fighterToken: userToken, eventToken: event?.token }),
    };

    setJoinRequest(true);

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + 'events/join', options).then(
      (response) => response.json()
    );

    setJoinRequest(false);

    if (!request.result) {
      console.error(request.error);
    }

    setHasApplied(true);
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

  const userStatus: ApplicationStatus = userApplication
    ? userApplication.status
    : ApplicationStatus.Pending;

  return (
    event && (
      <div className="flex flex-col mx-100 my-10 gap-10">
        <div className="h-80 card justify-end bg-[url('@/public/LandingFond.jpg')] bg-cover bg-center">
          <div className="w-full flex justify-between">
            <div className="flex gap-5">
              <span className={`pill bg-${LevelToColor(event.level)}`}>
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
          <div className="flex justify-between items-center">
            <span className="text-grey">{event.clubName}</span>
            {isAdmin && status === EventStatus.Upcoming && (
              <div>
                <Button variant={ButtonVariant.Primary} onClick={cancelEvent}>
                  Cancel event
                </Button>
              </div>
            )}
            {status &&
              userRole === Role.Fighter &&
              (hasApplied ? (
                <span className={`pill bg-${ApplicationStatusToColor(userStatus)}`}>
                  {ApplicationStatusToString(userStatus)}
                </span>
              ) : (
                <Button variant={ButtonVariant.Primary} onClick={joinEvent}>
                  Join event
                </Button>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <InfoCard
            icon={faCalendar}
            text="Date"
            data={dateToString(event.date)}
            bgColor="bg-accent"
            textColor="text-accent"
          />
          <InfoCard
            icon={faMapPin}
            text="Location"
            data={event.city}
            bgColor="bg-error"
            textColor="text-error"
          />
          <InfoCard
            icon={faTrophy}
            text="Experience"
            data={`${event.experience} fights`}
            bgColor="bg-warning"
            textColor="text-warning"
          />
          <InfoCard
            icon={faWeightHanging}
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
        {isDelete && popUpDeleteEvent()}
      </div>
    )
  );
}
