import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import {Sequelize} from "sequelize-typescript";

import {
    Album,
    Track,
    User,
    UserAlbums,
    UserAuditionTrack,
    UserBackground, UserLikedAlbum,
    UserLikedTrack, UserPlaylist,
    UserSubscriptions
} from "./models/models.js";
import {router} from "./routes/index.js";

// @ts-ignore
export const trueMusicDb =  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    models: [
        User,
        Track,
        Album,
        UserBackground,
        UserLikedTrack,
        UserAuditionTrack,
        UserAlbums,
        UserSubscriptions,
        UserPlaylist,
        UserLikedAlbum
    ]
});



const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
}));
app.use('/', router)

const start = async () => {
    try {
        await trueMusicDb.authenticate();
        await trueMusicDb.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT} and db connected`));
    } catch (e) {
        console.log(e);
    }
};

start();
