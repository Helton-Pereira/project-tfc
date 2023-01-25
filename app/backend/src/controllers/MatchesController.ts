import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (typeof inProgress === 'string') {
    const { status, matches } = await MatchesService.getMatchesByStatus(inProgress);
    return res.status(status).json(matches);
  }

  const { status, matches } = await MatchesService.getAllMatches();
  return res.status(status).json(matches);
};

export default { getAllMatches };
