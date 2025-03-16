import { NextFunction, Request, Response } from "express";
import Transaction from "$models/Transaction.model";
import AppError from "$root/utils/AppError.util";
import { validationResult } from "express-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the transaction
 *           readOnly: true
 *         customerId:
 *           type: string
 *           description: The ID of the customer making the transaction
 *         appointmentId:
 *           type: string
 *           description: The ID of the appointment related to the transaction
 *         paymentMethod:
 *           type: string
 *           description: The method of payment
 *         status:
 *           type: string
 *           description: The status of the transaction
 *       required:
 *         - customerId
 *         - appointmentId
 *         - paymentMethod
 *         - status
 */

// Get all transactions
/**
 * @swagger
 * /api/transaction:
 *   get:
 *     summary: Retrieve a list of all transactions
 *     tags:
 *       - Transaction
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Server error
 */
const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    if (!transactions || transactions.length === 0) {
      return next(new AppError("No transactions found", 404));
    }
    res.status(200).json(transactions);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get a single transaction
/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Retrieve a single transaction by ID
 *     tags:
 *       - Transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: A single transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return next(new AppError("Transaction not found", 404));
    }
    res.status(200).json(transaction);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create a new transaction
/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
export const createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  try {
    const { status } = req.body;
    const validStatuses = ["pending", "completed", "failed"];

    // Kiểm tra giá trị status
    if (!validStatuses.includes(status)) {
      return next(new AppError(`Invalid status. Allowed values: ${validStatuses.join(", ")}`, 400));
    }

    const transaction = new Transaction(req.body);
    const newTransaction = await transaction.save();

    res.status(201).json({
      status: "success",
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    next(new AppError("Failed to create transaction", 500));
  }
};


// Update an existing transaction
/**
 * @swagger
 * /api/transaction/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
export const updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      req.body,
      { new: true }
    );

    if (!updatedTransaction) {
      return next(new AppError("Transaction not found", 404));
    }

    res.status(200).json({ message: "Transaction updated successfully", updatedTransaction });
  } catch (error) {
    next(new AppError("Failed to update transaction", 500));
  }
};


// Delete an existing transaction
/**
 * @swagger
 * /api/transaction/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.transactionId);

    if (!deletedTransaction) {
      return next(new AppError("Transaction not found", 404));
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(new AppError("Failed to delete transaction", 500));
  }
};

const TransactionAPI = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

export default TransactionAPI;