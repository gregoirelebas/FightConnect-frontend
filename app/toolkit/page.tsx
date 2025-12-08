'use client';

import { useState } from 'react';
import Button, { ButtonVariant } from '../...components/Button';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';

export default function Toolkit() {
  const [inputValue, setInputValue] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const handleValidate = () => {
    console.log('Enter!');
  };

  return (
    <div className="flex-col mt-10 gap-y-2">
      <div className="flex m-5 gap-1">
        <Button className="w-[400]">Primary</Button>
        <Button variant={ButtonVariant.Secondary}>Secondary</Button>
        <Button variant={ButtonVariant.Accept}>Accept</Button>
        <Button variant={ButtonVariant.Refuse}>Refuse</Button>
      </div>
      <div className="flex m-5 gap-10">
        <Input
          label="Input field"
          placeholder="Placeholder value"
          value={inputValue}
          onChange={setInputValue}
          onValidate={handleValidate}
        />
        <TextArea
          label="Text area"
          placeholder="Placeholder value"
          value={textAreaValue}
          onChange={setTextAreaValue}
        />
      </div>
    </div>
  );
}
