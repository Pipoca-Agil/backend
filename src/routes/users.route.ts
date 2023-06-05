import { Router } from 'express';
import UserModel from '../models/users.model';
import UserService from '../services/users.service';
import UserController from '../controllers/users.controller';

const userRouter = Router();

const user = new UserModel();
const userService = new UserService(user);
const userController = new UserController(userService);

const USER_URL = '/users';

userRouter.post(USER_URL, (req, res) => userController.create(req, res));

export default userRouter;