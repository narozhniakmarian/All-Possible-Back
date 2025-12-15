import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getToolById, deleteTool, } from '../controllers/toolController.js';
import { celebrate } from 'celebrate';
import { createBookingSchema } from '../validations/bookingValidations.js';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/tools/:id', getToolById);

// DELETE /tools/:id — видалення інструменту власником
router.delete('/tools/:id', authenticate, deleteTool);

router.post('/:toolId/bookings', authenticate, celebrate(createBookingSchema), createBooking);

export default router;
