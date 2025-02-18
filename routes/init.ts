import { Router } from "express";
import accountRoutes from "./Account.route";

const router = Router();

router.use("/account", accountRoutes);

export default router;
