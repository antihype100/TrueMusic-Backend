import { NextFunction, Request, Response } from 'express';
import { userService } from '../service/userService.js';
import {tokenService} from "../service/tokenService.js";


export class UserController {

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({coverUpload: true});
        } catch (e) {
            next(e);
        }

    }
    async switchToAuthor(req: Request, res: Response, next: NextFunction) {
        try {
            const user = tokenService.validateAccessToken(req.body.accessToken)
            await userService.switchToAuthor(user?.userName)
            return res.json({switch: true});
        } catch (e) {
            next(e);
        }

    }
}
