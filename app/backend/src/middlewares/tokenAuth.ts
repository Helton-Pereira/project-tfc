import { Request, Response, NextFunction } from 'express';
import token from '../utils/token';

const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'token not found' });
  }

  const decoded = token.verifyToken(authorization);

  req.body.user = decoded;

  next();
};

export default tokenAuth;
