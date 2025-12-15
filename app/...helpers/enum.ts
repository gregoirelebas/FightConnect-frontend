import { ApplicationStatus, EventStatus, Sport } from '../...types/enum';

export function SportToString(sport: Sport) {
  switch (sport) {
    case Sport.EnglishBoxing:
      return 'English Boxing';

    case Sport.Jiujitsu:
      return 'Brasilian Jiu-Jitsu';

    case Sport.KickBoxing:
      return 'Kick Boxing';

    case Sport.MMA:
      return 'MMA';

    case Sport.MuayThai:
      return 'Muay Thai';

    default:
      throw new Error('Unknown sport: ' + sport);
  }
}

export function EventStatusToString(status: EventStatus) {
  switch (status) {
    case EventStatus.Cancelled:
      return 'Cancelled';

    case EventStatus.Completed:
      return 'Completed';

    case EventStatus.Upcoming:
      return 'Upcoming';

    default:
      throw new Error('Unknown event status:' + status);
  }
}

export function EventStatusToColor(status: EventStatus) {
  switch (status) {
    case EventStatus.Cancelled:
      return 'error';

    case EventStatus.Completed:
      return 'success';

    case EventStatus.Upcoming:
      return 'accent';

    default:
      throw new Error('Unknown event status:' + status);
  }
}

export function ApplicationStatusToString(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.Accepted:
      return 'Accepted';

    case ApplicationStatus.Denied:
      return 'Denied';

    case ApplicationStatus.Pending:
      return 'Pending';

    default:
      throw new Error('Unknown application status: ' + status);
  }
}

export function ApplicationStatusToColor(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.Accepted:
      return 'success';

    case ApplicationStatus.Denied:
      return 'error';

    case ApplicationStatus.Pending:
      return 'warning';

    default:
      throw new Error('Unknown application status: ' + status);
  }
}
