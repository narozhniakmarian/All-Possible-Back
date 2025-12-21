import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';

export const getCurrentUser = async (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'Not authenticated'));
  }

  res.status(200).json(req.user);
};

export const getToolsCurrentUser = async (req, res, next) => {
  const { id } = req.params;

  const tool = await Tool.find({ owner: id });
  res.status(200).json(tool);
};

export const updateUserProfile = async (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'Not authenticated'));
  }

  const { name, email, bio } = req.body;

  if (name) req.user.name = name;
  if (email) req.user.email = email;
  if (bio) req.user.bio = bio;

  if (req.file) {
    req.user.avatar = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  await req.user.save();

  res.status(200).json(req.user);
};
