import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { IUser, UserZodSchema } from '../interfaces/UserZodSchema';
import CustomError from '../errors/CustomErrors';

export function validateUser(user: IUser): IUser {
  try {
    return UserZodSchema.parse(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.flatten();
      const firstError = details.fieldErrors[Object.keys(details.fieldErrors)[0]][0];
      throw new CustomError(400, firstError);
    }
    throw error;
  }
}

const validateUserFields = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;
    req.body = validateUser(user);
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, 'Internal Server Error'));
    }
  }
};

export default validateUserFields;