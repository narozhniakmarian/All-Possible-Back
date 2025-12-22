import { HttpError } from "http-errors";
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  console.error("Error Middleware:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Файл занадто великий. Максимальний розмір: 5MB",
      });
    }
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
