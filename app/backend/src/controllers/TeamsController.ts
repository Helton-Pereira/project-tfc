import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const findAllTeams = async (req: Request, res: Response) => {
  const { status, teams } = await TeamsService.findAllTeams();
  return res.status(status).json(teams);
};

const findOneTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status, team } = await TeamsService.findOneTeam(id);

  return res.status(status).json(team);
};

export default { findAllTeams, findOneTeam };
