import express from 'express';
import { TrackController } from '../controllers/trackController.js';
import { uploadTrack } from '../middleware/uploadTrackMiddleware.js';

const trackController = new TrackController();
const router = express.Router();

router.get('/tracks', trackController.getAll);
router.get('/tracks/:id', trackController.getOne);
router.post('/upload', uploadTrack.array('trackFiles'), trackController.uploadTrack);

export default router;
