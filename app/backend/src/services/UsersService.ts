import * as bcrypt from 'bcryptjs';
import token from '../utils/token';
import UsersModel from '../database/models/UsersModel';
import IResponse from '../interfaces/responseInterface';

const findUser = async (email: string, password: string): Promise<IResponse> => {
  const user = await UsersModel.findOne({ where: { email } });
  if (!user) {
    return { status: 401, message: 'User not found' };
  }
  const passwordCheck = bcrypt.compare(password, user.dataValues.password);
  if (!passwordCheck) {
    return { status: 401, message: 'Incorrect password' };
  }

  const userToken = token.generateToken(user);
  return { status: 200, message: userToken };
};

export default { findUser };
