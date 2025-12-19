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
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';

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
    setCookie(Cookies.role, Role.Promoter);

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

  return (
    <div className="flex flex-col justify-center mx-150 my-10 gap-5">
      <HeaderSignupComponent step={Step.Step2} />
      <div className="card flex items-center justify-center">
        <RoleSwitch role={Role.Promoter} />
      </div>
      <div className="card m-2">
        <div className="flex flex-col justify-around gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFistRaised} className="text-accent" />
              <span>Primary sport:</span>
            </div>
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
            className="w-full"
            onChange={(value) => setSiret(String(value))}
          />
        </div>
        <p className="text-center">Organizations you have worked with :</p>
        <div className="min-h-20 flex flex-col justify-between items-center border pt-5 mb-5 border-accent rounded-2xl">
          <div className="w-full flex flex-col gap-2 scroll-auto">{organizationsElements}</div>
          <Button variant={ButtonVariant.Secondary} className="m-5" onClick={addOrganization}>
            Add organization
          </Button>
        </div>
        <div className="flex gap-2">
          {errorMessage && <span className="text-error">{errorMessage}</span>}
          <Button variant={ButtonVariant.Primary} className="w-full" onClick={registerPromoter}>
            Complete signup
          </Button>
        </div>
      </div>
    </div>
  );
}
