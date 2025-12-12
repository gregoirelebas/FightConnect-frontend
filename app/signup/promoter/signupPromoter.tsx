'use client';

import { Role } from '@/app/...types/enum';
import RoleSwitch from '../roleSwitch';
import SportDropdown from '@/app/...UI/SportDropdown';

export default function SignupPromoterComponent() {
  return (
    <div className="flex flex-col my-10 mx-20">
      <RoleSwitch role={Role.Promoter} />
      <h3>Sport</h3>
      <SportDropdown onChange={() => {}} />
    </div>
  );
}
