import { Router } from 'express';
import {
  createFeedback,
  getAllFeedbacks,
} from '../controllers/feedbacksController.js';
import { celebrate } from 'celebrate';
import {
  createFeedbackSchema,
  getAllFeedbacksSchema,
} from '../validations/feedbacksValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/feedbacks', celebrate(getAllFeedbacksSchema), getAllFeedbacks);

router.post(
  '/tools/:toolId/feedback',
  authenticate,
  celebrate(createFeedbackSchema),
  createFeedback,
);

export default router;
