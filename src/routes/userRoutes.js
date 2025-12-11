// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/users', authenticate, (req, res) => {
  res.json(req.user);
});

export default router;
