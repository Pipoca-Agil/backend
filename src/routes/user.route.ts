import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUserFields from '../middlewares/userMiddleware';
import validateSigninFields from '../middlewares/signinMiddleware';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/user', validateUserFields, (req, res) => userController.create(req, res));
userRoute.post('/signin', validateSigninFields, (req, res) => userController.signin(req, res));

export default userRoute;