import { Router } from 'express';
import {
  createToolSchema,
  getToolsSchema,
  updateToolSchema,
} from '../validations/validateTool.js';

import {
  createTool,
  getTools,
  getToolById,
  deleteTool,
  updateTool,
} from '../controllers/toolController.js';

import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';

import { createBookingSchema } from '../validations/bookingValidations.js';
import { createBooking } from '../controllers/bookingController.js';

import { upload } from '../middleware/multer.js';
import { parseJsonFields } from '../utils/parseJsonFields.js';

const router = Router();

/**
 * Create tool
 */
router.post(
  '/tools',
  authenticate,
  upload.single('image'),
  parseJsonFields,
  celebrate(createToolSchema),
  createTool
);

/**
 * Get tools list
 */
router.get('/tools', celebrate(getToolsSchema), getTools);

/**
 * Get tool by id
 */
router.get('/tools/:id', getToolById);

/**
 * Delete tool
 */
router.delete('/tools/:id', authenticate, deleteTool);

/**
 * Create booking
 */
router.post(
  '/:toolId/bookings',
  authenticate,
  celebrate(createBookingSchema),
  createBooking
);

/**
 * Update tool
 */
router.patch(
  '/tools/:id',
  authenticate,
  upload.single('image'),
  parseJsonFields,
  celebrate(updateToolSchema),
  updateTool
);

export default router;

