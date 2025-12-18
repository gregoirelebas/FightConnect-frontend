import { Fighter } from '@/app/...types/fighter';
import StatCard from './statCard';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { faFistRaised, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function FighterStats({ user }: { user: Fighter }) {
  return (
    <div className="grid gap-5 grid-cols-3">
      <StatCard
        icon={faTrophy}
        borderColor="border-success"
        textColor="text-success"
        label="Victories"
        count={user.victoryCount}
      />
      <StatCard
        icon={faHeartBroken}
        borderColor="border-error"
        textColor="text-error"
        label="Defeats"
        count={user.defeatCount}
      />
      <StatCard
        icon={faFistRaised}
        borderColor="border-warning"
        textColor="text-warning"
        label="Draws"
        count={user.drawCount}
      />
    </div>
  );
}
