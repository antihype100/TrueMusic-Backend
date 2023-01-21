import multer from 'multer';
import { UPLOADS_PATH } from '../index.js';
import * as fs from 'fs';
import { join } from 'path';

// @ts-ignore
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body.albumName);
        fs.mkdir(join(UPLOADS_PATH, req.body.albumName), () => console.log('ПАпка создана'))
        cb(null, join(UPLOADS_PATH, req.body.albumName));
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        console.log(file.originalname);
        cb(null, `${file.originalname}`);
    },
});
export const uploadTrack = multer({ storage });