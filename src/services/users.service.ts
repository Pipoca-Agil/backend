import { IService } from '../interfaces/iService';
import { IModel } from '../interfaces/iModel';
import { IUser } from '../interfaces/iUser';

export default class UserService implements IService<IUser> {
  private _user:IModel<IUser>;

  constructor(model:IModel<IUser>) {
    this._user = model;
  }

  public async create(obj:unknown): Promise<IUser> {
    const objParsed = obj as IUser; // aqui devo fazer a validação dos campos, usar zod?

    return this._user.create(objParsed);
  }
}