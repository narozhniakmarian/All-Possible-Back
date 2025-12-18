import { Router } from 'express';
import {
  getCurrentUser,
  getToolsCurrentUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/:id/tools', getToolsCurrentUser);
export default router;
