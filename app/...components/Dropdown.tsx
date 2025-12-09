import React from 'react';

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

/**
 * Renders a dropdown select element with custom styling and options.
 * @param props - The dropdown component props
 * @param props.options - Array of dropdown options with label and value properties
 * @param props.className - Optional CSS class name to apply to the select element
 * @returns A select element containing the mapped dropdown options
 */
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
