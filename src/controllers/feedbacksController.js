import createHttpError from 'http-errors';
import { Feedback } from '../models/feedback.js';
import { Tool } from '../models/tool.js';
import { User } from '../models/user.js';

export const getAllFeedbacks = async (req, res) => {
  const { toolId, userId, ownerId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 12;
  const skip = (page - 1) * perPage;

  const filter = {};

  // If specific toolId provided - use it (tool details page)
  if (toolId) {
    filter.toolId = toolId;
  }
  // If ownerId provided without toolId - get all tools of owner (profile page)
  else if (ownerId) {
    const ownerTools = await Tool.find({ owner: ownerId }).select('_id');
    const toolIds = ownerTools.map(t => t._id);
    filter.toolId = { $in: toolIds };
  }

  if (userId) {
    filter.userId = userId;
  }

  const feedbacksQuery = Feedback.find(filter).sort({ createdAt: -1 });

  const [totalFeedbacks, feedbacks] = await Promise.all([
    feedbacksQuery.clone().countDocuments(),
    feedbacksQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalFeedbacks / perPage);
  res
    .status(200)
    .json({ page, perPage, totalFeedbacks, totalPages, feedbacks });
};

export const createFeedback = async (req, res, next) => {
  const { toolId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(toolId)) {
    return next(createHttpError(400, 'Invalid toolId'));
  }

  const tool = await Tool.findById(toolId);
  if (!tool) {
    return next(createHttpError(404, 'Tool not found'));
  }

  const feedback = await Feedback.create({
    ...req.body,
    toolId,
    userId: req.user._id,
  });

  tool.feedbacks.push(feedback._id);
  const toolFeedbacks = await Feedback.find({ toolId });
  tool.rating =
    toolFeedbacks.reduce((acc, currValue) => acc + currValue.rate, 0) /
    toolFeedbacks.length;

  await tool.save();

  const owner = await User.findById(tool.owner);
  const ownerTools = await Tool.find({ owner: owner._id });
  console.log(ownerTools);

  const ratings = ownerTools
    .map((tools) => tools.rating)
    .filter((rate) => rate > 0);

  owner.rating =
    ratings.reduce((acc, currRate) => acc + currRate, 0) / ratings.length || 0;
  
 owner.feedbackCount = (owner.feedbackCount || 0) + 1;
  
  await owner.save();

  res.status(201).json({ feedback });
};
