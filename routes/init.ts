import { Router } from "express";
import accountRoutes from "./Account.route";
import serviceRoutes from "./Service.route";
import appointmentRoutes from "./Appointment.route";
import blogRoutes from "./Blog.route";
import feedbackRoutes from "./Feedback.route";
import shiftsRoutes from "./Shifts.route";
import questionRoutes from "./Question.route";
import scorebandRoutes from "./Scoreband.route";

const router = Router();

router.use("/account", accountRoutes);
router.use("/service", serviceRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/blog", blogRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/shifts", shiftsRoutes);
router.use("/question", questionRoutes);
router.use("/scoreband", scorebandRoutes);

export default router;
