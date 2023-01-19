import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { trueMusicDb } from './databases/db.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);
app.use('/', router);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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
        await trueMusicDb.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT} and db connected`));
    } catch (e) {
        console.log(e);
    }
};

start();
