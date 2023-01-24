import express from 'express';
import { TrackController } from '../controllers/trackController.js';

const trackController = new TrackController();
const router = express.Router();

router.get('/:authorName/:albumName/:trackName', trackController.listenTrack);
router.get('/all', trackController.getTracks);


export default router;
