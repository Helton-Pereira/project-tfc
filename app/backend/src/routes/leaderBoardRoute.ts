import * as express from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = express.Router();

router.get('/home', LeaderBoardController.homeLeaderBoard);

export default router;
