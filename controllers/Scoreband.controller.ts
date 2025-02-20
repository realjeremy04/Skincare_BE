import { NextFunction, Request, Response } from "express";
import Scoreband from "$models/Scoreband.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Scoreband:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the scoreband (auto-generated by MongoDB)
 *           readOnly: true
 *         roadmapId:
 *           type: string
 *           description: The unique identifier of the roadmap associated with the scoreband
 *         minPoint:
 *           type: number
 *           description: The minimum point value for the scoreband
 *         maxPoint:
 *           type: number
 *           description: The maximum point value for the scoreband
 *         typeOfSkin:
 *           type: string
 *           description: The type of skin related to the scoreband
 *         skinExplanation:
 *           type: string
 *           description: An explanation of the skin type or condition
 *       required:
 *         - roadmapId
 *         - minPoint
 *         - maxPoint
 *         - typeOfSkin
 *         - skinExplanation
 */

// Get all scoreband
/**
 * @swagger
 * /api/scoreband:
 *   get:
 *     summary: Retrieve a list of all scoreband
 *     tags:
 *       - Scoreband
 *     responses:
 *       200:
 *         description: A list of scoreband
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scoreband'
 *       404:
 *         description: No scoreband found
 *       500:
 *         description: Server error
 */
const getAllScoreband = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scorebands = await Scoreband.find();

    if (!scorebands) {
      res.status(404).json({ message: "No scorebands found" });
    }

    res.status(200).json(scorebands);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get one scoreband
/**
 * @swagger
 * /api/scoreband/{id}:
 *   get:
 *     summary: Retrieve a single scoreband by ID
 *     tags:
 *       - Scoreband
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The scoreband ID
 *     responses:
 *       200:
 *         description: A single scoreband
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scoreband'
 *       404:
 *         description: Scoreband not found
 *       500:
 *         description: Server error
 */
const getScoreband = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scoreband = await Scoreband.findById(req.params.id);

    if (!scoreband) {
      res.status(404).json({ message: "Scoreband not found" });
    }

    res.status(200).json(scoreband);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create one scoreband
/**
 * @swagger
 * /api/scoreband:
 *   post:
 *     summary: Create a new scoreband
 *     tags:
 *       - Scoreband
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Scoreband'
 *     responses:
 *       201:
 *         description: The created scoreband
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scoreband'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createScoreband = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.body.roadmapId ||
      !req.body.minPoint ||
      !req.body.maxPoint ||
      !req.body.typeOfSkin ||
      !req.body.skinExplanation
    ) {
      res.status(400).json({ message: "Bad request" });
    }

    const scoreband = new Scoreband({
      roadmapId: req.body.roadmapId,
      minPoint: req.body.minPoint,
      maxPoint: req.body.maxPoint,
      typeOfSkin: req.body.typeOfSkin,
      skinExplanation: req.body.skinExplanation,
    });

    const newScoreband = await scoreband.save();
    res.status(200).json(newScoreband);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete one scoreband
/**
 * @swagger
 * /api/scoreband/{id}:
 *   delete:
 *     summary: Delete an scoreband by ID
 *     description: This endpoint allows the deletion of an scoreband based on its ID. Returns the deleted scoreband if successful.
 *     tags:
 *       - Scoreband
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the scoreband to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scoreband deleted successfully
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
 *         description: Scoreband not found
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
const deleteScoreband = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scoreband = await Scoreband.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete Successfully" });
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

// Update one scoreband
/**
 * @swagger
 * /api/scoreband/{id}:
 *   put:
 *     summary: Update an scoreband by ID
 *     description: This endpoint allows the updating of an scoreband based on its ID. Returns the updated scoreband if successful.
 *     tags:
 *       - Scoreband
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the scoreband to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Scoreband'
 *     responses:
 *       200:
 *         description: Scoreband after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scoreband'
 *       404:
 *         description: Scoreband not found
 *       500:
 *         description: Server error
 */
const updateScoreband = async (req: Request, res: Response) => {
  try {
    const scoreband = await Scoreband.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(scoreband);
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

const ScorebandAPI = {
  getScoreband,
  getAllScoreband,
  createScoreband,
  deleteScoreband,
  updateScoreband,
};
export default ScorebandAPI;
