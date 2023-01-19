import express from 'express';
import { TrackController } from '../controllers/trackController.js';
const trackController = new TrackController();

const router = express.Router();

router.post('/create', trackController.create);
router.get('/tracks', trackController.getAll)
router.get('/tracks/:id', trackController.getOne)

export default router
