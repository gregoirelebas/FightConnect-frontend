'use client';

import { usePathname, useRouter } from 'next/navigation';
import Button, { ButtonVariant } from '../...components/Button';
import { deleteCookies } from '../...helpers/cookies';
import Cookies from '../...types/cookies';

interface LogoutProps {
  className?: string | undefined;
}

export default function LogoutComponent(props: LogoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    deleteCookies([Cookies.token, Cookies.userRole]);

    if (pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  }

  return (
    <Button variant={ButtonVariant.Primary} className={props.className} onClick={logout}>
      Logout
    </Button>
  );
}
