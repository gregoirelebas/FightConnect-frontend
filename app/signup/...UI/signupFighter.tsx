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
import SportDropdown from '@/app/...UI/SportDropdown';
import PageLoader from 'next/dist/client/page-loader';




export default function SignupFighterComponent() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  const [sportList, setSportList] = useState<Sport[]>([]);
  const [role, setRole] = useState<Role>(Role.Promoter);
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
    <div className='flex flex-col items-center w-full gap-10'>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col items-center '>
          <h1>Complete Your Profile</h1>
          <p>Step 2 of 2 - Professional Profile</p>
        </div>
        <div className='flex flex-col justify-center w-[70%]'>
          <div className='flex justify-between'>
            <p>Step 1</p> <p>Step 2</p>
          </div>
          <div className='h-10 w-full bg-linear-to-r from-[#D7263D] to-[#00E0B8] rounded-full '> </div>
        </div>
      </div>
      <div className='blockSignUp'>

        <h4 className=''>I am a:</h4>
        <div className='flex gap-5 justify-center'>

          <div className='flex-1 bg-[#1C1C1C] border-2 border-[#A0A0A0] rounded-lg p-10 transition-all duration-200 peer-checked:border-[#00E0B8] peer-checked:bg-[#00E0B8]/5 hover:border-[#00E0B8]/60'>
            <RadioButton
              name="role"
              label="Fighter"
              value={Role.Fighter}
              onChange={(value) => setRole(value as Role)}
            />
          </div>

          <div className='flex-1 bg-[#1C1C1C] border-2 border-[#A0A0A0] rounded-lg p-10 transition-all duration-200 peer-checked:border-[#00E0B8] peer-checked:bg-[#00E0B8]/5 hover:border-[#00E0B8]/60'>
            <RadioButton
              name="role"
              label="Promoter"
              value={Role.Promoter}
              isChecked={true}
              onChange={(value) => setRole(value as Role)} />
          </div>
        </div>

      </div>

      <div className='blockSignUp'>
        <h4> Level</h4>

        <div className='flex justify-center gap-5'>
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
        <h4>Sport</h4>
        <div>
          <div className='flex justify-center gap-8'>
            <Checkbox name='sport' label='MMA' value={Sport.MMA} onChange={onSportChange}></Checkbox>
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
          </div>

        </div>
        <div className='flex justify-center gap-3'>
          <div className='flex-1'>

            <Input className='w-full' placeholder='70 kg' value={weight} onChange={(value) => setWeight(Number(value))} label='Weight' />
          </div>
          <div className='flex-1'>

            <Input className='w-full' placeholder='170 cm' value={height} onChange={(value) => setHeight(Number(value))} label='Height' />
          </div>

        </div>
        <Input placeholder='Enter your license number' value={licence} onChange={(value) => setLicence(String(value))} label='License Number' />
        <div className="flex gap-5">


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
            Complete Signup
          </Button>


        </div>

      </div>
    </div>
  )

}
