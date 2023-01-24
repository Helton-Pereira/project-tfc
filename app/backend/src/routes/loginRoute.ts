import * as express from 'express';
import loginValidation from '../middlewares/loginValidation';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.post('/', loginValidation, UsersController.findUser);

export default router;
