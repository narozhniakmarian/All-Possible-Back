import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';

export const deleteTool = async (req, res, next) => {
  try {
    const { id: toolId } = req.params;

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
  } catch (error) {
    next(error);
  }
};
