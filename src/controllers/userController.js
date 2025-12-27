import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getCurrentUser = async (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'Not authenticated'));
  }

  res.status(200).json(req.user);
};

export const getToolsCurrentUser = async (req, res, next) => {
  const { id } = req.params;
  const { page = 1, perPage = 8 } = req.query;

  const skip = (page - 1) * perPage;

  const toolQuery = Tool.find({ owner: id });
  const [totalItems, tools] = await Promise.all([
    toolQuery.clone().countDocuments(),
    toolQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    tools,
  });
};

export const updateUserProfile = async (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'Not authenticated'));
  }

  const { name, email, bio } = req.body;

  if (name) req.user.name = name;
  if (email) req.user.email = email;
  if (bio !== undefined) req.user.bio = bio;

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.user.avatar = result.secure_url;
  }

  await req.user.save();

  res.status(200).json(req.user);
};
