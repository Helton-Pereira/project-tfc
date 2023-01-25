import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const getAllMatches = async (req: Request, res: Response) => {
  const { status, matches } = await MatchesService.getAllMatches();
  return res.status(status).json(matches);
};

export default { getAllMatches };
