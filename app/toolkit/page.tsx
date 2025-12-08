'use client';

import { useState } from 'react';
import Button, { ButtonVariant } from '../...components/Button';
import Input from '../...components/Input';

export default function Toolkit() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEnter = () => {
    console.log('Enter!');
  };

  return (
    <div className="flex-col mt-10 gap-y-2">
      <div className="flex justify-center gap-20">
        <Button className="w-[400]">Primary</Button>
        <Button variant={ButtonVariant.Secondary}>Secondary</Button>
        <Button variant={ButtonVariant.Accept}>Accept</Button>
        <Button variant={ButtonVariant.Refuse}>Refuse</Button>
      </div>
      <div className="ml-5">
        <Input
          label="Input field"
          placeholder="Placeholder value"
          value={inputValue}
          onChange={handleInputChange}
          onValidate={handleEnter}
        />
      </div>
    </div>
  );
}
