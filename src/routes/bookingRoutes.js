import express from 'express';
import { celebrate } from 'celebrate';
import { checkAvailability, createBooking, getAllBookings } from '../controllers/bookingController.js';
import { createBookingSchema } from '../validations/bookingValidations.js';
// import { authenticate } from '../middleware/authenticate.js';



const router = express.Router();

router.get('/tools/:toolId/availability', checkAvailability);

router.post('/bookings',
  //authenticate  ,//--тут буде автооризація коли будуть створені юзери

  celebrate(createBookingSchema), createBooking);

router.get('/bookings', getAllBookings); //! тимчасовий ендпоінт
