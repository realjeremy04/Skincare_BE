import { Router } from "express";
import accountRoutes from "./Account.route";
import serviceRoutes from "./Service.route";

const router = Router();

router.use("/account", accountRoutes);
router.use("/service", serviceRoutes);

export default router;
