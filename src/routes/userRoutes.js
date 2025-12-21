import { Router } from 'express';
import {
  getCurrentUser,
  getToolsCurrentUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/:id/tools', getToolsCurrentUser);
router.patch(
  '/users/me/edit',
  authenticate,
  upload.single('avatar'),
  updateUserProfile,
);
export default router;
