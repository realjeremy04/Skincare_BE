import ShiftsAPI from "$root/controllers/Shifts.controller";
import { Router } from "express";

const router = Router();

router.get("/", ShiftsAPI.getAllShifts);
router.post("/", ShiftsAPI.createShift);
router.get("/:shiftId", ShiftsAPI.getShift);
router.get("/therapist/:therapistId", ShiftsAPI.getShiftsByTherapistId);
router.get(
  "/therapist/upcoming/:therapistId",
  ShiftsAPI.getUpcomingShiftsByTherapistId
);
router.delete("/:shiftId", ShiftsAPI.deleteShift);
router.put("/:shiftId", ShiftsAPI.updateShift);

export default router;
