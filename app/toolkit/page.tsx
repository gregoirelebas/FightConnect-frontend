import Button, { ButtonVariant } from '../...components/Button';

export default function Toolkit() {
  return (
    <div className="flex gap-2 w-full h-full mt-5 ml-5">
      <Button className="w-[400]">Primary</Button>
      <Button variant={ButtonVariant.Secondary}>Secondary</Button>
      <Button variant={ButtonVariant.Accept}>Accept</Button>
      <Button variant={ButtonVariant.Refuse}>Refuse</Button>
    </div>
  );
}
