import { Request, Response } from 'express';
import { IService } from '../interfaces/iService';
import { IUser } from '../interfaces/iUser';

export default class UserController {
  constructor(private _service: IService<IUser>) { }

  public async create(
    req: Request,
    res: Response<IUser>,
  ) {
    const user = await this._service.create(req.body);
    return res.status(201).json(user);
  }
}