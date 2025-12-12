'use client';

import Button, { ButtonVariant } from './...components/Button';
import { useRouter } from 'next/navigation';
import Input from './...components/Input';
import { useContext, useState } from 'react';
import { setCookie } from './...helpers/cookies';
import Cookies from './...types/cookies';
import { Role } from './...types/enum';
import { UserContext } from './...providers/userProvider';

export default function LandingComponent() {
  const router = useRouter();

  const userContext = useContext(UserContext);

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [displayLogin, setDisplayLogin] = useState<boolean>(false);

  const [isRequestSent, setRequestSent] = useState<boolean>(false);

  const signUpFighter = () => {
    setCookie(Cookies.role, Role.Fighter);
    router.push('/signup');
  };

  const signUpPromoter = () => {
    setCookie(Cookies.role, Role.Promoter);
    router.push('/signup');
  };

  const login = () => {
    setDisplayLogin(true);
  };

  const createInfoCard = (text: string) => {
    return (
      <div className="w-2xs pl-2 rounded-2xl bg-accent">
        <div className="h-full flex justify-center items-center p-5 rounded-l-none rounded-xl bg-foreground">
          <h3 className="text-2xl">{text}</h3>
        </div>
      </div>
    );
  };

  const handleLogin = async () => {
    if (isRequestSent) return;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    };

    setRequestSent(true);

    const request = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/signin', options).then(
      (response) => response.json()
    );

    setRequestSent(false);

    if (!request.result) {
      console.error(request.error);
      return;
    }

    userContext.setToken(request.token);
    userContext.setRole(request.role as Role);

    setCookie(Cookies.token, request.token);
    setCookie(Cookies.role, request.role);

    router.push('/events');
  };

  return (
    <div className="h-screen flex flex-col justify-between py-20 items-center bg-[url(/LandingFond.jpg)] bg-cover">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center">
          <h1 className="text-7xl font-bold">Fight Connect</h1>
          <Button variant={ButtonVariant.Primary} className="absolute right-30" onClick={login}>
            Login
          </Button>
        </div>
        <h3>Less headaches, more fights! Find fighters or fighting events fast and safely...</h3>
      </div>

      {!displayLogin && (
        <>
          <div className="h-30 flex gap-40">
            <Button
              variant={ButtonVariant.Primary}
              onClick={signUpFighter}
              className="w-xs text-5xl ring-white ring-4">
              Fighter
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={signUpPromoter}
              className="w-xs text-5xl ring-white ring-4">
              Promoter
            </Button>
          </div>
          <div className="h-40 flex gap-20">
            {createInfoCard('More than 1,215 fighters and 350 promoters')}
            {createInfoCard('100+ events per month')}
            {createInfoCard('Join the biggest fighting community!')}
          </div>
        </>
      )}

      {displayLogin && (
        <div className="mb-45 h-80 w-100 flex flex-col justify-around items-center rounded-lg bg-background">
          <p
            className="font-bold text-xl ml-85 cursor-pointer"
            onClick={() => setDisplayLogin(false)}>
            X
          </p>
          <Input
            className="w-xs"
            label={'Username'}
            placeholder={'Username...'}
            value={name}
            onChange={(value) => setName(String(value))}></Input>
          <Input
            className="w-xs"
            label={'Password'}
            placeholder={'Password...'}
            value={password}
            onChange={(value) => setPassword(String(value))}
            type="password"></Input>
          <Button variant={ButtonVariant.Primary} onClick={() => handleLogin()} className="w-xs">
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
