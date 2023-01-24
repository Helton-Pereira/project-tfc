import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

const findUser = async (req: Request, res: Response) => {
  // try {
  const { email, password } = req.body;

  const { status, message } = await UsersService.findUser(email, password);

  if (status === 200) {
    return res.status(status).json({ token: message });
  }
  return res.status(status).json({ message });
  // } catch (err: unknown) {
  //   res.status(500).json({ message: 'Internal error', error: err.message });
  // }
};

export default { findUser };
