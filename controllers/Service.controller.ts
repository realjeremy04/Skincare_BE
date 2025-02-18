import { NextFunction, Request, Response } from "express";
import Service from "$models/Service.model";


const getAllServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const services = await Service.find();

        if (!services) {
            res.status(404).json({ message: "No services found" });
            return;
        }

        res.status(200).json(services);
    } catch (err: Error | any) {
        res.status(500).json({ message: "Internal Server Error" });
        next(err);
    }
};



const getService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findById(req.params.serviceId);

        if (!service) {
            res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(service);
    } catch (err: Error | any) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const createService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (
            !req.body.serviceName ||
            !req.body.description ||
            !req.body.price
        ) {
            res.status(400).json({ message: "Bad request" });
        }

        const service = new Service({
            serviceName: req.body.serviceName,
            description: req.body.description,
            price: req.body.price,
            images: req.body.images,
            isActive: req.body.isActive,
        });

        const newService = await service.save();
        res.status(200).json(newService);
    } catch (err: Error | any) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.serviceId);
        res.status(200).json(service);
    } catch (err: Error | any) {
        res.status(500).json({ message: err.message });
    }
};


const updateService = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.serviceId, req.body);
        res.status(200).json(service);
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