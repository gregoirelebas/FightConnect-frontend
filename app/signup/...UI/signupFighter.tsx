'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Checkbox from '@/app/...components/Checkbox';
import Input from '@/app/...components/Input';
import RadioButton from '@/app/...components/RadioButton';
import Cookies from '@/app/...types/cookies';
import { setCookieState, setNumericState } from '@/app/...helpers/states';

import { Level, Role, Sport, Step } from '@/app/...types/enum';
import { Fighter } from '@/app/...types/fighter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookies, setCookie } from '@/app/...helpers/cookies';
import RoleSwitch from './roleSwitch';
import HeaderSignupComponent from './HeaderSignup';
import { faFistRaised, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      setErrorMessage('At least one sport is required');
      return;
    }

    if (weight == 0 || height == 0) {
      setErrorMessage('Please fill in your height and weight');
      return;
    }

    if (!licence) {
      setErrorMessage('You need a valid licence number');
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

  return (
    <div className="flex flex-col justify-center mx-150 my-10 gap-5">
      <HeaderSignupComponent step={Step.Step2} />
      <div className="card flex items-center justify-center">
        <RoleSwitch role={Role.Fighter} />
      </div>
      <div className="card gap-10">
        <div className="flex flex-col">
          <h4 className="mb-5">Level</h4>
          <div className="flex gap-10 p-5 border border-accent">
            <RadioButton
              name="level"
              label="Amateur"
              value={Level.Amateur}
              isChecked={true}
              onChange={(value) => setLevel(value as Level)}
            />
            <RadioButton
              name="level"
              label="Professionel"
              value={Level.Pro}
              onChange={(value) => setLevel(value as Level)}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faFistRaised} className="text-accent pt-1" />
            <h4 className="mb-5">Sport(s)</h4>
          </div>
          <div className="flex flex-col gap-5 border p-5 border-accent">
            <div className="flex justify-between">
              <Checkbox
                name="sport"
                label="MMA"
                value={Sport.MMA}
                onChange={onSportChange}></Checkbox>
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
            </div>
            <div className="flex justify-around">
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
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Input
            label="Weight (kg)"
            placeholder=""
            value={weight}
            className="w-full"
            onChange={(value) => {
              setNumericState(value as string, setWeight);
            }}
          />
          <Input
            label="Height (cm)"
            placeholder=""
            value={height}
            className="w-full"
            onChange={(value) => setNumericState(value as string, setHeight)}
          />
        </div>
        <Input
          label="Licence Number"
          placeholder="XXXX-XXXX-XXXX"
          value={licence}
          className="w-full"
          onChange={(value) => setLicence(String(value))}
        />
        <Checkbox
          name="experience"
          label="I have fighting experience"
          value=""
          onChange={setHasExperience}
        />
        {hasExperience && (
          <div className="flex gap-5">
            <div className="bg-accent w-2"></div>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FontAwesomeIcon icon={faTrophy} className="text-accent" />
                <span>Fight Records</span>
              </div>
              <div className="flex gap-10">
                <Input
                  label="Victories"
                  placeholder="0"
                  value={victories}
                  className="w-full "
                  onChange={(value) => setNumericState(String(value), setVictories)}
                />
                <Input
                  label="Defeats"
                  placeholder="0"
                  value={defeats}
                  className="w-full"
                  onChange={(value) => setNumericState(String(value), setDefeats)}
                />
                <Input
                  label="Draws"
                  placeholder="0"
                  value={draws}
                  className="w-full"
                  onChange={(value) => setNumericState(String(value), setDraws)}
                />
              </div>
              <div className="flex mt-5">
                <Input
                  label="Last fight date"
                  placeholder="YYYY-MM-DD"
                  value={lastFightDate}
                  type="date"
                  className="w-full"
                  onChange={(value) => setLastFightDate(String(value))}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          {errorMessage && <span className="text-error">{errorMessage}</span>}
          <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={registerFighter}>
            Complete Signup
          </Button>
        </div>
      </div>
    </div>
  );
}
