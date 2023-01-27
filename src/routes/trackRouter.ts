import express from 'express';
import { TrackController } from '../controllers/trackController.js';

const trackController = new TrackController();
const router = express.Router();

router.get('/all', trackController.getTracks);
router.get('/:authorName/:albumName/:trackName', trackController.listenTrack);
router.get('/cover/:authorName/:albumName/:trackName', trackController.getCover);

router.post('/like', trackController.likeTrack);


export default router;
