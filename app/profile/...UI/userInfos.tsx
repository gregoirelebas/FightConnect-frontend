import profile from '@/public/defaultProfile.png';

import Image from 'next/image';
import Button, { ButtonVariant } from '@/app/...components/Button';
import { SportToString } from '@/app/...helpers/enum';
import { Role, Sport } from '@/app/...types/enum';
import { Fighter } from '@/app/...types/fighter';
import { Promoter } from '@/app/...types/promoter';

export default function UserInfos({
  user,
  isAdmin,
}: {
  user: Fighter | Promoter;
  isAdmin: boolean;
}) {
  const sportPills = user.sports.map((sport: Sport, index: number) => (
    <span key={index} className="pill">
      {SportToString(sport)}
    </span>
  ));

  return (
    <div className="card flex-row gap-10">
      <div>
        <Image src={profile} alt="Profile Picture" width={150} height={0} />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-7">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="font-bold">{user.name}</h1>
              {isAdmin && (
                <Button variant={ButtonVariant.Ternary} className="text-accent" onClick={() => {}}>
                  Settings
                </Button>
              )}
            </div>
            {user.role === Role.Fighter && (
              <div className="flex gap-3">
                <span className="text-grey">
                  Weight: <span className="text-white">{(user as Fighter).weight}kg</span>
                </span>
                <span className="text-grey">•</span>
                <span className="text-grey">
                  Height: <span className="text-white">{(user as Fighter).height}cm</span>
                </span>
              </div>
            )}
          </div>
          <p className="text-grey">{user.bio}</p>
          <div className="flex flex-col gap-2">
            <span className="text-lg">Martial arts</span>
            <div className="flex gap-3">{sportPills}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
