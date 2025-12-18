import { EventStatus } from '../...types/enum';

export function getEventStatus(today: number, eventDate: string) {
  const date = new Date(eventDate).getTime();
  if (date > today) return EventStatus.Upcoming;
  else return EventStatus.Completed;
}
