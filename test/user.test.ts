/* eslint-disable max-lines-per-function */
import { v4 as uuid } from 'uuid';
import UserPrismaModel from '../src/application/services/auth';
import CustomError from '../src/domain/errors/CustomErrors';
import { validateUser } from '../src/application/middlewares/userMiddleware';
/* eslint-disable mocha/no-mocha-arrows */

describe('user model related tests', () => {
  it('should return an password error', async () => {
    const email = `${uuid()}@email.com`;

    const userData = {
      name: 'Teste',
      surname: 'Teste',
      email,
      password: 'teste',
    };

    expect(() => validateUser(userData)).toThrowError();
  });

  it('should return an email error', async () => {
    const userService = new UserPrismaModel();

    const email = `${uuid()}@email.com`;

    const userData = {
      name: 'Teste',
      surname: 'Teste',
      email,
      password: 'teste',
    };

    await userService.create(userData);

    await expect(() => userService.create(userData)).rejects.toThrow(
      new CustomError(400, 'Email já está em uso. Por favor, escolha outro.'),
    );
  });
});