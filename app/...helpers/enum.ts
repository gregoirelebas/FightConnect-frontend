import { Sport } from '../...types/enum';

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
      throw console.error('Unknown sport: ' + sport);
  }
}
