import express from 'express';
import authRouter from './authRouter.js';
import releaseRouter from './releaseRouter.js';

const router = express.Router();

router.use('/release', releaseRouter);
router.use('/user', authRouter);

export default router;
