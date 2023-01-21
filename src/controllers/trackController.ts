import { NextFunction, Request, Response } from 'express';


export class TrackController {

    async uploadTrack(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            return res.json({status: 200});
        } catch (e) {
            next(e);
        }

    }

    async getAll() {
    }

    async getOne() {
    }
}
