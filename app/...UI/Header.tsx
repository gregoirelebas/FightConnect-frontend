import Link from 'next/link';

import Logo from '../...UI/Logo';

export default function Header() {

  const logout = () => {

  };

  return (
    <div className="header text w-full h-20 pl-20 bg-background border-primary border-l-0 border-r-0 border-t-0 border flex flex-row justify-between items-center">
      <Logo />
      <nav>
        <div className="flex flex-row text-xl w-150 justify-around items-center">
          <h3>
            <Link href={'/events'}>Events</Link>
          </h3>
          <h3>
            <Link href={'/dashboard'}>Dashboard</Link>
          </h3>
          <h3>
            <Link href={'/profile'}>
            <div className='w-13 h-13 rounded-full bg-[url(/defaultProfile.png)] bg-cover border border-white'></div>
            </Link>
          </h3>
          <h3>
            <Link href={'/'}>Logout</Link>
          </h3>
        </div>
      </nav>
    </div>
  );
}
