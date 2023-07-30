/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { v4 as uuid } from 'uuid';
import TokenHelper from '../src/helpers/tokenHelper';
import UserPrismaModel from '../src/services/user.service';
import CustomError from '../src/errors/CustomErrors';

/* eslint-disable mocha/no-mocha-arrows */
describe('signin related tests', () => {
  it('should throw an wrong password error', async () => {
    const userService = new UserPrismaModel();
    const email = `${uuid()}@email.com`;

    const user = {
      name: 'Teste senha incorreta',
      email,
      password: '12345',
    };

    await userService.create(user);
    await expect(() => userService.signin({ ...user, password: 'umasenhaincorreta' })).rejects.toThrow(new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta'));
  });

  it('should throw an wrong email error', async () => {
    const userService = new UserPrismaModel();
    const email = `${uuid()}@email.com`;

    const user = {
      name: 'Teste email incorreto',
      email,
      password: '12345',
    };

    await userService.create(user);
    await expect(() => userService.signin({ ...user, email: 'umemailerrado@email.com' })).rejects
      .toThrow(new CustomError(401, 'Ocorreu um problema ao fazer login, Verificar seu e-mail ou senha, ou crie uma conta'));
  });

  it('should return an jwt token', async () => {
    const userService = new UserPrismaModel();
    const tokenHelper = new TokenHelper();
    const email = `${uuid()}@email.com`;

    const user = {
      name: 'Teste de sucesso',
      email,
      password: '12345',
    };
    await userService.create(user);

    const token = await userService.signin({ email: user.email, password: user.password });
    const extractedPayload = tokenHelper.verifyToken(token);
    expect(extractedPayload.email).toStrictEqual(user.email);
  });
});