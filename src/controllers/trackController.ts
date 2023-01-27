import {NextFunction, Request, Response} from 'express';
import * as fs from 'fs';
import {join} from 'path';
import {UPLOADS_PATH} from '../index.js';
import {trackService} from '../service/trackService.js';
import {tokenService} from "../service/tokenService.js";

export class TrackController {

    async getTracks(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.headers)
            if (req.headers.authorization) {
                const user = tokenService.validateAccessToken(req.headers.authorization)
                console.log(user)
            }
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

    async getCover(req: Request, res: Response, next: NextFunction) {
        try {
            const {authorName, albumName} = req.params
            const dirCover = join(UPLOADS_PATH, authorName, albumName)
            fs.readdir(dirCover, function (err, files) {
                try {
                    const cover = files.filter((file) => file.includes('.'));
                    const stream = fs.createReadStream(join(UPLOADS_PATH, authorName, albumName, cover[0]))
                    stream.pipe(res)
                } catch (e) {
                    console.log(10)
                }
            })
        } catch (e: any) {
            next(e);
        }
    }

    async likeTrack(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId, trackId} = req.body
            console.log(req.body)
            await trackService.likeTrack(trackId, userId)
        } catch (e: any) {
            next(e)
        }

    }

}
