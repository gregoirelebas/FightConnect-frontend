import Dropdown, { DropdownOptionProps } from "../...components/Dropdown";
import { Weight } from "../...types/enum";

interface WeightDropdownProps {
  className?: string;
  onChange: (value: string) => void;
}

export default function WeightDropdown(props: WeightDropdownProps) {
  const weightOptions: DropdownOptionProps[] = [
    { label: '-', value: Weight.Empty },
    { label: '52-57', value: Weight.FiftyTwoFiftySeven },
    { label: '57-61', value: Weight.FiftySevenSixtyOne },
    { label: '61-66', value: Weight.SixtyOneSixtySix },
    { label: '66-70', value: Weight.SixtySixSeventy },
    { label: '70-77', value: Weight.SeventySeventySeven },
    { label: '77-84', value: Weight.SeventySevenEightyFour },
    { label: '84-93', value: Weight.EightyFourNinetyThree },
    { label: '93-120', value: Weight.NinetyThreeOneHundredTwenty },
  ];

  return <Dropdown options={weightOptions} className={props.className} onChange={props.onChange} />;
}

