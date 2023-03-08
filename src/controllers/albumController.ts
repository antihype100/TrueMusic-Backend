import { NextFunction, Request, Response } from 'express';
import {albumService} from "../service/albumService.js";


export class AlbumController {

    async getAlbum(req: Request, res: Response, next: NextFunction) {
        try {
            const {authorName, albumName} = req.params
            const album = await albumService.getAlbum(authorName, albumName)
            res.json(album)
        } catch (e) {
            next(e);
        }

    }
}
