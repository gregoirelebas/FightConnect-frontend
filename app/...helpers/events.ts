import { EventStatus } from '../...types/enum';

export function getEventStatus(today: number, eventDate: string) {
  const date = new Date(eventDate).getDate();
  if (date > today) return EventStatus.Upcoming;
  else return EventStatus.Completed;
}
