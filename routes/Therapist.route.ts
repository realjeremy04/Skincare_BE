import TherapistAPI from "$root/controllers/Therapist.controller";
import { Router } from "express";

const router = Router();

router.get("/", TherapistAPI.getAllTherapists);
router.post("/", TherapistAPI.createTherapist);
router.get("/:therapistId", TherapistAPI.getTherapist);
router.delete("/:therapistId", TherapistAPI.deleteTherapist);
router.put("/:therapistId", TherapistAPI.updateTherapist);

export default router;
