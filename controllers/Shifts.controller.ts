import { NextFunction, Request, Response } from "express";
import Shifts from "$models/Shifts.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Shifts:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the shift
 *           readOnly: true
 *         slotsId:
 *           type: string
 *           description: The slot ID associated with the shift
 *         appointmentId:
 *           type: string
 *           description: The appointment ID linked to the shift
 *         therapistId:
 *           type: string
 *           description: The therapist ID assigned to the shift
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the shift
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the shift is available
 *       required:
 *         - slotsId
 *         - appointmentId
 *         - therapistId
 *         - date
 */

/**
 * @swagger
 * /shifts:
 *   get:
 *     summary: Get all shifts
 *     responses:
 *       200:
 *         description: A list of shifts
 *       404:
 *         description: No shifts found
 */
const getAllShifts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shifts = await Shifts.find();
        if (!shifts.length) {
            res.status(404).json({ message: "No shifts found" });
            return;
        }
        res.status(200).json(shifts);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /shifts/{shiftId}:
 *   get:
 *     summary: Get a single shift by ID
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shift to retrieve
 *     responses:
 *       200:
 *         description: Shift details
 *       404:
 *         description: Shift not found
 */
const getShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shift = await Shifts.findById(req.params.shiftId);
        if (!shift) {
            res.status(404).json({ message: "Shift not found" });
            return;
        }
        res.status(200).json(shift);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /shifts:
 *   post:
 *     summary: Create a new shift
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shifts'
 *     responses:
 *       201:
 *         description: Shift created successfully
 *       400:
 *         description: Bad request
 */
const createShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { slotsId, appointmentId, therapistId, date, isAvailable } = req.body;
        if (!slotsId || !appointmentId || !therapistId || !date) {
            res.status(400).json({ message: "Bad request: Missing required fields" });
            return;
        }
        const shift = new Shifts({ slotsId, appointmentId, therapistId, date, isAvailable });
        const newShift = await shift.save();
        res.status(201).json({ message: "Shift created successfully", newShift });
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /shifts/{shiftId}:
 *   put:
 *     summary: Update a shift by ID
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shift to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shifts'
 *     responses:
 *       200:
 *         description: Shift updated successfully
 *       404:
 *         description: Shift not found
 */
const updateShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedShift = await Shifts.findByIdAndUpdate(req.params.shiftId, req.body, { new: true });
        if (!updatedShift) {
            res.status(404).json({ message: "Shift not found" });
            return;
        }
        res.status(200).json({ message: "Shift updated successfully", updatedShift });
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /shifts/{shiftId}:
 *   delete:
 *     summary: Delete a shift by ID
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shift to delete
 *     responses:
 *       200:
 *         description: Shift deleted successfully
 *       404:
 *         description: Shift not found
 */
const deleteShift = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedShift = await Shifts.findByIdAndDelete(req.params.shiftId);
        if (!deletedShift) {
            res.status(404).json({ message: "Shift not found" });
            return;
        }
        res.status(200).json({ message: "Shift deleted successfully" });
    } catch (err) {
        next(err);
    }
};

const ShiftsAPI = {
    getAllShifts,
    getShift,
    createShift,
    updateShift,
    deleteShift
};

export default ShiftsAPI;
