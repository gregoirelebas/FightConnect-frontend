import Image from 'next/image';
import { Fighter } from '@/app/...types/fighter';

import Button, { ButtonVariant } from '@/app/...components/Button';
import profile from '@/public/defaultProfile.png';
import { useRouter } from 'next/navigation';
import { ApplicationStatus } from '@/app/...types/enum';
import {
  ApplicationStatusToColor,
  ApplicationStatusToString,
  LevelToColor,
  LevelToString,
} from '@/app/...helpers/enum';

interface FighterApplicantProps {
  fighter: Fighter;
  showButtons: boolean;
  status: ApplicationStatus;
  acceptFighter: (fighterToken: string) => void;
  refuseFighter: (fighterToken: string) => void;
}

export default function FighterApplicant(props: FighterApplicantProps) {
  const router = useRouter();

  function viewProfile() {
    router.push('/profile/' + props.fighter.name);
  }

  return (
    <div className="card items-center">
      <Image src={profile} alt={'Profile picture'} width={150} height={0} />
      <div className="flex gap-10">
        <span className={`pill bg-${LevelToColor(props.fighter.level)}`}>
          {LevelToString(props.fighter.level)}
        </span>
        <span className={`pill bg-${ApplicationStatusToColor(props.status)}`}>
          {ApplicationStatusToString(props.status)}
        </span>
      </div>
      <h3>{props.fighter.name}</h3>
      <div className="card flex-row items-center bg-background text-xl">
        <div className="flex items-center gap-2">
          <span className="text-success">{props.fighter.victoryCount}</span>•
          <span className="text-error">{props.fighter.defeatCount}</span>•
          <span className="text-warning">{props.fighter.drawCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{props.fighter.weight}kg</span>
          <span>•</span>
          <span>{props.fighter.height}cm</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Button variant={ButtonVariant.Ternary} onClick={viewProfile}>
          View profile
        </Button>
        {props.showButtons && (
          <div className="grid grid-cols-2 gap-5">
            <Button
              variant={ButtonVariant.Accept}
              onClick={() => props.acceptFighter(props.fighter.token)}>
              Accept
            </Button>
            <Button
              variant={ButtonVariant.Refuse}
              onClick={() => props.refuseFighter(props.fighter.token)}>
              Refuse
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
