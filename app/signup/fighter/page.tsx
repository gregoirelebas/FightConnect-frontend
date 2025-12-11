'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Checkbox from '@/app/...components/Checkbox';
import Input from '@/app/...components/Input';
import Logo from '@/app/...components/Logo';
import RadioButton from '@/app/...components/RadioButton';
import Cookies from '@/app/...types/cookies';
import { setCookieState, setNumericState } from '@/app/...helpers/states';

import { Level, Role, Sport } from '@/app/...types/enum';
import { Fighter } from '@/app/...types/fighter';
import { useEffect, useState } from 'react';

export default function SignupFighterPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bio, setBio] = useState<string>('');

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

  useEffect(() => {
    setCookieState(Cookies.username, setUsername);
    setCookieState(Cookies.email, setEmail);
    setCookieState(Cookies.password, setPassword);
    setCookieState(Cookies.phoneNumber, setPhoneNumber);
    setCookieState(Cookies.bio, setBio);
  }, []);

  const setPromoter = () => {};

  const onSportChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      setSportList([...sportList, value as Sport]);
    } else {
      setSportList(sportList.filter((sport) => sport !== value));
    }
  };

  const onLevelChange = (value: string) => {
    setLevel(value as Level);
  };

  const onExperienceChange = (isChecked: boolean) => {
    setHasExperience(isChecked);
  };

  const registerFighter = async () => {
    const fighter: Fighter = {
      name: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      bio: bio,
      profilePicture: '',
      role: Role.Fighter,
      sports: sportList,
      level: level,
      weight: weight,
      height: height,
      licenceNumber: licence,
      victoryCount: victories,
      defeatCount: defeats,
      drawCount: draws,
      lastFightDate: lastFightDate,
    };

    console.log(fighter);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fighter),
    };

    const result = await fetch(
      process.env.NEXT_PUBLIC_API_URL + 'users/signup/fighter',
      options
    ).then((response) => response.json());

    if (result.result) {
      console.log('Fighter registered successfully');
    } else {
      console.error('Error registering fighter:', result.error);
    }
  };

  return (
    <div className="flex flex-col gap-10 my-10 mx-20">
      <div className="flex justify-center gap-20 mb-10">
        <Logo className="logo" />
        <Button variant={ButtonVariant.Primary} className="w-3xs">
          Fighter
        </Button>
        <Button variant={ButtonVariant.Ternary} className="w-3xs" onClick={setPromoter}>
          Promoter
        </Button>
      </div>
      <div className="flex gap-5">
        <div className="card">
          <h3>Level</h3>
          <fieldset className="cardElement">
            <RadioButton name="level" label="Pro" value={Level.Pro} onChange={onLevelChange} />
            <RadioButton
              name="level"
              label="Amateur"
              value={Level.Amateur}
              isChecked={true}
              onChange={onLevelChange}
            />
          </fieldset>
        </div>
        <div className="card">
          <h3>Practiced sports</h3>
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
        </div>
      </div>
      <div className="card w-fit">
        <h3>Infos</h3>
        <div className="flex gap-20">
          <Input
            label="Weight"
            placeholder="Weight"
            value={weight}
            pattern="/\d+/g"
            required={true}
            onChange={(value) => setNumericState(String(value), setWeight)}
          />
          <Input
            label="Height"
            placeholder="Height"
            value={height}
            pattern="/\d+/g"
            required={true}
            onChange={(value) => setNumericState(String(value), setHeight)}
          />
          <Input
            label="Licence number"
            placeholder="0123-4567-789"
            value={licence}
            required={true}
            onChange={(value) => setLicence(String(value))}
          />
        </div>
      </div>
      <div className=" card w-fit">
        <Checkbox
          name="experience"
          label="I have fighting experience"
          value="hasExperience"
          onChange={onExperienceChange}
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
      <div className="flex justify-center">
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={registerFighter}>
          Validate
        </Button>
      </div>
    </div>
  );
}
