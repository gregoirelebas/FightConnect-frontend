import Dropdown, { DropdownOptionProps } from '../...components/Dropdown';
import { Experience } from '../...types/enum';

interface ExperienceDropdownProps {
  className?: string;
  currentValue?: string;
  onChange: (value: string) => void;
}

export default function ExperienceDropdown(props: ExperienceDropdownProps) {
  const experienceOptions: DropdownOptionProps[] = [
    { label: '-', value: Experience.Empty },
    { label: '0', value: Experience.Zero },
    { label: '1-3', value: Experience.OneThree },
    { label: '4-6', value: Experience.FourSix },
    { label: '7-9', value: Experience.SevenNine },
    { label: '10-12', value: Experience.TenTwelve },
    { label: '13-15', value: Experience.ThirteenFifteen },
    { label: '16-18', value: Experience.SixteenEighteen },
    { label: '19-21', value: Experience.NineteenTwentyOne },
    { label: '22-24', value: Experience.TwentyTwoTwentyFour },
    { label: '25+', value: Experience.TwentyFivePlus },
  ];

  return (
    <Dropdown
      options={experienceOptions}
      currentValue={props.currentValue}
      className={props.className}
      onChange={props.onChange}
    />
  );
}
