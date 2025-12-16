import Image from 'next/image';
import { Fighter } from '@/app/...types/fighter';

import Button, { ButtonVariant } from '@/app/...components/Button';
import profile from '@/public/defaultProfile.png';
import { useRouter } from 'next/navigation';

export default function FighterApplicant({
  fighter,
  isAdmin,
}: {
  fighter: Fighter;
  isAdmin: boolean;
}) {
  const router = useRouter();

  function viewProfile() {
    router.push('/profile/' + fighter.name);
  }

  return (
    <div className="card items-center">
      <Image src={profile} alt={'Profile picture'} width={150} height={0} />
      <h3>{fighter.name}</h3>
      <div className="card flex-row items-center bg-background text-xl">
        <div className="flex items-center gap-2">
          <span className="text-success">{fighter.victoryCount}</span>•
          <span className="text-error">{fighter.defeatCount}</span>•
          <span className="text-warning">{fighter.drawCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{fighter.weight}kg</span>
          <span>•</span>
          <span>{fighter.height}cm</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Button variant={ButtonVariant.Ternary} onClick={viewProfile}>
          View profile
        </Button>
        {isAdmin && (
          <div className="grid grid-cols-2 gap-5">
            <Button variant={ButtonVariant.Accept}>Accept</Button>
            <Button variant={ButtonVariant.Refuse}>Refuse</Button>
          </div>
        )}
      </div>
    </div>
  );
}
