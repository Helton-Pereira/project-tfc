import Teams from '../database/models/TeamsModel';

const findAllTeams = async () => {
  const teams = await Teams.findAll();

  return { status: 200, teams };
};

const findOneTeam = async (id: string | number) => {
  const team = await Teams.findByPk(id);

  return { status: 200, team };
};

export default { findAllTeams, findOneTeam };
