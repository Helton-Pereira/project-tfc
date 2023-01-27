import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

const homeLeaderBoard = async (req: Request, res: Response) => {
  const { status, leaderBoard } = await LeaderBoardService.homeLeaderBoard();

  return res.status(status).json(leaderBoard);
};

export default { homeLeaderBoard };
