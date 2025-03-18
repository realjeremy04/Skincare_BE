import { NextFunction, Request, Response } from "express";
import Appointment from "$models/Appointment.model";
import Therapist from "$models/Therapist.model";
import { IAppointment } from "$types/appointment.interface";
import AppError from "$root/utils/AppError.util";

interface AuthenticatedRequest extends Request {
  user?: { _id: string; role: string };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the appointment (auto-generated by MongoDB)
 *           readOnly: true
 *         therapistId:
 *           type: string
 *           description: The unique identifier of the therapist
 *         customerId:
 *           type: string
 *           description: The unique identifier of the customer
 *         slotsId:
 *           type: string
 *           description: The unique identifier of the slot
 *         serviceId:
 *           type: string
 *           description: The unique identifier of the service
 *         checkInImage:
 *           type: string
 *           description: The image taken at check-in
 *         checkOutImage:
 *           type: string
 *           description: The image taken at check-out
 *         notes:
 *           type: string
 *           description: Additional notes for the appointment
 *         amount:
 *           type: number
 *           description: The total amount charged for the appointment
 *         status:
 *           type: string
 *           description: The status of the appointment
 *       required:
 *         - therapistId
 *         - customerId
 *         - slotsId
 *         - serviceId
 *         - amount
 *         - status
 */

// Get all appointment
/**
 * @swagger
 * /api/appointment:
 *   get:
 *     summary: Retrieve a list of all appointment
 *     tags:
 *       - Appointment
 *     responses:
 *       200:
 *         description: A list of appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointment found
 *       500:
 *         description: Server error
 */
const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await Appointment.find()
      .populate("therapistId")
      .populate("customerId")
      .populate("serviceId")
      .populate("slotsId");

    if (!appointments || appointments.length === 0) {
      return next(new AppError("No appointments found", 404));
    }

    res.status(200).json(appointments);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Get one appointment
/**
 * @swagger
 * /api/appointment/{id}:
 *   get:
 *     summary: Retrieve a single appointment by ID
 *     tags:
 *       - Appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: A single appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("therapistId")
      .populate("customerId")
      .populate("serviceId")
      .populate("slotsId");

    if (!appointment) {
      return next(new AppError("Appointment not found", 404));
    }

    res.status(200).json(appointment);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Create one appointment
/**
 * @swagger
 * /api/appointment:
 *   post:
 *     summary: Create a new appointment
 *     tags:
 *       - Appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: The created appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (
      !req.body.therapistId ||
      !req.body.customerId ||
      !req.body.slotsId ||
      !req.body.serviceId ||
      !req.body.status
    ) {
      return next(new AppError("Bad request", 400));
    }

    const appointment = new Appointment({
      therapistId: req.body.therapistId,
      customerId: req.body.customerId,
      slotsId: req.body.slotsId,
      serviceId: req.body.serviceId,
      checkInImage: req.body.checkInImage,
      checkoutImage: req.body.checkOutImage,
      notes: req.body.notes,
      amount: req.body.amount,
      status: req.body.status,
    });

    const newAppointment = await appointment.save();
    res.status(200).json(newAppointment);
  } catch (err: Error | any) {
    console.log(err);
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete one appointment
/**
 * @swagger
 * /api/appointment/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     description: This endpoint allows the deletion of an appointment based on its ID. Returns the deleted appointment if successful.
 *     tags:
 *       - Appointment
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the appointment to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
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
 *         description: Appointment not found
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
const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return next(new AppError("Appointment not found", 404));
    }
    res.status(200).json({ message: "Delete Successfully" });
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Update one appointment
/**
 * @swagger
 * /api/appointment/{id}:
 *   patch:
 *     summary: Update an appointment by ID
 *     description: This endpoint allows partial updating of an appointment including optional image uploads for check-in/check-out. If no new image is provided, existing images remain unchanged.
 *     tags:
 *       - Appointment
 *     security:
 *       - bearerAuth: []  # Nếu dùng auth
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the appointment to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false  # PATCH nên không bắt buộc gửi dữ liệu
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               checkInImage:
 *                 type: string
 *                 format: binary
 *                 description: Optional check-in image (JPEG, JPG, PNG only). Leave empty to keep existing image.
 *               checkOutImage:
 *                 type: string
 *                 format: binary
 *                 description: Optional check-out image (JPEG, JPG, PNG only). Leave empty to keep existing image.
 *               status:
 *                 type: string
 *                 enum: [Scheduled, In Progress, Completed, Cancelled]
 *                 description: Appointment status
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
const updateAppointment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Tìm appointment trước
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return next(new AppError("Appointment not found", 404));
    }

    // Xử lý upload ảnh
    const updateData: Partial<IAppointment> = { ...req.body };

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files["checkInImage"]?.[0]) {
        updateData.checkInImage = `${req.protocol}://${req.get(
          "host"
        )}/images/${files["checkInImage"][0].filename}`;
      } else {
        updateData.checkInImage = appointment.checkInImage; // Giữ nguyên ảnh cũ nếu không gửi ảnh mới
      }

      if (files["checkOutImage"]?.[0]) {
        updateData.checkOutImage = `${req.protocol}://${req.get(
          "host"
        )}/images/${files["checkOutImage"][0].filename}`;
      } else {
        updateData.checkOutImage = appointment.checkOutImage; // Giữ nguyên ảnh cũ nếu không gửi ảnh mới
      }
    } else {
      // Nếu không có req.files, giữ nguyên giá trị cũ
      updateData.checkInImage = appointment.checkInImage;
      updateData.checkOutImage = appointment.checkOutImage;
    }

    // Cập nhật appointment với dữ liệu mới
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//Get Appointment by CustomerId
/**
 * @swagger
 * /api/appointment/customer/{customerId}:
 *   get:
 *     summary: Retrieve all appointments for a specific customer
 *     tags:
 *       - Appointment
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: A list of appointments for the customer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointments found for this customer
 *       500:
 *         description: Server error
 */
const getAppointmentsByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await Appointment.find({
      customerId: req.params.customerId,
    })
      .populate({
        path: "therapistId",
        populate: {
          path: "accountId",
          select: "username",
        },
      })
      .populate("customerId")
      .populate("serviceId")
      .populate("slotsId");

    res.status(200).json(appointments);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//Get Appointment by TherapistId
/**
 * @swagger
 * /api/appointment/account/{accountId}:
 *   get:
 *     summary: Retrieve all appointments for a therapist by accountId
 *     tags:
 *       - Appointment
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The account ID of the therapist
 *     responses:
 *       200:
 *         description: A list of appointments for the therapist with the specified accountId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointments found for this accountId
 *       500:
 *         description: Server error
 */
const getAppointmentsByAccountId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const therapist = await Therapist.findOne({
      accountId: req.params.accountId,
    });
    if (!therapist) {
      return next(new AppError("No therapist found for this accountId", 404));
    }
    const appointments = await Appointment.find({
      therapistId: therapist._id,
    })
      .populate("therapistId")
      .populate("customerId")
      .populate("serviceId")
      .populate("slotsId");

    res.status(200).json(appointments);
  } catch (err: Error | any) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const AppointmentAPI = {
  getAppointment,
  getAllAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  getAppointmentsByCustomerId,
  getAppointmentsByAccountId,
};
export default AppointmentAPI;
