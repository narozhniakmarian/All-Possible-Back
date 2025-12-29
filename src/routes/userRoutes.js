import { Router } from 'express';
import {
  getCurrentUser,
  getToolsCurrentUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { celebrate } from 'celebrate';
import { getUserToolsSchema } from '../validations/validateTool.js';
import { checkAvailability } from '../controllers/bookingController.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.get(
  '/users/:id/tools',
  celebrate(getUserToolsSchema),
  getToolsCurrentUser,
);
router.patch(
  '/users/me/edit',
  authenticate,
  upload.single('avatar'),
  updateUserProfile,
);


router.get('/user/:userId/availability', authenticate, checkAvailability);

export default router;
