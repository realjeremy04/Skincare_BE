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
/**
 * @swagger
 * /api/userQuiz:
 *   get:
 *     summary: Retrieve a list of all user quizzes
 *     tags:
 *       - UserQuiz
 *     responses:
 *       200:
 *         description: A list of user quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserQuiz'
 *       404:
 *         description: No user quizzes found
 *       500:
 *         description: Server error
 */
const getAllUserQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userQuizzes = await UserQuiz.find();
    if (!userQuizzes || userQuizzes.length === 0) {
      return next(new AppError("No user quizzes found", 404));
    }
    res.status(200).json(userQuizzes);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get a single user quiz
/**
 * @swagger
 * /api/userQuiz/{id}:
 *   get:
 *     summary: Retrieve a single user quiz by ID
 *     tags:
 *       - UserQuiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user quiz ID
 *     responses:
 *       200:
 *         description: A single user quiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserQuiz'
 *       404:
 *         description: User Quiz not found
 *       500:
 *         description: Server error
 */
const getUserQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
/**
 * @swagger
 * /api/userQuiz:
 *   post:
 *     summary: Create a new user quiz
 *     tags:
 *       - UserQuiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserQuiz'
 *     responses:
 *       201:
 *         description: The created user quiz
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserQuiz'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createUserQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
/**
 * @swagger
 * /api/userQuiz/{id}:
 *   put:
 *     summary: Update an user quiz by ID
 *     description: This endpoint allows the updating of an user quiz based on its ID. Returns the updated user quiz if successful.
 *     tags:
 *       - UserQuiz
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user quiz to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserQuiz'
 *     responses:
 *       200:
 *         description: User quiz after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserQuiz'
 *       404:
 *         description: User quiz not found
 *       500:
 *         description: Server error
 */
const updateUserQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedUserQuiz = await UserQuiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedUserQuiz) {
      return next(new AppError("User quiz not found", 404));
    }
    res.status(200).json(updatedUserQuiz);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete a user quiz
/**
 * @swagger
 * /api/userQuiz/{id}:
 *   delete:
 *     summary: Delete an user quiz by ID
 *     description: This endpoint allows the deletion of an user quiz based on its ID. Returns the deleted user quiz if successful.
 *     tags:
 *       - UserQuiz
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user quiz to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User quiz deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
const deleteUserQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
