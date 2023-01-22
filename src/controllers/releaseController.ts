import { NextFunction, Request, Response } from 'express';

import { releaseService } from '../service/releaseService.js';


export class ReleaseController {

    async uploadRelease(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                authorName,
                trackName,
                trackProduction,
                tackText,
                trackDescription,
                albumName,
                descriptionAlbum,
                genreAlbum,
                formatReleaseAlbum,
            } = req.body
            console.log(authorName);
            const album = await releaseService.createAlbum(albumName, authorName, descriptionAlbum, genreAlbum, formatReleaseAlbum)
            console.log(album);
            return res.json({status: 200});
        } catch (e) {
            next(e);
        }

    }

    async uploadCover(req: Request, res: Response, next: NextFunction) {
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
