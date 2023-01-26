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

const insertMatch = async (req: Request, res: Response) => {
  const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;

  const result = await MatchesService
    .insertMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

  if (result.status !== 201) {
    return res.status(result.status).json({ message: result.message,
    });
  }

  return res.status(result.status).json(result.message);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status, message } = await MatchesService.finishMatch(id);

  return res.status(status).json({ message });
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const { status, message } = await MatchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

  return res.status(status).json({ message });
};

export default { getAllMatches, insertMatch, finishMatch, updateMatch };
