import express from 'express';
import { ReleaseController } from '../controllers/releaseController.js';
import { uploadTrack } from '../middleware/uploadReleaseMiddleware.js';
import { uploadCover } from '../middleware/uploadCoverMiddleware.js';

const releaseController = new ReleaseController();
const router = express.Router();

router.post('/upload/tracks', uploadTrack.array('trackFiles'), releaseController.uploadRelease);
router.post('/upload/cover', uploadCover.single('coverFile'), releaseController.uploadCover);

export default router;
