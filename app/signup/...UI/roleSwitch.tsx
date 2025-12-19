import Link from 'next/link';
import Button, { ButtonVariant } from '@/app/...components/Button';
import Logo from '@/app/...UI/Logo';
import { Role } from '@/app/...types/enum';

interface RoleSwitchProps {
  role: Role;
}

export default function RoleSwitch(props: RoleSwitchProps) {
  return (
    <div className="w-full flex">
      <Logo className="logo" />
      <div className="w-full px-5">
        <Link href={'/signup/fighter'} className="w-full">
          <Button
            variant={props.role === Role.Fighter ? ButtonVariant.Primary : ButtonVariant.Ternary}
            className="w-full">
            Fighter
          </Button>
        </Link>
      </div>
      <div className="w-full px-5">
        <Link href={'/signup/promoter'} className="w-full">
          <Button
            variant={props.role === Role.Promoter ? ButtonVariant.Primary : ButtonVariant.Ternary}
            className="w-full">
            Promoter
          </Button>
        </Link>
      </div>
    </div>
  );
}
