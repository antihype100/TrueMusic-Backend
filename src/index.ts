import 'dotenv/config';
import express, {Request, Response} from 'express';
import {fileURLToPath} from 'url'
import {join, dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import {trueMusicDb} from './databases/db.js';


export const UPLOADS_PATH = join(__dirname, 'uploads')
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }))
app.options('*', cors())
app.use(UPLOADS_PATH, express.static(UPLOADS_PATH));
app.use('/', router);
app.use((error: any, req: Request, res: Response) => {
    res.status(error.status || 500);
    res.json({
        status: error.status,
        message: error.message,
        stack: error.stack,
    });
});

const start = async () => {
    try {
        await trueMusicDb.authenticate();
        await trueMusicDb.sync({alter: true});
        app.listen(PORT, () => console.log(`Server started on port ${PORT} and db connected`));
    } catch (e) {
        console.log(e);
    }
};

start();
