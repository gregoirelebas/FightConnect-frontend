import { Fighter } from '@/app/...types/fighter';
import StatCard from './statCard';

export default function FighterStats({ user }: { user: Fighter }) {
  return (
    <div className="grid gap-5 grid-cols-3">
      <StatCard color="success" label="Victories" count={user.victoryCount} />
      <StatCard color="error" label="Defeats" count={user.defeatCount} />
      <StatCard color="warning" label="Draws" count={user.drawCount} />
    </div>
  );
}
