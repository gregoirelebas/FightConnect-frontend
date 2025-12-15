'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { setCookie } from '../...helpers/cookies';
import Cookies from '../...types/cookies';

import Input from '../...components/Input';
import Button, { ButtonVariant } from '../...components/Button';

interface LoginProps {
  setDisplay: (value: boolean) => void;
}

/**
 * LoginComponent - A login form component for user authentication.
 *
 * Renders a modal login form that accepts username and password credentials.
 * On successful authentication, stores authentication tokens in cookies and
 * redirects the user to the events page.
 *
 * @component
 * @param {LoginProps} props - The component props
 * @param {Function} props.setDisplayLogin - Callback function to toggle the login modal visibility
 *
 * @returns {JSX.Element} A login form container with username input, password input, and login button
 *
 * @example
 * const [displayLogin, setDisplayLogin] = useState(true);
 * return <LoginComponent setDisplayLogin={setDisplayLogin} />;
 *
 * @remarks
 * - Prevents multiple simultaneous login requests using the `isRequestSent` flag
 * - Posts credentials to `{NEXT_PUBLIC_API_URL}/users/signin` endpoint
 * - Stores authentication token and user role in cookies upon successful login
 * - Redirects to '/events' page after successful authentication
 * - Logs errors to console if login request fails
 */
export default function LoginComponent(props: LoginProps) {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isRequestSent, setRequestSent] = useState<boolean>(false);

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

    await setCookie(Cookies.token, request.token);
    await setCookie(Cookies.role, request.role);

    router.push('/events');
  };

  return (
    <div className="mb-45 h-80 w-100 flex flex-col justify-around items-center rounded-lg bg-background">
      <p className="font-bold text-xl ml-85 cursor-pointer" onClick={() => props.setDisplay(false)}>
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
  );
}
