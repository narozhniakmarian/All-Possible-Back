import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';
import { Feedback } from '../models/feedback.js';

export const getPublicUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  // Get all tools of this user
  const userTools = await Tool.find({ owner: id }).select('_id');
  const toolIds = userTools.map(t => t._id);

  // Count all feedbacks for all user's tools
  const feedbackCount = await Feedback.countDocuments({ toolId: { $in: toolIds } });

  res.status(200).json({
    ...user.toObject(),
    feedbackCount,
  });
};
