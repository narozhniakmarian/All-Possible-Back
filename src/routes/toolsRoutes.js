import { Router } from 'express';
import {
  createToolSchema,
  getToolsSchema,
} from '../validations/validateTool.js';
import { createTool, getTools } from '../controllers/toolController.js';
import { authenticate } from '../middleware/authenticate.js';
import { getToolById, deleteTool } from '../controllers/toolController.js';
import { celebrate } from 'celebrate';
import { createBookingSchema } from '../validations/bookingValidations.js';
import { createBooking } from '../controllers/bookingController.js';
import { upload } from "../middleware/multer.js";
import { parseJsonFields } from "../utils/parseJsonFields.js";
const router = Router();

router.post(
  "/tools",
  authenticate,
  upload.single("image"),
  parseJsonFields,
  celebrate(createToolSchema),
  createTool
);


router.get("/tools", celebrate(getToolsSchema), getTools);





router.get('/tools/:id', getToolById);

router.delete('/tools/:id', authenticate, deleteTool);

router.post(
  '/:toolId/bookings',
  authenticate,
  celebrate(createBookingSchema),
  createBooking,
);

export default router;
