import { Request, Response } from 'express';
import UserPrismaModel from '../services/user.service';
import CustomError from '../errors/CustomErrors';

export default class UserController {
  constructor(
    private userModel = new UserPrismaModel(),
  ) {}

  public async create(req: Request, res: Response) {
    const newUser = await this.userModel.create(req.body);

    if (!newUser) throw new CustomError(400, 'Invalid Format');

    return res.status(201).json(newUser);
  }
}