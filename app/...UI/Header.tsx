'use client';

import Link from 'next/link';

import Logo from '../...UI/Logo';
import LogoutComponent from './Logout';

export default function Header() {
  return (
    <div className="header text-white w-full h-20 pl-20 bg-foreground font-bold border-primary border-l-0 border-r-0 border-t-0 border-2 flex flex-row justify-between items-center">
      <Logo />
      <nav>
        <div className="flex flex-row text-xl w-150 justify-around items-center">
          <Link href={'/events'}>
            <h3>Events</h3>
          </Link>
          <Link href={'/dashboard'}>
            <h3>Dashboard</h3>
          </Link>
          <Link href={'/profile'}>
            <h3>
              <div className="w-13 h-13 rounded-full bg-[url(/defaultProfile.png)] bg-cover border border-white"></div>
            </h3>
          </Link>
          <LogoutComponent />
        </div>
      </nav>
    </div>
  );
}
