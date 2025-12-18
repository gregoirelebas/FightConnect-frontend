'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Checkbox from '@/app/...components/Checkbox';
import Input from '@/app/...components/Input';
import RadioButton from '@/app/...components/RadioButton';
import Cookies from '@/app/...types/cookies';
import { setCookieState, setNumericState } from '@/app/...helpers/states';

import { Level, Role, Sport } from '@/app/...types/enum';
import { Fighter } from '@/app/...types/fighter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookies, setCookie } from '@/app/...helpers/cookies';
import RoleSwitch from './roleSwitch';

export default function SignupFighterComponent() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  const [sportList, setSportList] = useState<Sport[]>([]);
  const [level, setLevel] = useState<Level>(Level.Amateur);

  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [licence, setLicence] = useState<string>('');

  const [hasExperience, setHasExperience] = useState<boolean>(false);

  const [victories, setVictories] = useState<number>(0);
  const [defeats, setDefeats] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const [lastFightDate, setLastFightDate] = useState<string>('');

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

  const onSportChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      setSportList([...sportList, value as Sport]);
    } else {
      setSportList(sportList.filter((sport) => sport !== value));
    }
  };

  const registerFighter = async () => {
    if (isRequestSent) return; //Prevent multiple requests if user spam the button.

    if (sportList.length == 0) {
      return;
    }

    if (weight == 0 || height == 0) {
      setErrorMessage('Please fill in your height and weight');
      return;
    }

    if (!licence) {
      return;
    }

    if (hasExperience && !lastFightDate) {
      setErrorMessage('Please fill in your last fight date');
      return;
    }

    const fighter: Fighter = {
      name: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      bio: bio,
      profilePicture: profilePicture,
      role: Role.Fighter,
      sports: sportList,
      level: level,
      weight: weight,
      height: height,
      licenceNumber: licence,
      victoryCount: hasExperience ? victories : 0,
      defeatCount: hasExperience ? defeats : 0,
      drawCount: hasExperience ? draws : 0,
      lastFightDate: hasExperience ? lastFightDate : '',
      token: '',
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fighter),
    };

    setRequestSent(true);

    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'users/signup/fighter',
      options
    ).then((response) => response.json());

    setRequestSent(false);

    if (!request.result) {
      console.error('Error registering fighter:', request.error);
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

  const DEBUG_fillForm = () => {
    setSportList([Sport.MMA, Sport.Jiujitsu]);
    setWeight(80);
    setHeight(180);
    setLicence('XXXX-XXXX-XXXX');
    setHasExperience(true);
    setVictories(5);
    setDefeats(2);
    setDraws(3);
    setLastFightDate('2025-06-15');
  };

  return (
    <div className="flex flex-col gap-10 my-10 mx-20">
      <RoleSwitch role={Role.Fighter} />
      <Button variant={ButtonVariant.Primary} className="absolute right-5" onClick={DEBUG_fillForm}>
        [DEBUG]_FillForm
      </Button>
      <div className="flex gap-5">
        <div className="card">
          <h3>Level</h3>
          <fieldset className="cardElement">
            <RadioButton
              name="level"
              label="Pro"
              value={Level.Pro}
              onChange={(value) => setLevel(value as Level)}
            />
            <RadioButton
              name="level"
              label="Amateur"
              value={Level.Amateur}
              isChecked={true}
              onChange={(value) => setLevel(value as Level)}
            />
          </fieldset>
        </div>
        <div className="card">
          <h3>Sport(s)</h3>
          <fieldset className="cardElement">
            <Checkbox name="sport" label="MMA" value={Sport.MMA} onChange={onSportChange} />
            <Checkbox
              name="sport"
              label="English boxing"
              value={Sport.EnglishBoxing}
              onChange={onSportChange}
            />
            <Checkbox
              name="sport"
              label="Brasilian Jiu-jitsu"
              value={Sport.Jiujitsu}
              onChange={onSportChange}
            />
            <Checkbox
              name="sport"
              label="Kick boxing"
              value={Sport.KickBoxing}
              onChange={onSportChange}
            />
            <Checkbox
              name="sport"
              label="Muay Thai"
              value={Sport.MuayThai}
              onChange={onSportChange}
            />
          </fieldset>
          {sportList.length == 0 && (
            <span className="text-error">At least one sport is required</span>
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="card w-fit">
          <h3>Body</h3>
          <div className="flex gap-20">
            <Input
              label="Weight (kg)"
              placeholder="Weight"
              value={weight}
              min={0}
              required={true}
              onChange={(value) => setNumericState(String(value), setWeight)}
            />
            <Input
              label="Height (cm)"
              placeholder="Height"
              value={height}
              min={0}
              required={true}
              onChange={(value) => setNumericState(String(value), setHeight)}
            />
          </div>
        </div>
        <div className="card w-fit">
          <h3>Official licence registration</h3>
          <Input
            label="Licence number (XXXX-XXXX-XXXX)"
            placeholder="XXXX-XXXX-XXXX"
            value={licence}
            pattern={/\S{4}-\S{4}-\S{4}/}
            required={true}
            error="You must have a valid licence to sign up as a fighter"
            onChange={(value) => setLicence(String(value))}
          />
        </div>
      </div>
      <div className="card w-fit">
        <Checkbox
          name="experience"
          label="I have fighting experience"
          value=""
          onChange={setHasExperience}
        />
        {hasExperience && (
          <div className="card px-0">
            <h3>Fight Records</h3>
            <div className="cardElement justify-start">
              <Input
                label="Victories"
                placeholder="0"
                value={victories}
                onChange={(value) => setNumericState(String(value), setVictories)}
              />
              <Input
                label="Defeats"
                placeholder="0"
                value={defeats}
                className="w-fit"
                onChange={(value) => setNumericState(String(value), setDefeats)}
              />
              <Input
                label="Draws"
                placeholder="0"
                value={draws}
                onChange={(value) => setNumericState(String(value), setDraws)}
              />
              <Input
                label="Last fight date"
                placeholder="YYYY-MM-DD"
                value={lastFightDate}
                type="date"
                onChange={(value) => setLastFightDate(String(value))}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
        {errorMessage && <span className="text-error">{errorMessage}</span>}
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={registerFighter}>
          Sign up!
        </Button>
      </div>
    </div>
  );
}
