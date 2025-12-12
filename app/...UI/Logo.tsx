import Link from 'next/link';
import Image from 'next/image';

import logo from '../../public/logo.svg';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <Link href={'/'}>
      <Image
        src={logo}
        alt="logo"
        width={props.size ? props.size : 75}
        height={props.size ? props.size : 75}
        className={`${props.className ? props.className : ''} cursor-pointer`}
      />
    </Link>
  );
}
