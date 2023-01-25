import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const findAllTeams = async (req: Request, res: Response) => {
  const { status, teams } = await TeamsService.findAllTeams();
  return res.status(status).json(teams);
};

export default { findAllTeams };
