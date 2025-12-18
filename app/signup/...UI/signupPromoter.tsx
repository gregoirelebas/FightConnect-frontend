'use client';

import { Role, Sport, Step } from '@/app/...types/enum';
import type { Promoter, Organization } from '@/app/...types/promoter';
import RoleSwitch from './roleSwitch';
import SportDropdown from '@/app/...UI/SportDropdown';
import Input from '@/app/...components/Input';
import { useEffect, useState } from 'react';
import Button, { ButtonVariant } from '@/app/...components/Button';
import OrganizationComponent from './organization';
import HeaderSignupComponent from './HeaderSignup';
import { setCookieState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { deleteCookies, setCookie } from '@/app/...helpers/cookies';
import { useRouter } from 'next/navigation';
import HeaderSignup from './HeaderSignup';
import Link from 'next/link';

export default function SignupPromoterComponent() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  const [sport, setSport] = useState<Sport>(Sport.EnglishBoxing);
  const [siret, setSiret] = useState<string>('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isRequestSent, setRequestSent] = useState<boolean>(false);

  useEffect(() => {
    setCookieState(Cookies.username, setUsername);
    setCookieState(Cookies.email, setEmail);
    setCookieState(Cookies.password, setPassword);
    setCookieState(Cookies.phoneNumber, setPhoneNumber);
    setCookieState(Cookies.bio, setBio);
    setCookieState(Cookies.profilePicture, setProfilePicture);
  }, []);

  const addOrganization = () => {
    setOrganizations([...organizations, { name: '', date: '' }]);
  };

  const modifyOrganization = (index: number, value: Organization) => {
    const newOrganizations = [...organizations];
    newOrganizations[index] = value;
    setOrganizations(newOrganizations);
  };

  const removeOrganization = (index: number) => {
    const newOrganizations = organizations.filter((_, i) => i !== index);
    setOrganizations(newOrganizations);
  };

  const registerPromoter = async () => {
    if (isRequestSent) return; //Prevent multiple requests if user spam the button.

    if (!siret) {
      setErrorMessage('You must be attached to a company');
      return;
    }

    if (organizations.length > 0) {
      const areOrganizationsValid = organizations.every((x) => {
        if (!x.name) return false;
        if (!x.date) return false;

        return true;
      });

      if (!areOrganizationsValid) {
        setErrorMessage('All organizations fields must be filled');
        return;
      }
    }

    setErrorMessage('');

    const promoter: Promoter = {
      name: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      bio: bio,
      profilePicture: profilePicture,
      role: Role.Promoter,
      sports: [sport],
      siret: siret,
      organizations: organizations,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promoter),
    };

    setRequestSent(true);

    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'users/signup/promoter',
      options
    ).then((response) => response.json());

    setRequestSent(false);

    if (!request.result) {
      console.error(request.error);
      return;
    }

    setCookie(Cookies.token, request.token);
    setCookie(Cookies.role, Role.Fighter);

    deleteCookies([
      Cookies.username,
      Cookies.email,
      Cookies.password,
      Cookies.phoneNumber,
      Cookies.bio,
      Cookies.profilePicture,
    ]);

    router.push('/dashboard');
  };

  const organizationsElements = organizations.map((organization, index) => (
    <OrganizationComponent
      key={index}
      index={index}
      onChange={modifyOrganization}
      onRemove={removeOrganization}
    />
  ));

  const DEBUG_fillForm = () => {
    setSiret('32411889200037');
  };

  return (
    <div className="flex h-screen w-full justify-center">
     <div className='flex flex-col w-2/3 p-3 pb-8 pt-5 justify-between items-center'>
      <Button variant={ButtonVariant.Primary} className="absolute right-5" onClick={DEBUG_fillForm}>
        [DEBUG]_FillForm
      </Button>
      <HeaderSignupComponent step={Step.Step2} />  
      <div className='card w-9/10 flex flex-row items-center justify-center mt-2 pr-40'>
      <span>I'm a :</span>
      <RoleSwitch role={Role.Promoter} />
      </div>
      <div className="card w-9/10 m-2">
        <p>Official informations</p>
        <div className="flex flex-col justify-around items-center gap-3 ">
          <div className="flex flex-col w-9/10">
            <div>Select a sport :</div>
            <SportDropdown
              className="w-full"
              onChange={(value) => {
                setSport(value as Sport);
              }}
            />
          </div>
          <Input
            label={'SIRET Number'}
            placeholder={'32411889200037'}
            value={siret}
            pattern={/\d{14}/}
            error="SIRET format invalid"
            className="w-238"
            onChange={(value) => setSiret(String(value))}
          />
        </div>
      </div>
      <div className="card w-9/10">
        <p className="text-center">Organizations you have worked with :</p>
        <div className="min-h-20 flex flex-col justify-between items-center rounded-2xl">
          <div className="scroll-auto">{organizationsElements}</div>
          <Button variant={ButtonVariant.Secondary} className="mb-5" onClick={addOrganization}>
            Add organization
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        {errorMessage && <span className="text-error">{errorMessage}</span>}
        <Link href="/signup" >
        <Button variant={ButtonVariant.Ternary} className="w-3xs">
          Back
        </Button>
        </Link>
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={registerPromoter}>
          Sign up!
        </Button>
      </div>
    </div>
    </div> 
  );
}
