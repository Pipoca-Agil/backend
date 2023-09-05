import { Request, Response } from 'express';
import UserPrismaModel from '../../application/services/auth';
import CustomError from '../../domain/errors/CustomErrors';
import TokenHelper from '../utils/jwt';

export default class UserController {
  private userModel: UserPrismaModel;
  private tokenHelper: TokenHelper;

  constructor() {
    this.userModel = new UserPrismaModel();
    this.tokenHelper = new TokenHelper();
  }

  public async create(req: Request, res: Response) {
    const newUser = await this.userModel.create(req.body);

    if (!newUser) throw new CustomError(400, 'Invalid Format');

    return res.status(201).json();
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userModel.signin({ email, password });
    return res.status(200).json({ token });
  }
}