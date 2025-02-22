import { NextFunction, Request, Response } from "express";
import UserQuiz from "$models/UserQuiz.model";
import AppError from "$root/utils/AppError.util";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserQuiz:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user quiz
 *         accountId:
 *           type: string
 *           description: The ID of the user taking the quiz
 *         scoreBandId:
 *           type: string
 *           description: The ID of the score band associated with the quiz
 *         result:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               answer:
 *                 type: string
 *               point:
 *                 type: number
 *         totalPoint:
 *           type: number
 *           description: The total points scored in the quiz
 *       required:
 *         - accountId
 *         - scoreBandId
 *         - result
 *         - totalPoint
 */

// Get all user quizzes
const getAllUserQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userQuizzes = await UserQuiz.find();
    if (userQuizzes.length === 0) {
      return next(new AppError("No user quizzes found", 404));
    }
    res.status(200).json(userQuizzes);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get a single user quiz
const getUserQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userQuiz = await UserQuiz.findById(req.params.id);
    if (!userQuiz) {
      return next(new AppError("User quiz not found", 404));
    }
    res.status(200).json(userQuiz);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create a new user quiz
const createUserQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { accountId, scoreBandId, result, totalPoint } = req.body;
    if (!accountId || !scoreBandId || !result || totalPoint === undefined) {
      return next(new AppError("All fields are required", 400));
    }
    const newUserQuiz = new UserQuiz({
      accountId,
      scoreBandId,
      result,
      totalPoint,
    });
    await newUserQuiz.save();
    res.status(201).json(newUserQuiz);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update a user quiz
const updateUserQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedUserQuiz = await UserQuiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUserQuiz) {
      return next(new AppError("User quiz not found", 404));
    }
    res.status(200).json(updatedUserQuiz);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete a user quiz
const deleteUserQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedUserQuiz = await UserQuiz.findByIdAndDelete(req.params.id);
    if (!deletedUserQuiz) {
      return next(new AppError("User quiz not found", 404));
    }
    res.status(200).json({ message: "User quiz deleted successfully" });
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const UserQuizAPI = {
  getAllUserQuizzes,
  getUserQuiz,
  createUserQuiz,
  updateUserQuiz,
  deleteUserQuiz,
};

export default UserQuizAPI;
