import { NextFunction, Request, Response } from 'express';
import { releaseService } from '../service/releaseService.js';


export class ReleaseController {

    async uploadRelease(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                authorName,
                trackName,
                trackProduction,
                trackText,
                trackDescription,
                trackDuration,
                albumName,
                albumDescription,
                albumGenre,
                albumFormatRelease,
            } = req.body
            const tracks = []
            console.log(req.body)
            const album = await releaseService.createAlbum(albumName, authorName, albumDescription, albumGenre, albumFormatRelease)
            if (Array.isArray(trackName)) {
                for (const track of trackName) {
                    const idx = trackName.indexOf(track)
                    let trackInfo = await releaseService.addTrackToAlbum(
                        album,
                        albumName,
                        trackName[idx],
                        trackDescription[idx],
                        trackText[idx],
                        trackProduction[idx],
                        trackDuration[idx],
                        authorName
                    )
                    tracks.push(trackInfo.toJSON())
                }
            } else {
                let trackInfo = await releaseService.addTrackToAlbum(album, albumName, trackName, trackDescription, trackText, trackProduction, trackDuration, authorName)
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
}
