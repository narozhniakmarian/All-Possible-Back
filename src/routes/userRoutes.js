// src/routes/userRoutes.js

import { Router } from 'express';
import { getCurrentUsers } from '../controllers/userController.js';

const router = Router();

router.get('/users', getCurrentUsers);

export default router;
