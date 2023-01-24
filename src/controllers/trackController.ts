import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { UPLOADS_PATH } from '../index.js';
import { trackService } from '../service/trackService.js';

export class TrackController {

    async getTracks(req: Request, res: Response, next: NextFunction) {
        try {
            const tracks = await trackService.getTracks()
            res.json(tracks)
        } catch (e: any) {
            next(e)
        }
    }

    async listenTrack(req: Request, res: Response, next: NextFunction) {
        try {
            const {authorName, albumName, trackName} = req.params
            const stream = fs.createReadStream(join(UPLOADS_PATH, authorName, albumName, 'tracks', trackName))
            res.setHeader('Content-Type', 'audio/mpeg');
            stream.pipe(res)
        } catch (e: any) {
            next(e);
        }
    }

}
