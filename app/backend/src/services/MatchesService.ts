import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

const getAllMatches = async () => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      { model: Teams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] } },
    ],
  });

  return { status: 200, matches };
};

export default { getAllMatches };
