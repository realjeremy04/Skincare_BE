import { NextFunction, Request, Response } from "express";
import Account from "$models/Account.model";
import AppError from "$root/utils/AppError.util";

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the account (auto-generated by MongoDB)
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username of the account
 *         password:
 *           type: string
 *           description: The password of the account (hashed in database)
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the account
 *         role:
 *           type: string
 *           description: The role of the user (e.g., admin, user, etc.)
 *         dob:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: The date of birth of the account holder
 *       required:
 *         - username
 *         - password
 *         - email
 *         - role
 */

// Get all accounts
/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Retrieve a list of all accounts
 *     tags:
 *       - Accounts
 *     responses:
 *       200:
 *         description: A list of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       404:
 *         description: No accounts found
 *       500:
 *         description: Server error
 */
const getAllAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await Account.find();
    if (users.length === 0) {
      return next(new AppError("No accounts found", 404));
    }
    res.status(200).json(users);
  } catch (err: AppError | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get one account
/**
 * @swagger
 * /api/account/{id}:
 *   get:
 *     summary: Retrieve a single account by ID
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID
 *     responses:
 *       200:
 *         description: A single account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
const getAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await Account.findById(req.params.id);

    if (!user) {
      return next(new AppError("Account not found", 404));
    }

    res.status(200).json(user);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create one account
/**
 * @swagger
 * /api/account:
 *   post:
 *     summary: Create a new account
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: The created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (
      !req.body.username ||
      !req.body.password ||
      !req.body.email ||
      !req.body.dob
    ) {
      return next(new AppError("Bad request", 400));
    }

    const user = new Account({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      dob: req.body.dob,
      isActive: true,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete one account
/**
 * @swagger
 * /api/account/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     description: This endpoint allows the deletion of an account based on its ID. Returns the deleted account if successful.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the account to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Account not found
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
const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Account.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError("Account not found", 404));
    }

    res.status(200).json(user);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update one account
/**
 * @swagger
 * /api/account/{id}:
 *   put:
 *     summary: Update an account by ID
 *     description: This endpoint allows the updating of an account based on its ID. Returns the updated account if successful.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the account to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Account after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Account.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return next(new AppError("Account not found", 404));
    }

    res.status(200).json(user);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const AccountAPI = {
  getAccount,
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
};
export default AccountAPI;
