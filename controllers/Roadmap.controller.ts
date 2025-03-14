import { NextFunction, Request, Response } from "express";
import Roadmap from "$models/Roadmap.model";
import AppError from "$root/utils/AppError.util";

/**
 * @swagger
 * components:
 *   schemas:
 *     Roadmap:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the roadmap (auto-generated by MongoDB)
 *           readOnly: true
 *         serviceId:
 *           type: array
 *           description: The unique identifiers of the services associated with the roadmap
 *           items:
 *             type: string
 *         estimate:
 *           type: string
 *           description: The estimated value for the roadmap
 *       required:
 *         - serviceId
 *         - estimate
 */

// Get all roadmap
/**
 * @swagger
 * /api/roadmap:
 *   get:
 *     summary: Retrieve a list of all roadmap
 *     tags:
 *       - Roadmap
 *     responses:
 *       200:
 *         description: A list of roadmap
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Roadmap'
 *       404:
 *         description: No roadmap found
 *       500:
 *         description: Server error
 */
const getAllRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roadmaps = await Roadmap.find();

    if (!roadmaps || roadmaps.length === 0) {
      return next(new AppError("No roadmaps found", 404));
    }

    res.status(200).json(roadmaps);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get one roadmap
/**
 * @swagger
 * /api/roadmap/{id}:
 *   get:
 *     summary: Retrieve a single roadmap by ID
 *     tags:
 *       - Roadmap
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The roadmap ID
 *     responses:
 *       200:
 *         description: A single roadmap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roadmap'
 *       404:
 *         description: Roadmap not found
 *       500:
 *         description: Server error
 */
const getRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return next(new AppError("Roadmap not found", 404));
    }

    res.status(200).json(roadmap);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create one roadmap
/**
 * @swagger
 * /api/roadmap:
 *   post:
 *     summary: Create a new roadmap
 *     tags:
 *       - Roadmap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Roadmap'
 *     responses:
 *       201:
 *         description: The created roadmap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roadmap'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId, estimate } = req.body;

    if (!estimate || !Array.isArray(serviceId) || serviceId.length === 0) {
      return next(new AppError("Bad request: Invalid roadmap data", 400));
    }

    const roadmap = new Roadmap({ serviceId, estimate });

    const newRoadmap = await roadmap.save();
    res.status(201).json(newRoadmap);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete one roadmap
/**
 * @swagger
 * /api/roadmap/{id}:
 *   delete:
 *     summary: Delete an roadmap by ID
 *     description: This endpoint allows the deletion of an roadmap based on its ID. Returns the deleted roadmap if successful.
 *     tags:
 *       - Roadmap
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the roadmap to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Roadmap deleted successfully
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
 *         description: Roadmap not found
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
const deleteRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleteRoadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!deleteRoadmap) {
      return next(new AppError("Roadmap not found", 404));
    }
    res.status(200).json({ message: "Delete Successfully" });
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update one roadmap
/**
 * @swagger
 * /api/roadmap/{id}:
 *   put:
 *     summary: Update an roadmap by ID
 *     description: This endpoint allows the updating of an roadmap based on its ID. Returns the updated roadmap if successful.
 *     tags:
 *       - Roadmap
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the roadmap to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Roadmap'
 *     responses:
 *       200:
 *         description: Roadmap after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Roadmap'
 *       404:
 *         description: Roadmap not found
 *       500:
 *         description: Server error
 */
const updateRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedRoadmap) {
      return next(new AppError("Roadmap not found", 404));
    }
    res
      .status(200)
      .json({ message: "Roadmap updated successfully", updatedRoadmap });
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
    return next(new AppError("Internal Server Error", 500));
  }
};

const RoadmapAPI = {
  getRoadmap,
  getAllRoadmap,
  createRoadmap,
  deleteRoadmap,
  updateRoadmap,
};
export default RoadmapAPI;
