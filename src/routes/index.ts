import express from 'express';
import trackRouter from './trackRouter.js';
import authRouter from './authRouter.js';
import albumRouter from './albumRouter.js';

const router = express.Router();

router.use('/track', trackRouter);
router.use('/user', authRouter);
router.use('/album', albumRouter);

export default router;
