import Teams from '../database/models/TeamsModel';

const findAllTeams = async () => {
  const teams = await Teams.findAll();

  return { status: 200, teams };
};

export default { findAllTeams };
