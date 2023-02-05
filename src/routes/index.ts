import express from 'express';
import authRouter from './authRouter.js';
import releaseRouter from './releaseRouter.js';
import trackRouter from './trackRouter.js';
import userRouter from "./userRouter.js";

const router = express.Router();

router.use('/release', releaseRouter);
router.use('/user', authRouter, userRouter);
// router.use('/userSetting', userRouter);
router.use('/track', trackRouter)

export default router;
