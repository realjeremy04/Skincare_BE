import { NextFunction, Request, Response } from "express";
import Service from "$models/Service.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the service
 *           readOnly: true
 *         serviceName:
 *           type: string
 *           description: The name of the service
 *         description:
 *           type: string
 *           description: Detailed description of the service
 *         price:
 *           type: number
 *           description: The price of the service
 *         isActive:
 *           type: boolean
 *           description: Indicates if the service is active
 *         images:
 *           type: string
 *           description: URL of the service image
 *       required:
 *         - serviceName
 *         - description
 *         - price
 *         - isActive
 *         - images
 */

//Get all services
/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: Retrieve a list of all serivces
 *     tags:
 *       - Service
 *     responses:
 *       200:
 *         description: A list of service
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       404:
 *         description: No service found
 *       500:
 *         description: Server error
 */
const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      res.status(404).json({ message: "No services found" });
      return;
    }

    res.status(200).json(services);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get a single service
/**
 * @swagger
 * /api/service/{id}:
 *   get:
 *     summary: Retrieve a single service by ID
 *     tags:
 *       - Service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A single service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
const getService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.findById(req.params.serviceId);

    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }

    res.status(200).json(service);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Create a new service
/**
 * @swagger
 * /api/service:
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: The created service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body.serviceName || !req.body.description || !req.body.price) {
      res.status(400).json({ message: "Bad request" });
      return;
    }

    const service = new Service({
      serviceName: req.body.serviceName,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      isActive: req.body.isActive,
    });

    const newService = await service.save();
    res.status(201).json({ message: "Create Successfully", newService });
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete an existing service
/**
 * @swagger
 * /api/service/{id}:
 *   delete:
 *     summary: Delete an service by ID
 *     description: This endpoint allows the deletion of an service based on its ID. Returns the deleted service if successful.
 *     tags:
 *       - Service
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the service to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
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
 *         description: Service not found
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
const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.serviceId);
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json({ message: "Delete Successfully", service });
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

//Update an existing service
/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     summary: Update an service by ID
 *     description: This endpoint allows the updating of an service based on its ID. Returns the updated service if successful.
 *     tags:
 *       - Service
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the service to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.serviceId,
      req.body,
      { new: true }
    );
    if (!service) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.status(200).json({ message: "Update Successfully", service });
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

const ServiceAPI = {
  getAllServices,
  getService,
  createService,
  deleteService,
  updateService,
};
export default ServiceAPI;
