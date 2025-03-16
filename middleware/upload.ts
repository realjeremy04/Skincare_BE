import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  fileFilter: (req, file, cb) => {
    /jpeg|jpg|png/.test(path.extname(file.originalname).toLowerCase()) &&
    /jpeg|jpg|png/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only accept image file (jpeg, jpg, png)"));
  },
}).single("image");

export default (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => (err ? next(new Error(err.message)) : next()));
};
