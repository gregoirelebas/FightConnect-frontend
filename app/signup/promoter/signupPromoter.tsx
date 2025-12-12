'use client';

import { Role, Sport } from '@/app/...types/enum';
import type { Promoter, Organization } from '@/app/...types/promoter';
import RoleSwitch from '../roleSwitch';
import SportDropdown from '@/app/...UI/SportDropdown';
import Input from '@/app/...components/Input';
import { useEffect, useState } from 'react';
import Button, { ButtonVariant } from '@/app/...components/Button';
import OrganizationComponent from './organization';
import { setCookieState } from '@/app/...helpers/states';
import Cookies from '@/app/...types/cookies';
import { deleteCookie } from '@/app/...helpers/cookies';
import { useRouter } from 'next/navigation';

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
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      bio: bio,
      profilePicture: profilePicture,
      role: Role.Promoter,
      sport: sport,
      siretNumber: siret,
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

    deleteCookie(Cookies.username);
    deleteCookie(Cookies.email);
    deleteCookie(Cookies.password);
    deleteCookie(Cookies.phoneNumber);
    deleteCookie(Cookies.bio);
    deleteCookie(Cookies.profilePicture);

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

  return (
    <div className="flex flex-col my-10 mx-20 gap-10">
      <RoleSwitch role={Role.Promoter} />
      <div className="card">
        <h3>Official informations</h3>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <div>Sport</div>
            <SportDropdown
              className="w-3xs"
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
            className="w-md"
            onChange={(value) => setSiret(String(value))}
          />
        </div>
      </div>
      <div className="card">
        <h3 className="text-center">Organizations you have worked with :</h3>
        <div className="min-h-20 flex flex-col justify-between items-center border border-white">
          <div className="scroll-auto">{organizationsElements}</div>
          <Button variant={ButtonVariant.Secondary} className="mb-5" onClick={addOrganization}>
            Add organization
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {errorMessage && <span className="text-error">{errorMessage}</span>}
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={registerPromoter}>
          Sign up!
        </Button>
      </div>
    </div>
  );
}
