'use client';

import Button, { ButtonVariant } from '@/app/...components/Button';
import Checkbox from '@/app/...components/Checkbox';
import Input from '@/app/...components/Input';
import RadioButton from '@/app/...components/RadioButton';

import { Level, Sport } from '@/app/...types/enum';
import { useState } from 'react';

export default function SignupFighterPage() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [licence, setLicence] = useState<string>('');

  const [hasExperience, setHasExperience] = useState<boolean>(false);

  const [victories, setVictories] = useState<number>(0);
  const [defeats, setDefeats] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const [lastFightDate, setLastFightDate] = useState<string>('');

  const setFighter = () => {};
  const setPromoter = () => {};

  const onSportChange = (isChecked: boolean, value: string) => {};

  const onLevelChange = (value: string) => {};

  const onExperienceChange = (isChecked: boolean) => {
    setHasExperience(isChecked);
  };

  return (
    <div className="flex flex-col h-screen justify-start">
      <div className="flex justify-center gap-20">
        <Button variant={ButtonVariant.Primary} className="w-3xs" onClick={setFighter}>
          Fighter
        </Button>
        <Button variant={ButtonVariant.Ternary} className="w-3xs" onClick={setPromoter}>
          Promoter
        </Button>
      </div>
      <div className="flex gap-5">
        <RadioButton name="level" label="Pro" value={Level.Pro} onChange={onLevelChange} />
        <RadioButton
          name="level"
          label="Amateur"
          value={Level.Amateur}
          isChecked={true}
          onChange={onLevelChange}
        />
      </div>
      <div className="flex gap-5">
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
        <Checkbox name="sport" label="Muay Thai" value={Sport.MuayThai} onChange={onSportChange} />
      </div>
      <div className="flex gap-5">
        <Input
          label="Weight"
          placeholder="Weight"
          value={weight}
          type="number"
          onChange={(value) => setWeight(Number(value))}
        />
        <Input
          label="Height"
          placeholder="Height"
          value={height}
          type="number"
          onChange={(value) => setHeight(Number(value))}
        />
      </div>
      <div>
        <Input
          label="Licence number"
          placeholder="0123-4567-789"
          value={licence}
          onChange={(value) => setLicence(String(value))}
        />
      </div>
      <div>
        <Checkbox
          name="experience"
          label="I have fighting experience"
          value="hasExperience"
          onChange={onExperienceChange}
        />
      </div>
      {hasExperience && (
        <div>
          <div className="flex gap-5">
            <Input
              label="Victories"
              placeholder="0"
              value={victories}
              onChange={(value) => setVictories(Number(value))}
            />
            <Input
              label="Defeats"
              placeholder="0"
              value={defeats}
              onChange={(value) => setDefeats(Number(value))}
            />
            <Input
              label="Draws"
              placeholder="0"
              value={draws}
              onChange={(value) => setDraws(Number(value))}
            />
          </div>
          <div>
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
      <div>
        <Button variant={ButtonVariant.Primary}>Validate</Button>
      </div>
    </div>
  );
}
