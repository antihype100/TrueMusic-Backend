import {NextFunction, Request, Response} from 'express';
import * as fs from 'fs';
import {join} from 'path';
import {UPLOADS_PATH} from '../index.js';
import {trackService} from '../service/trackService.js';
import {tokenService} from "../service/tokenService.js";

export class TrackController {

    async getTracks(req: Request, res: Response, next: NextFunction) {
        try {
            let trackDto: any
            const accessToken = req.headers.authorization?.split(' ')[1]
            const user = tokenService.validateAccessToken(accessToken)
            if (user) {
                console.log('user', user)
                trackDto = await trackService.getTracks(user.id)
            } else {
                trackDto = await trackService.getTracks()
            }
            res.json(trackDto)
        } catch (e: any) {
            next(e)
        }
    }

    async getTrack(req: Request, res: Response, next: NextFunction) {
        try {
            const {trackId} = req.params
            let trackDto: any
            const accessToken = req.headers.authorization?.split(' ')[1]
            const user = tokenService.validateAccessToken(accessToken)
            if (user) {
                trackDto = await trackService.getTrack(Number(trackId), user.id)
            } else {
                trackDto = await trackService.getTrack(Number(trackId))
            }
            res.json(trackDto)

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
            console.log(10)
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
            const {trackId} = req.body
            const accessToken = req.headers.authorization?.split(' ')[1]
            const user = tokenService.validateAccessToken(accessToken)
            if (user) {
                const action = await trackService.likeTrack(trackId, user.id)
                res.json({action})
            }
        } catch (e: any) {
            next(e)
        }

    }

    async addAuditionTrack(req: Request, res: Response, next: NextFunction) {
        try {
            const {trackId} = req.body
            console.log(trackId)
            const accessToken = req.headers.authorization?.split(' ')[1]
            const user = tokenService.validateAccessToken(accessToken)
            if (user) {
                console.log(user)
                const action = await trackService.addAudition(trackId, user.id)
                res.json({action})
            } else {
                res.json({try: false})
            }

        } catch (e: any) {
            next(e)
        }

    }

}
