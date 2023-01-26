import * as express from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controllers/MatchesController';
import teamsValidation from '../middlewares/teamsValidation';

const router = express.Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', tokenValidation, teamsValidation, MatchesController.insertMatch);
router.patch('/:id/finish', MatchesController.finishMatch);
router.patch('/:id', MatchesController.updateMatch);

export default router;
