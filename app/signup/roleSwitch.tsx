import Link from 'next/link';
import Button, { ButtonVariant } from '../...components/Button';
import Logo from '../...components/Logo';

export default function RoleSwitch() {
  return (
    <div className="flex justify-center gap-20">
      <Logo className="logo" />
      <Link href={'/signup/fighter'}>
        <Button variant={ButtonVariant.Primary} className="w-3xs">
          Fighter
        </Button>
      </Link>
      <Link href={'/signup/promoter'}>
        <Button variant={ButtonVariant.Ternary} className="w-3xs">
          Promoter
        </Button>
      </Link>
    </div>
  );
}
