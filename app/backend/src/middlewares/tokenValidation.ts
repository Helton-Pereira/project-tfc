import { Request, Response, NextFunction } from 'express';
import token from '../utils/token';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const userToken = req.header('Authorization');

  if (!userToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decodedToken = token.verifyToken(userToken);

    req.body.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
