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
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, matches };
  }
  const matches = await Matches.findAll({
    where: { inProgress: 'false' },
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return { status: 200, matches };
};

const insertMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const homeTeam = await Matches.findByPk(homeTeamId);
  const awayTeam = await Matches.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return { status: 404, message: 'There is no team with such id!' };
  }

  const createdMatch = await Matches.create({
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress: true });
  return { status: 201, message: createdMatch };
};

const finishMatch = async (id: number | string) => {
  await Matches.update({ inProgress: false }, { where: { id } });

  return { status: 200, message: 'Finished' };
};

const updateMatch = async (
  id: number | string,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return { status: 200, message: 'Updated' };
};

export default { getAllMatches, getMatchesByStatus, insertMatch, finishMatch, updateMatch };
