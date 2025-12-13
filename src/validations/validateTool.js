import { Joi, Segments } from "celebrate";


export const createToolSchema = {
  [Segments.BODY]: Joi.object({

    category: Joi.string().required(),
    name: Joi.string().min(1).required(),
    description: Joi.string().allow(""),
    pricePerDay: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string()).default([]),
    specifications: Joi.object().default({}),
    rentalTerms: Joi.string().allow(""),
    bookedDates: Joi.array().items(Joi.date()).default([]),


  })
};



export const getToolsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).default(10),
    category: Joi.string().allow(""),
    search: Joi.string().allow(""),  
  }),
};
