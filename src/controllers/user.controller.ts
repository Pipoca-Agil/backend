import { Request, Response } from 'express';
import UserPrismaModel from '../services/user.service';
import CustomError from '../errors/CustomErrors';
import TokenHelper from '../helpers/tokenHelper';

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

    const { email } = newUser;

    const payload = { email };

    const token = this.tokenHelper.createToken(payload);

    return res.status(201).json({ token });
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.userModel.signin({ email, password });
      return res.status(201).json({ token });
    } catch (err: any) {
      return res.status(err.status).json({ message: err.message });
    }
  }
}