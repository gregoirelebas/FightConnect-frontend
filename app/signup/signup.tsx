'use client';

import { useState } from 'react';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';
import Image from 'next/image';
import Button, { ButtonVariant } from '../...components/Button';

import profile from '../../public/defaultProfile.png';
import { useRouter } from 'next/navigation';
import Logo from '../...components/Logo';

import { bioCK, emailCK, passwordCK, phoneNumberCK, usernameCK } from '../...constants/cookies';
import { setCookies } from '../...helpers/cookies';

export default function SignupComponent() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const uploadProfilePicture = () => {};

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loadNextPage = () => {
    if (!username || !email || !password) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords doesn't match");
      return;
    }

    if (!usernamePattern.test(username)) {
      return;
    }

    if (!emailPattern.test(email)) {
      return;
    }

    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      return;
    }

    setErrorMessage('');

    setCookies([
      [usernameCK, username],
      [emailCK, email],
      [passwordCK, password],
      [phoneNumberCK, phoneNumber],
      [bioCK, bio],
    ]);

    router.push('signup/fighter');
  };

  const usernamePattern = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phonePattern =
    /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

  return (
    <div className=" flex flex-col justify-between items-center pb-5">
      <Logo className="logo" />
      <h1 className="underline underline-offset-8">Sign up</h1>
      <form className="w-5xl flex flex-col gap-5 p-5 rounded-2xl" onSubmit={handleFormSubmit}>
        <span>Fields marqued with * are required</span>
        <div className="w-full flex justify-between">
          <fieldset className="flex flex-col gap-5">
            <Input
              label="Username*"
              placeholder="Username"
              type="text"
              pattern={usernamePattern}
              value={username}
              error="Username must be between 4 and 20 characters long"
              required={true}
              onChange={(value) => setUsername(String(value))}
            />
            <Input
              label="Email*"
              placeholder="example@email.com"
              type="email"
              pattern={emailPattern}
              value={email}
              error='Email must be under the format "mail@mail.com'
              required={true}
              onChange={(value) => setEmail(String(value))}
            />
            <Input
              label="Password*"
              placeholder="Password"
              type="password"
              value={password}
              required={true}
              onChange={(value) => setPassword(String(value))}
              onValidate={() => {}}
            />
            <Input
              label="Confirm password*"
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
              pattern={phonePattern}
              error="Phone number format invalid"
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(String(value))}
            />
          </fieldset>
          <fieldset className="flex flex-col items-center gap-5 px-5 ">
            <Image src={profile} alt="Profile picture" width={150} className="rounded-2xl" />
            <Button
              variant={ButtonVariant.Secondary}
              className="w-full"
              onClick={uploadProfilePicture}>
              Upload
            </Button>
          </fieldset>
        </div>
        <fieldset className="w-full">
          <TextArea
            label="Bio"
            placeholder="Write some words about you..."
            value={bio}
            className="w-full"
            onChange={setBio}
          />
        </fieldset>
      </form>
      <div className="flex flex-col items-center gap-2 mb-10">
        {errorMessage && <span className="text-error">{errorMessage}</span>}
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={loadNextPage}>
          Continue
        </Button>
      </div>
    </div>
  );
}
