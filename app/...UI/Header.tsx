import Link from 'next/link';

import Logo from '../...UI/Logo';

export default function Header() {
  return (
    <div className="header text w-full h-20 pl-20 bg-background border-primary border-l-0 border-r-0 border-t-0 border flex flex-row justify-between items-center">
      <Logo />
      <nav>
        <ul className="flex flex-row text-xl w-150 justify-around">
          <li>
            <Link href={'/events'}>Events</Link>
          </li>
          <li>
            <Link href={'/dashboard/promoter'}>Dashboard</Link>
          </li>
          <li>
            <Link href={'/profile'}>Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
