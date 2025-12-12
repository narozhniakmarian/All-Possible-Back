// src/controllers/userController.js
import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError(401, 'Not authenticated');
    }

    res.json({
      user: req.user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};
