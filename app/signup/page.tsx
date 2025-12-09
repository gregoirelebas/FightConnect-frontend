'use client';

import { useState } from 'react';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';
import Image from 'next/image';
import Button, { ButtonVariant } from '../...components/Button';

import profile from '../../public/profile.jpg';

export default function SignupPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const uploadProfilePicture = () => {};

  const loadNextPage = () => {};

  return (
    <div className="h-screen flex flex-col justify-between items-center pb-5">
      <h1 className="underline underline-offset-8">Sign up</h1>
      <form className="w-5xl flex flex-col gap-5 p-5 bg-foreground rounded-2xl">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-5">
            <Input
              label="Username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={setUsername}
            />
            <Input
              label="Email"
              placeholder="example@email.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Input
              label="Confirm password"
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
            <Input
              label="Phone number"
              placeholder="+33612345678"
              type="tel"
              value={phoneNumber}
              onChange={setPhoneNumber}
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
              variant={ButtonVariant.Ternary}
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
