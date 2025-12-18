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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised, faHeartBroken, faTrophy } from '@fortawesome/free-solid-svg-icons';

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
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-success">
            <FontAwesomeIcon icon={faTrophy} className="pb-0.5" />
            <span>{props.fighter.victoryCount}</span>
          </div>
          <div className="flex items-center text-error">
            <FontAwesomeIcon icon={faHeartBroken} className="pb-0.5" />
            <span>{props.fighter.defeatCount}</span>
          </div>
          <div className="flex items-center text-warning">
            <FontAwesomeIcon icon={faFistRaised} className="pb-0.5" />
            <span>{props.fighter.drawCount}</span>
          </div>
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
