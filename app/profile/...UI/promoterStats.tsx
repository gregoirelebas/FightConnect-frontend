import { Promoter } from '@/app/...types/promoter';
import StatCard from './statCard';

export default function PromoterStats({ user }: { user: Promoter }) {
  return (
    <div className="grid gap-5 grid-cols-2">
      <StatCard
        borderColor="border-primary"
        textColor="text-primary"
        label="Total events"
        count={42}
      />
      <StatCard
        borderColor="border-accent"
        textColor="text-accent"
        label="Fighters promoted"
        count={315}
      />
    </div>
  );
}
