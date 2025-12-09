import Link from "next/link";
import React from "react";

const header = () => {
  return (
      <div className="header text w-full h-20 pl-20 bg-background border-b-red-900 border-l-0 border-r-0 border-t-0 border flex flex-row justify-between items-center">
        <h1 className="text-4xl">Fight Connect</h1>
        <nav >
          <ul className="flex flex-row text-xl w-150 justify-around">
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default header;