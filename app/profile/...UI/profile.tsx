'use client';

import Header from '@/app/...UI/Header';
import FighterInfos from './fighterInfos';
import { Fighter } from '@/app/...types/fighter';
import { Level, Role, Sport } from '@/app/...types/enum';

export default function ProfileComponent() {
  const mockFighter: Fighter = {
    name: 'John Doe',
    email: 'email@email.com',
    password: 'password',
    phoneNumber: '0312345678',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    profilePicture: '',
    role: Role.Fighter,
    sports: [Sport.MMA, Sport.Jiujitsu],
    level: Level.Amateur,
    weight: 80,
    height: 180,
    licenceNumber: 'string',
    victoryCount: 10,
    defeatCount: 5,
    drawCount: 3,
    lastFightDate: '2025-05-01',
  };

  return (
    <>
      <Header />
      <FighterInfos user={mockFighter} />
      <div></div>
    </>
  );
}
