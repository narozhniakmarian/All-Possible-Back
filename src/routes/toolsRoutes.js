import express from 'express';
import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// DELETE /tools/:id — видалення інструменту власником
router.delete('/tools/:id', authenticate, async (req, res, next) => {
  try {
    const toolId = req.params.id;

    const tool = await Tool.findById(toolId);
    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }

    // Перевірка, чи користувач є власником інструменту
    if (tool.owner.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, 'Forbidden: not the owner'));
    }

    await tool.deleteOne();

    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
