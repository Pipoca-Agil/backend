/* eslint-disable max-len */
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUserFields from '../../application/middlewares/userMiddleware';
import validateSigninFields from '../../application/middlewares/signinMiddleware';
import validateTicket from '../../application/middlewares/validateTicketMiddleware';

const userRoute = Router();

const userController = new UserController();

userRoute.post('/user', validateUserFields, (req, res) => userController.create(req, res));
userRoute.post('/signin', validateSigninFields, validateTicket, (req, res) => userController.signin(req, res));
// userRoute.get('/userLogin', )
export default userRoute;