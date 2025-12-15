import { Router } from 'express';
import {
  getCurrentUser,
  getToolsCurrentUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/user', authenticate, getCurrentUser);
router.get('/user/:id/tools', getToolsCurrentUser);
export default router;
