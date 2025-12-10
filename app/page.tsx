'use client';

import Link from 'next/link';
import Button, { ButtonVariant } from './...components/Button';

export default function Landing() {
  const signUpFighter = () => {};

  const signUpPromoter = () => {};

  const login = () => {};

  return (
    <div className="flex min-h-screen justify-center bg-[url(/LandingFond.jpg)] bg-cover font-sans ">
      <div className="h-225 w-250 pt-10 flex flex-col justify-around items-center">
        <div className="flex flex-row">
          <h1 className="text-white ml-155 w-180 text-7xl font-bold">Fight Connect</h1>
          <Link href={'/login'}>
            <Button
              variant={ButtonVariant.Primary}
              onClick={login}
              className="ml-60 h-10 w-30 flex justify-center items-center">
              Login
            </Button>
          </Link>
        </div>
        <h3>Less headaches, more fights! Find fighters or fighting events fast and safely...</h3>
        <div className="h-40 w-135 mb-30 flex justify-around bg-foreground rounded-3xl items-center text">
          <Button variant={ButtonVariant.Primary} onClick={signUpFighter} className="h-15 w-40 ">
            Fighter
          </Button>
          <Button variant={ButtonVariant.Secondary} onClick={signUpPromoter} className="h-15 w-40">
            Promoter
          </Button>
        </div>
        <div className="w-250 flex justify-around">
          <div className="h-40 w-60 border border-blue-300 rounded-3xl bg-black/90 flex items-center">
            <div className="bg-blue-300 mr-2 h-30 w-1 rounded-xl"></div>
            <text>More than 1,000 Combattant</text>
          </div>
          <div className="h-40 w-60 border border-blue-300 rounded-3xl bg-black/90 flex items-center">
            <div className="bg-blue-300 mr-2 h-30 w-1 rounded-xl"></div>
            <text>More than 100 Events</text>
          </div>
          <div className="h-40 w-60 border border-blue-300 rounded-3xl bg-black/90 flex items-center">
            <div className="bg-blue-300 mr-2 h-30 w-1 rounded-xl"></div>
            <text>Join the biggest community of sport fighting</text>
          </div>
        </div>
      </div>
    </div>
  );
}
