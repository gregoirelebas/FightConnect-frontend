import Dropdown, { DropdownOptionProps } from '../...components/Dropdown';
import { Sport } from '../...types/enum';

interface SportDropdownProps {
  classname?: string | undefined;
  onChange: (value: string) => void;
}

export default function SportDropdown(props: SportDropdownProps) {
  const sportOptions: DropdownOptionProps[] = [
    { label: 'English boxing', value: Sport.EnglishBoxing },
    { label: 'Brasilian Jiu-jitsu', value: Sport.Jiujitsu },
    { label: 'Kickboxing', value: Sport.KickBoxing },
    { label: 'MMA', value: Sport.MMA },
    { label: 'Muay Thai', value: Sport.MuayThai },
  ];

  return <Dropdown options={sportOptions} className={props.classname} onChange={props.onChange} />;
}
