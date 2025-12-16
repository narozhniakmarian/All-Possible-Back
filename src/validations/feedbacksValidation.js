import { Joi, Segments } from 'celebrate';

export const getAllFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(3).default(3),
  }),
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(15).required(),
    description: Joi.string().max(80),
    rate: Joi.number().min(0.5).max(5).required(),
  }),
};
