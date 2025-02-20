import AppointmentAPI from "$root/controllers/Appointment.controller";
import { Router } from "express";

const router = Router();

router.get("/", AppointmentAPI.getAllAppointment);
router.post("/", AppointmentAPI.createAppointment);
router.get("/:id", AppointmentAPI.getAppointment);
router.get("/customer/:customerId", AppointmentAPI.getAppointmentsByCustomerId);
router.delete("/:id", AppointmentAPI.deleteAppointment);
router.put("/:id", AppointmentAPI.updateAppointment);

export default router;
