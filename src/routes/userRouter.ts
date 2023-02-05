import express from 'express';
import { UserController } from '../controllers/userController.js';

const userController = new UserController();
const router = express.Router();

router.get('/changePassword', userController.changePassword);
router.put('/switchToAuthor', userController.switchToAuthor);

export default router;