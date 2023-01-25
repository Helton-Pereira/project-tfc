import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const router = express.Router();

router.get('/', TeamsController.findAllTeams);
router.get('/:id', TeamsController.findOneTeam);

export default router;
