import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const router = express.Router();

router.get('/', TeamsController.findAllTeams);

export default router;
