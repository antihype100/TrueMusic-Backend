import { Sequelize } from 'sequelize-typescript';
import {
  Album,
  Track,
  User,
  UserAlbums,
  UserAuditionTrack,
  UserBackground,
  UserLikedAlbum,
  UserLikedTrack,
  UserPlaylist,
  UserSubscriptions,
} from '../models/models.js';

// @ts-ignore
export const trueMusicDb = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
    UserLikedAlbum,
  ],
});
