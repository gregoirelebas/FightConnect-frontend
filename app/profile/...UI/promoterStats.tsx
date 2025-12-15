import { Promoter } from '@/app/...types/promoter';
import StatCard from './statCard';

export default function PromoterStats({ user }: { user: Promoter }) {
  return (
    <div className="grid gap-5 grid-cols-2">
      <StatCard color="primary" label="Total events" count={42} />
      <StatCard color="accent" label="Fighters promoted" count={315} />
    </div>
  );
}
