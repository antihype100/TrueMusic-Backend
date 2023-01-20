import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { tokenService } from '../service/tokenService.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.autorization) {
    throw createError(401, 'Необходимо авторизироваться для этого действия');
  }

  const accessToken = req.headers.authorization?.split(' ')[1];
  console.log(accessToken);
};
