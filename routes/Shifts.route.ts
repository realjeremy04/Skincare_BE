import ShiftsAPI from "$root/controllers/Shifts.controller";
import { Router } from "express";

const router = Router();

router.get("/", ShiftsAPI.getAllShifts);
router.post("/", ShiftsAPI.createShift);
router.get("/:shiftId", ShiftsAPI.getShift);
router.delete("/:shiftId", ShiftsAPI.deleteShift);
router.put("/:shiftId", ShiftsAPI.updateShift);

export default router;
