import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/user', userController.create);

export default userRoute;