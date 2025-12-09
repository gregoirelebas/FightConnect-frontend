'use client';

import { useState } from 'react';
import Button, { ButtonVariant } from '../...components/Button';
import Input from '../...components/Input';
import TextArea from '../...components/TextArea';
import Dropdown, { DropdownOptionProps } from '../...components/Dropdown';
import RadioButton from '../...components/RadioButton';
import Checkbox from '../...components/Checkbox';

export default function Toolkit() {
  const [inputValue, setInputValue] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [radioValue, setRadioValue] = useState<string>('');
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);

  const handleValidate = () => {
    console.log('Enter!');
  };

  const handleRadioChange = (value: string) => {
    console.log('Selected => ' + radioValue);

    setRadioValue(value);
  };

  const handleCheckboxChange = (isChecked: boolean, value: string) => {
    if (isChecked) {
      setCheckboxValues([...checkboxValues, value]);
      const newValues = [...checkboxValues, value];
      console.log(newValues);
    } else {
      setCheckboxValues(checkboxValues.filter((v) => v !== value));
      const newValues = checkboxValues.filter((v) => v !== value);
      console.log(newValues);
    }
  };

  const dropdownOptions: DropdownOptionProps[] = [
    {
      value: 'value 1',
      label: 'Label 1',
    },
    {
      value: 'value 2',
      label: 'Label 2',
    },
    {
      value: 'value 3',
      label: 'Label 3',
    },
    {
      value: 'value 4',
      label: 'Label 4',
    },
  ];

  return (
    <div className="flex-col mt-10 gap-y-2">
      <div className="flex m-5 gap-1">
        <Button variant={ButtonVariant.Primary}>Primary</Button>
        <Button variant={ButtonVariant.Secondary}>Secondary</Button>
        <Button variant={ButtonVariant.Ternary}>Ternary</Button>
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
      <div className="flex-col w-lg text-center mt-5">
        <h1>This is a *H1* text</h1>
        <h2>This is a *H2* text</h2>
        <h3>This is a *H3* text</h3>
        <p>This is a *P* text</p>
        <span>This is a *SPAN* text</span>
      </div>
      <div className="mt-5">
        <Dropdown className="w-lg" options={dropdownOptions} />
      </div>
      <div className="flex mt-5 gap-5">
        <RadioButton
          name="radio"
          value="option1"
          label="Option 1"
          isChecked={true}
          description="Description"
          onChange={handleRadioChange}
        />
        <RadioButton name="radio" value="option2" label="Option 2" onChange={handleRadioChange} />
        <RadioButton name="radio" value="option3" label="Option 3" onChange={handleRadioChange} />
      </div>
      <fieldset className="flex mt-5 gap-5">
        <Checkbox
          name="checkbox"
          value="option1"
          label="Option 1"
          description="Description"
          isChecked={true}
          onChange={handleCheckboxChange}
        />
        <Checkbox
          name="checkbox"
          value="option2"
          label="Option 2"
          onChange={handleCheckboxChange}
        />
        <Checkbox
          name="checkbox"
          value="option3"
          label="Option 3"
          onChange={handleCheckboxChange}
        />
      </fieldset>
    </div>
  );
}
