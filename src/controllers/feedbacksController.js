import createHttpError from 'http-errors';
import { Feedback } from '../models/feedback.js';
import { Tool } from '../models/tool.js';
import { User } from '../models/user.js';

export const getAllFeedbacks = async (req, res) => {
  const { page = 1, perPage = 3 } = req.query;
  const skip = (page - 1) * perPage;

  const feedbacksQuery = Feedback.find();

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

  await owner.save();

  res.status(201).json({ feedback });
};
