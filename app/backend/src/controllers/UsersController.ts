import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

const findUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { status, message } = await UsersService.findUser(email, password);

  if (status === 200) {
    return res.status(status).json({ token: message });
  }
  return res.status(status).json({ message });
};

const userRole = async (req: Request, res: Response) => {
  const { role } = req.body.user;
  res.status(200).json({ role });
};

export default { findUser, userRole };
