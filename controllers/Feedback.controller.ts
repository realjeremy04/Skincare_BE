import { NextFunction, Request, Response } from "express";
import Feedback from "$models/Feeback.model";
import Appointment from "$models/Appointment.model";
import AppError from "$root/utils/AppError.util";

interface AuthenticatedRequest extends Request {
  user?: { _id: string; role: string };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the feedback (auto-generated by MongoDB)
 *           readOnly: true
 *         accountId:
 *           type: string
 *           description: The unique identifier of the account providing the feedback
 *         appointmentId:
 *           type: string
 *           description: The unique identifier of the appointment associated with the feedback
 *         serviceId:
 *           type: string
 *           description: The unique identifier of the service being reviewed
 *         therapistId:
 *           type: string
 *           description: The unique identifier of the therapist receiving feedback
 *         images:
 *           type: string
 *           description: URL of the feedback images
 *         comment:
 *           type: string
 *           description: The comment provided in the feedback
 *         rating:
 *           type: number
 *           description: The rating given in the feedback (e.g., from 1 to 5)
 *       required:
 *         - accountId
 *         - appointmentId
 *         - serviceId
 *         - therapistId
 *         - rating
 */

// Get all feedback
/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Retrieve a list of all feedback
 *     tags:
 *       - Feedback
 *     responses:
 *       200:
 *         description: A list of feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: No feedback found
 *       500:
 *         description: Server error
 */
const getAllFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedbacks = await Feedback.find()
      .populate("accountId")
      .populate("appointmentId")
      .populate("serviceId")
      .populate("therapistId");

    if (!feedbacks || feedbacks.length === 0) {
      return next(new AppError("No feedbacks found", 404));
    }

    res.status(200).json(feedbacks);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get one feedback
/**
 * @swagger
 * /api/feedback/{id}:
 *   get:
 *     summary: Retrieve a single feedback by ID
 *     tags:
 *       - Feedback
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The feedback ID
 *     responses:
 *       200:
 *         description: A single feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Server error
 */
const getFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("accountId")
      .populate("appointmentId")
      .populate("serviceId")
      .populate("therapistId");

    if (!feedback) {
      return next(new AppError("Feedback not found", 404));
    }

    res.status(200).json(feedback);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create one feedback
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Create a new feedback
 *     tags:
 *       - Feedback
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: ID of Appointment (use to verify both serviceID and therapistId)
 *               rating:
 *                 type: number
 *                 description: Rating (1-5)
 *               comment:
 *                 type: string
 *                 description: Feedback of Customer
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Images
 *     responses:
 *       201:
 *         description: The created feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */

const createFeedback = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body.appointmentId || !req.body.rating) {
      return next(new AppError("Bad request", 400));
    }
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    const appointment = await Appointment.findById(req.body.appointmentId);
    if (!appointment) {
      return next(new AppError("Appointment not found", 404));
    }

    const imagePath = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;

    const feedback = new Feedback({
      accountId: req.user._id,
      appointmentId: req.body.appointmentId,
      serviceId: appointment.serviceId,
      therapistId: appointment.therapistId,
      images: imagePath || req.body.images,
      comment: req.body.comment,
      rating: req.body.rating,
    });

    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err: any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete one feedback
/**
 * @swagger
 * /api/feedback/{id}:
 *   delete:
 *     summary: Delete an feedback by ID
 *     description: This endpoint allows the deletion of an feedback based on its ID. Returns the deleted feedback if successful.
 *     tags:
 *       - Feedback
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the feedback to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
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
 *         description: Feedback not found
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
const deleteFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return next(new AppError("Feedback not found", 404));
    }
    res.status(200).json({ message: "Delete Successfully" });
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update one feedback
/**
 * @swagger
 * /api/feedback/{id}:
 *   put:
 *     summary: Update an feedback by ID
 *     description: This endpoint allows the updating of an feedback based on its ID. Returns the updated feedback if successful.
 *     tags:
 *       - Feedback
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the feedback to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Server error
 */
const updateFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedFeedback) {
      return next(new AppError("Feedback not found", 404));
    }
    res
      .status(200)
      .json({ message: "Feedback updated successfully", updatedFeedback });
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const FeedbackAPI = {
  getFeedback,
  getAllFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
};
export default FeedbackAPI;
