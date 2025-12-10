'use client';

import { useState } from 'react';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';
import Image from 'next/image';
import Button, { ButtonVariant } from '../...components/Button';

import profile from '../../public/profile.jpg';
import { useRouter } from 'next/navigation';
import Logo from '../...components/Logo';

import { bioCK, emailCK, passwordCK, phoneNumberCK, usernameCK } from '../...constants/cookies';
import { setCookies } from '../...helpers/cookies';

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const uploadProfilePicture = () => {};

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loadNextPage = () => {
    setCookies([
      [usernameCK, username],
      [emailCK, email],
      [passwordCK, password],
      [phoneNumberCK, phoneNumber],
      [bioCK, bio],
    ]);

    router.push('signup/fighter');
  };

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phonePattern =
    /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

  return (
    <div className="h-screen flex flex-col justify-between items-center pb-5">
      <Logo className="logo" />
      <h1 className="underline underline-offset-8">Sign up</h1>
      <form className="w-5xl flex flex-col gap-5 p-5 rounded-2xl" onSubmit={handleFormSubmit}>
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-5">
            <Input
              label="Username"
              placeholder="Username"
              type="text"
              pattern="^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
              value={username}
              required={true}
              onChange={(value) => setUsername(String(value))}
            />
            <Input
              label="Email"
              placeholder="example@email.com"
              type="email"
              pattern={emailPattern.toString()}
              value={email}
              required={true}
              onChange={(value) => setEmail(String(value))}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              required={true}
              onChange={(value) => setPassword(String(value))}
              onValidate={() => {}}
            />
            <Input
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              required={true}
              onChange={(value) => setConfirmPassword(String(value))}
            />
            <Input
              label="Phone number"
              placeholder="+33612345678"
              type="tel"
              pattern={phonePattern.toString()}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(String(value))}
            />
          </div>
          <div className="flex flex-col items-center gap-5 px-5 ">
            <Image
              src={profile}
              alt="Profile picture"
              width={200}
              height={200}
              className="rounded-full"
            />
            <Button
              variant={ButtonVariant.Secondary}
              className="w-full"
              onClick={uploadProfilePicture}>
              Upload
            </Button>
          </div>
        </div>
        <div className="w-full">
          <TextArea
            label="Bio"
            placeholder="Write some words about you..."
            value={bio}
            className="w-full"
            onChange={setBio}
          />
        </div>
      </form>
      <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={loadNextPage}>
        Continue
      </Button>
    </div>
  );
}
