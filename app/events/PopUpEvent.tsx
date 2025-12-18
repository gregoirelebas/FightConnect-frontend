import { useEffect, useState } from 'react';
import Button, { ButtonVariant } from '../...components/Button';
import { Event } from '../...types/Event';
import { dateToString } from '../...helpers/date';
import { LevelToString } from '../...helpers/enum';
import { SportToString } from '../...helpers/enum';
import { getCookie } from '../...helpers/cookies';
import Cookies from '../...types/cookies';
import { ApplicationStatus, Role } from '../...types/enum';
import { useRouter } from 'next/navigation';

export default function PopUpEvent(props: {
  setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [event, setEvent] = useState<Event>();
  const [fighterToken, setFighterToken] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  let imageUrl = 'bg-[url(/cageMMA.png)]';
  switch (event?.sport) {
    case 'jjb':
      imageUrl = 'bg-[url(/TTjjb.png)]';
      break;
    case 'kickBoxing':
      imageUrl = 'bg-[url(/ring.png)]';
      break;
    case 'englishBoxing':
      imageUrl = 'bg-[url(/ring.png)]';
      break;
    case 'muayThai':
      imageUrl = 'bg-[url(/ring.png)]';
      break;

    default:
      break;
  }

  useEffect(() => {
    fetch(`${url}events/${props.token}`)
      .then((response) => response.json())
      .then((data) => setEvent(data.data));
    getCookie(Cookies.token).then((cookie) => {
      if (cookie) {
        setFighterToken(cookie);

        fetch(`${url}events/reservation/${cookie}/${props.token}`)
          .then((response) => response.json())
          .then((data) => setStatus(data.status));
      }
    });

    getCookie(Cookies.role).then((cookie) => {
      if (cookie) {
        setRole(cookie);
      }
    });
  }, []);
  console.log(status);
  const handleJoin = () => {
    setMessage('Your registration has been processed!.');
    setTimeout(() => {
      setMessage('');
    }, 3000);

    try {
      fetch(`${url}events/join`, {
        method: 'PUT',
        body: JSON.stringify({ fighterToken, eventToken: props.token }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => setStatus('onHold'));
    } catch (error) {
      console.log(error);
    }
  };

  let button;
  if (role === Role.Fighter) {
    button = (
      <Button className="w-30" onClick={handleJoin} variant={ButtonVariant.Accept}>
        Join
      </Button>
    );
    if (status === ApplicationStatus.Pending)
      button = (
        <Button className="w-30" variant={ButtonVariant.Ternary}>
          onHold{' '}
        </Button>
      );
    if (status === ApplicationStatus.Denied)
      button = (
        <Button className="w-30" variant={ButtonVariant.Ternary}>
          Denied
        </Button>
      );
    if (status === ApplicationStatus.Accepted)
      button = (
        <Button className="w-30" variant={ButtonVariant.Accept}>
          Accepted
        </Button>
      );
  }

  function displayEvent() {
    router.push('/events/' + event?.token);
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80 flex flex-col justify-center items-center">
      <div
        className={`w-150 h-100 ${imageUrl} bg-cover flex flex-col justify-between border border-accent rounded-xl relative p-5 items-center`}>
        <h1 className="text-wight text-2xl text-center border-5 w-[40%]">EVENT</h1>
        {event && (
          <div className="h-55">
            <h2 className="text-wight  text-2xl flex-auto text-center font-bold">
              {' '}
              {event.clubName}{' '}
            </h2>
            <h2 className="text-wight  text-2xl flex-auto text-center font-bold">
              {' '}
              {SportToString(event.sport)}{' '}
            </h2>
            <h2 className="text-wight  text-2xl flex-auto text-center font-bold">
              {' '}
              {LevelToString(event.level)}
            </h2>
            <h2 className="text-wight  text-2xl flex-auto text-center font-bold">
              {' '}
              {dateToString(event.date)}
            </h2>
          </div>
        )}
        ;
        <Button
          variant={ButtonVariant.Ternary}
          className="text-xs text-wight cursor-pointer absolute top-3 right-3"
          onClick={() => props.setIsPopUp(false)}>
          X
        </Button>
        <div className="flex justify-center space-x-4 items-end p-1">
          {button}
          <Button className="w-30" onClick={displayEvent} variant={ButtonVariant.Refuse}>
            More info
          </Button>
        </div>
      </div>
      {message && (
        <div className="mt-4 p-2 bg-green-200 text-black rounded shadow-md">{message}</div>
      )}
      {/* <p className="text-black ">The "Date" at the "Club" join for the "sport" fight.</p> */}
    </div>
  );
}
