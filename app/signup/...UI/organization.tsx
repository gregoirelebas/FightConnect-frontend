'use client';

import Input from '@/app/...components/Input';
import type { Organization } from '@/app/...types/promoter';
import { useState } from 'react';

interface OrganizationProps {
  index: number;
  onChange: (index: number, value: Organization) => void;
  onRemove: (index: number) => void;
}

export default function Organization(props: OrganizationProps) {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <div className="w-full flex items-center gap-5 px-5">
      <div className="w-full flex gap-5">
        <Input
          label={''}
          placeholder={'Organization name'}
          value={name}
          className="w-full"
          onChange={(value) => {
            setName(String(value));
            props.onChange(props.index, { name: String(value), date: date });
          }}
        />
        <Input
          label={''}
          placeholder={''}
          type="date"
          value={date}
          className="w-full"
          onChange={(value) => {
            setDate(String(value));
            props.onChange(props.index, { name: name, date: String(value) });
          }}
        />
      </div>
      <button
        className="min-w-8 min-h-8 flex rounded-full justify-center font-bold items-center cursor-pointer bg-error"
        onClick={() => props.onRemove(props.index)}>
        X
      </button>
    </div>
  );
}
