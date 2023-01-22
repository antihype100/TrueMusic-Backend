import multer from 'multer';
import { join } from 'path';
import { UPLOADS_PATH } from '../index.js';

const storageCover = multer.diskStorage({
    destination: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        const albumName = file.originalname.split('.')[0]
        const dirAuthor = join(UPLOADS_PATH, req.body.authorName)
        const dirAlbum = join(dirAuthor, albumName)
        cb(null, dirAlbum);
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null, file.originalname);
    },
});
export const uploadCover = multer({ storage: storageCover });