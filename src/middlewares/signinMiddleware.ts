import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ISignInInput, signinInput } from '../interfaces/SigninInputZodSchema';
import CustomError from '../errors/CustomErrors';

export function validateSignIn(user: ISignInInput): ISignInInput {
  try {
    return signinInput.parse(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.flatten();
      const firstError = details.fieldErrors[Object.keys(details.fieldErrors)[0]][0];
      throw new CustomError(400, firstError);
    }
    throw error;
  }
}

const validateSigninFields = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: ISignInInput = req.body;
    req.body = validateSignIn(user);
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      next(new CustomError(500, 'Internal Server Error'));
    }
  }
};

export default validateSigninFields;