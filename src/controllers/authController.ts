import { NextFunction, Request, Response } from 'express';
import { authService } from '../service/authService.js';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName, password, email } = req.body;
      const userData = await authService.registration(userName, password, email);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 30, httpOnly: true });
      res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName, password } = req.body;
      const userData = await authService.login(userName, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 30, httpOnly: true });
      res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken');
    } catch (e: any) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 30, httpOnly: true });
      res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
}
