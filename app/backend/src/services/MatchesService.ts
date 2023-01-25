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

const getMatchesByStatus = async (inProgress: string) => {
  if (inProgress === 'true') {
    const matches = await Matches.findAll({
      where: { inProgress: true },
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
  }
  return { status: 500, message: 'Eita! Deu ruim' };
};

export default { getAllMatches, getMatchesByStatus };
