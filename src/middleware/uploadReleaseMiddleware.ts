import multer from 'multer';
import { UPLOADS_PATH } from '../index.js';
import * as fs from 'fs';
import { join } from 'path';

const storageTrack = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirAuthor = join(UPLOADS_PATH, req.body.authorName)
        const dirAlbum = join(dirAuthor, req.body.albumName)
        fs.access(dirAuthor, (err) => {
            if (err) {
                fs.mkdirSync(dirAuthor)
            }
            fs.access(dirAlbum, (err) => {
                if (err) {
                    fs.mkdirSync(dirAlbum)
                    fs.mkdirSync(join(dirAlbum, 'tracks'))
                }
                cb(null, join(dirAlbum, 'tracks'));
            })
        })
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, `${file.originalname}`);
    },
});
export const uploadTrack = multer({ storage: storageTrack });