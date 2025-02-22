import { NextFunction, Request, Response } from "express";
import Therapist from "$models/Therapist.model";
import AppError from "$root/utils/AppError.util";

/**
 * @swagger
 * components:
 *   schemas:
 *     Therapist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the therapist (auto-generated by MongoDB)
 *           readOnly: true
 *         accountId:
 *           type: string
 *           description: The associated account ID
 *         specialization:
 *           type: array
 *           items:
 *             type: string
 *           description: List of service specializations
 *         certification:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               issuedBy:
 *                 type: string
 *               issuedDate:
 *                 type: string
 *                 format: date
 *           description: List of therapist certifications
 *         experience:
 *           type: string
 *           description: Experience details of the therapist
 *       required:
 *         - accountId
 *         - specialization
 *         - certification
 *         - experience
 */

// Get all therapists
/**
 * @swagger
 * /api/therapist:
 *   get:
 *     summary: Retrieve a list of all therapists
 *     tags:
 *       - Therapist
 *     responses:
 *       200:
 *         description: A list of therapists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Therapist'
 *       404:
 *         description: No therapist found
 *       500:
 *         description: Server error
 */
const getAllTherapists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const therapists = await Therapist.find().populate(
      "accountId specialization"
    );
    if (!therapists || therapists.length === 0) {
      return next(new AppError("No therapists found", 404));
    }
    res.status(200).json(therapists);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get one therapist by ID
/**
 * @swagger
 * /api/therapist/{id}:
 *   get:
 *     summary: Retrieve a single therapist by ID
 *     tags:
 *       - Therapist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The therapist ID
 *     responses:
 *       200:
 *         description: A single therapist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Therapist'
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Server error
 */
const getTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const therapist = await Therapist.findById(req.params.id).populate(
      "accountId specialization"
    );
    if (!therapist) {
      return next(new AppError("Therapist not found", 404));
    }
    res.status(200).json(therapist);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create a new therapist
/**
 * @swagger
 * /api/therapist:
 *   post:
 *     summary: Create a new therapist
 *     tags:
 *       - Therapist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Therapist'
 *     responses:
 *       201:
 *         description: The created therapist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Therapist'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { accountId, specialization, certification, experience } = req.body;

    if (!accountId || !specialization || !certification || !experience) {
      return next(new AppError("All fields are required", 400));
    }

    const newTherapist = new Therapist({
      accountId,
      specialization,
      certification,
      experience,
    });

    await newTherapist.save();
    res.status(201).json(newTherapist);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update therapist details
/**
 * @swagger
 * /api/therapist/{id}:
 *   put:
 *     summary: Update an therapist by ID
 *     description: This endpoint allows the updating of an therapist based on its ID. Returns the updated therapist if successful.
 *     tags:
 *       - Therapist
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the therapist to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Therapist'
 *     responses:
 *       200:
 *         description: Therapist after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Therapist'
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Server error
 */
const updateTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedTherapist = await Therapist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedTherapist) {
      return next(new AppError("Therapist not found", 404));
    }

    res.status(200).json(updatedTherapist);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete a therapist
/**
 * @swagger
 * /api/therapist/{id}:
 *   delete:
 *     summary: Delete an therapist by ID
 *     description: This endpoint allows the deletion of an therapist based on its ID. Returns the deleted therapist if successful.
 *     tags:
 *       - Therapist
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the therapist to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Therapist deleted successfully
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
 *         description: Therapist not found
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
const deleteTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedTherapist = await Therapist.findByIdAndDelete(req.params.id);
    if (!deletedTherapist) {
      return next(new AppError("Therapist not found", 404));
    }
    res.status(200).json({ message: "Therapist deleted successfully" });
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const TherapistAPI = {
  getAllTherapists,
  getTherapist,
  createTherapist,
  updateTherapist,
  deleteTherapist,
};

export default TherapistAPI;
