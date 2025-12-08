import React from 'react';

const ChevronDown = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export interface DropdownOptionProps {
  value: string;
  label: string;
}

function DropdownOption(props: DropdownOptionProps) {
  return <option value={props.value}>{props.label}</option>;
}

interface DropdownProps {
  className?: string;
  options: DropdownOptionProps[];
}

export default function Dropdown(props: DropdownProps) {
  const options: React.ReactNode[] = props.options.map((x, i) => {
    return <DropdownOption key={i} label={x.label} value={x.value} />;
  });

  return (
    <select
      className={`${props.className ? props.className : ''} input appearance-none cursor-pointer`}>
      {options}
    </select>
  );
}
