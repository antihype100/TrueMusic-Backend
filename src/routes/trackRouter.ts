import express from 'express';
import { TrackController } from '../controllers/trackController.js';

const trackController = new TrackController();
const router = express.Router();

router.get('/all', trackController.getTracks);
router.get('/:trackId', trackController.getTrack);
router.get('/:authorName/:albumName/:trackName', trackController.listenTrack);
router.get('/cover/:authorName/:albumName/:trackName', trackController.getCover);

router.post('/like', trackController.likeTrack);
router.post('/audition', trackController.addAuditionTrack);



export default router;