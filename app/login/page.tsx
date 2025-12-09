'use client';

import { useState } from 'react';
import Button, { ButtonVariant } from '../...components/Button';
import Link from 'next/link';
import Input from '../...components/Input';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {};

  return (
    <div className="flex min-h-screen justify-center bg-[url(/LandingFond.jpg)] bg-cover font-sans ">
      <div className="h-225 w-200 pt-10 flex flex-col justify-around items-center">
        <h1 className="text-white text-7xl font-bold">Fight Connect</h1>
        <h3 className="text-center">
          Less headaches, more fights! Find fighters or fighting events fast and safely...
        </h3>
        <div className="mb-40 h-80 w-100 flex flex-col justify-around items-center rounded-lg bg-background">
          <Input
            className="w-xs"
            label={'Username'}
            placeholder={'Username...'}
            value={username}
            onChange={setUsername}></Input>
          <Input
            className="w-xs"
            label={'Password'}
            placeholder={'Password...'}
            value={password}
            onChange={setPassword}
            type="password"></Input>
          <Link href={'/events'}>
            <Button variant={ButtonVariant.Primary} onClick={() => handleLogin()} className="w-xs">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
