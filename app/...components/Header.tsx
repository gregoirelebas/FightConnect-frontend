import Link from 'next/link';
import Image from 'next/image';

import logo from '../../public/logo.svg';

export default function Header() {
  return (
    <div className="header text w-full h-20 pl-20 bg-background border-primary border-l-0 border-r-0 border-t-0 border flex flex-row justify-between items-center">
      <Link href={'/'}>
        <Image src={logo} alt="logo" width={75} height={75} className="cursor-pointer" />
      </Link>
      <nav>
        <ul className="flex flex-row text-xl w-150 justify-around">
          <li>
            <Link href={'/events'}>Events</Link>
          </li>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <Link href={'/profile'}>Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
