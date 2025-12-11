'use client';

import { useRef, useState } from 'react';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';
import Image from 'next/image';
import Button, { ButtonVariant } from '../...components/Button';

import profile from '../../public/defaultProfile.png';
import { useRouter } from 'next/navigation';
import Logo from '../...components/Logo';

import Cookies from '../...types/cookies';
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

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [isRequestSent, setRequestSent] = useState<boolean>(false);

  const uploadProfilePicture = async (files: FileList | null) => {
    if (!files || files.length == 0) return;

    setProfilePicture(files[0].name);
  };

  const loadNextPage = async () => {
    if (isRequestSent) return;

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

    setRequestSent(true);

    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'users/checkUsername/' + username
    ).then((response) => response.json());

    setRequestSent(false);

    if (!request.result) {
      if (request.error) {
        console.error(request.error);
      } else {
        setErrorMessage('This username is already used');
      }

      return;
    }

    setErrorMessage('');

    setCookies([
      [Cookies.username, username],
      [Cookies.email, email],
      [Cookies.password, password],
      [Cookies.phoneNumber, phoneNumber],
      [Cookies.bio, bio],
      [Cookies.profilePicture, profilePicture],
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
      <div className="w-5xl flex flex-col gap-5 p-5 rounded-2xl">
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
          <div className="flex flex-col items-center gap-5 px-5 ">
            <Image src={profile} alt="Profile picture" width={150} className="rounded-2xl" />
            {profilePicture && <span className="text-grey">{profilePicture}</span>}
            <Button
              variant={ButtonVariant.Secondary}
              className="w-full"
              onClick={() => {
                uploadInputRef.current?.click();
              }}>
              Upload
            </Button>
            <input
              ref={uploadInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => uploadProfilePicture(e.target.files)}
            />
          </div>
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
      </div>
      <div className="flex flex-col items-center gap-2 mb-10">
        {errorMessage && <span className="text-error">{errorMessage}</span>}
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={loadNextPage}>
          Continue
        </Button>
      </div>
    </div>
  );
}
