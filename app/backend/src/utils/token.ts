import * as Jwt from 'jsonwebtoken';
import IUser from '../interfaces/userInterface';

const secret = 'jwt_secret';

function generateToken(data: IUser) {
  const token = Jwt.sign(data, secret, { algorithm: 'HS256', expiresIn: '12h' });
  return token;
}

function verifyToken(token: string) {
  const tokenDecoded = Jwt.verify(token, secret);
  return tokenDecoded;
}

export default { generateToken, verifyToken };
