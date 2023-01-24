import * as express from 'express';
import loginValidation from '../middlewares/loginValidation';
import tokenAuth from '../middlewares/tokenAuth';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.get('/validate', tokenAuth, UsersController.userRole);
router.post('/', loginValidation, UsersController.findUser);

export default router;
