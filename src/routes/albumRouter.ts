import express from 'express';
import { AlbumController } from '../controllers/albumController.js';

const albumController = new AlbumController();
const router = express.Router();

router.get('/:authorName/:albumName', albumController.getAlbum);

export default router;