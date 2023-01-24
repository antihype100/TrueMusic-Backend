import express from 'express';
import authRouter from './authRouter.js';
import releaseRouter from './releaseRouter.js';
import trackRouter from './trackRouter.js';

const router = express.Router();

router.use('/release', releaseRouter);
router.use('/user', authRouter);
router.use('/track', trackRouter)

export default router;
