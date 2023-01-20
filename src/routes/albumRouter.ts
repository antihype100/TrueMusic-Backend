import express from 'express';
import { AlbumController } from '../controllers/albumController.js';

const albumController = new AlbumController();
const router = express.Router();

router.post('/create', albumController.create);

export default router;
