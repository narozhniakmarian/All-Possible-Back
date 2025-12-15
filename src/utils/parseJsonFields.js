import createHttpError from "http-errors";

export const parseJsonFields = (req, res, next) => {
  if (req.body.specifications) {
    try {
      req.body.specifications = JSON.parse(req.body.specifications);
    } catch {
      return next(createHttpError(400, "Invalid JSON in specifications"));
    }
  }
  next();
};
