'use client';

import Button, { ButtonVariant } from '../...components/Button';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { setCookie } from '../...helpers/cookies';
import Cookies from '../...types/cookies';
import { Role } from '../...types/enum';

import LoginComponent from './login';
import { setCookieState } from '../...helpers/states';
import LogoutComponent from '../...UI/Logout';

export default function LandingComponent() {
  const router = useRouter();

  const [userToken, setUserToken] = useState<string>('');
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);

  useEffect(() => {
    setCookieState(Cookies.token, setUserToken);
  }, []);

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

  return (
    <div className="h-screen flex flex-col justify-between py-20 items-center bg-[url(/LandingFond.jpg)] bg-cover">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center">
          <h1 className="text-7xl font-bold">Fight Connect</h1>
          {userToken && <LogoutComponent className="absolute right-30" />}
          {!userToken && (
            <Button variant={ButtonVariant.Primary} className="absolute right-30" onClick={login}>
              Login
            </Button>
          )}
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

      {displayLogin && <LoginComponent setDisplay={setDisplayLogin} />}
    </div>
  );
}
