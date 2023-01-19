import express from 'express';
import trackRouter from './trackRouter.js';
import authRouter from './authRouter.js';

const router = express.Router();

router.use('/track', trackRouter);
router.use('/user', authRouter)

export default router;
