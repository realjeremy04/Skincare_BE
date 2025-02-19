import { NextFunction, Request, Response } from "express";
import Slots from "$models/Slots.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Slots:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the slot
 *           readOnly: true
 *         slotNum:
 *           type: number
 *           description: The slot number
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the slot
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the slot
 *       required:
 *         - slotNum
 *         - startTime
 *         - endTime
 */

/**
 * @swagger
 * /slots:
 *   get:
 *     summary: Get all slots
 *     responses:
 *       200:
 *         description: A list of slots
 *       404:
 *         description: No slots found
 */
const getAllSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const slots = await Slots.find();
        if (!slots.length) {
            res.status(404).json({ message: "No slots found" });
            return;
        }
        res.status(200).json(slots);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /slots/{slotId}:
 *   get:
 *     summary: Get a single slot by ID
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the slot to retrieve
 *     responses:
 *       200:
 *         description: Slot details
 *       404:
 *         description: Slot not found
 */
const getSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const slot = await Slots.findById(req.params.slotId);
        if (!slot) {
            res.status(404).json({ message: "Slot not found" });
            return;
        }
        res.status(200).json(slot);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /slots:
 *   post:
 *     summary: Create a new slot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Slots'
 *     responses:
 *       201:
 *         description: Slot created successfully
 *       400:
 *         description: Bad request
 */
const createSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { slotNum, startTime, endTime } = req.body;
        if (!slotNum || !startTime || !endTime) {
            res.status(400).json({ message: "Bad request: Missing required fields" });
            return;
        }
        const slot = new Slots({ slotNum, startTime, endTime });
        const newSlot = await slot.save();
        res.status(201).json({ message: "Slot created successfully", newSlot });
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /slots/{slotId}:
 *   put:
 *     summary: Update a slot by ID
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the slot to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Slots'
 *     responses:
 *       200:
 *         description: Slot updated successfully
 *       404:
 *         description: Slot not found
 */
const updateSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updatedSlot = await Slots.findByIdAndUpdate(req.params.slotId, req.body, { new: true });
        if (!updatedSlot) {
            res.status(404).json({ message: "Slot not found" });
            return;
        }
        res.status(200).json({ message: "Slot updated successfully", updatedSlot });
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /slots/{slotId}:
 *   delete:
 *     summary: Delete a slot by ID
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the slot to delete
 *     responses:
 *       200:
 *         description: Slot deleted successfully
 *       404:
 *         description: Slot not found
 */
const deleteSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedSlot = await Slots.findByIdAndDelete(req.params.slotId);
        if (!deletedSlot) {
            res.status(404).json({ message: "Slot not found" });
            return;
        }
        res.status(200).json({ message: "Slot deleted successfully" });
    } catch (err) {
        next(err);
    }
};

const SlotsAPI = {
    getAllSlots,
    getSlot,
    createSlot,
    updateSlot,
    deleteSlot
};

export default SlotsAPI;
