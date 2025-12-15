import Link from 'next/link';
import Button, { ButtonVariant } from '@/app/...components/Button';
import Logo from '@/app/...UI/Logo';
import { Role } from '@/app/...types/enum';

interface RoleSwitchProps {
  role: Role;
}

export default function RoleSwitch(props: RoleSwitchProps) {
  return (
    <div className="flex justify-center gap-20">
      <Logo className="logo" />
      <Link href={'/signup/fighter'}>
        <Button
          variant={props.role === Role.Fighter ? ButtonVariant.Primary : ButtonVariant.Ternary}
          className="w-3xs">
          Fighter
        </Button>
      </Link>
      <Link href={'/signup/promoter'}>
        <Button
          variant={props.role === Role.Promoter ? ButtonVariant.Primary : ButtonVariant.Ternary}
          className="w-3xs">
          Promoter
        </Button>
      </Link>
    </div>
  );
}
