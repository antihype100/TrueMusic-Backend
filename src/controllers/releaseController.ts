import { NextFunction, Request, Response } from 'express';

import { releaseService } from '../service/releaseService.js';
import { afterEach } from 'node:test';


export class ReleaseController {

    async uploadRelease(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                authorName,
                trackName,
                trackProduction,
                trackText,
                trackDescription,
                albumName,
                descriptionAlbum,
                genreAlbum,
                formatReleaseAlbum,
            } = req.body
            const tracks = []
            const album = await releaseService.createAlbum(albumName, authorName, descriptionAlbum, genreAlbum, formatReleaseAlbum)
            if (Array.isArray(trackName)) {
                for (const track of trackName) {
                    const idx = trackName.indexOf(track)
                    let trackInfo = await releaseService.addTrackToAlbum(
                        album,
                        albumName,
                        track,
                        trackDescription[idx],
                        trackText[idx],
                        authorName,
                        trackProduction[idx],
                    )
                    tracks.push(trackInfo.toJSON())
                }
            } else {
                let trackInfo = await releaseService.addTrackToAlbum(album, albumName, trackName, trackDescription, trackText, authorName, trackProduction)
                tracks.push(trackInfo.toJSON())
            }
            return res.json({album: album.toJSON(), tracks: tracks});
        } catch (e) {
            next(e);
        }

    }

    async uploadCover(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({coverUpload: true});
        } catch (e) {
            next(e);
        }

    }

    async getAll() {
    }

    async getOne() {
    }
}
