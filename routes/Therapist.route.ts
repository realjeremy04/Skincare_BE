import express from "express";
import TherapistAPI from "$controllers/Therapist.controller";

import { validateRequest } from "$root/middleware/validateRequest";
import { therapistIdValidation, therapistValidation } from "$root/validators/therapist.validator";


const router = express.Router();

router.get("/", TherapistAPI.getAllTherapists);
router.get("/:therapistId", therapistIdValidation, validateRequest, TherapistAPI.getTherapist);
router.post("/", therapistValidation, validateRequest, TherapistAPI.createTherapist);
router.put("/:therapistId", therapistIdValidation, therapistValidation, validateRequest, TherapistAPI.updateTherapist);
router.delete("/:therapistId", therapistIdValidation, validateRequest, TherapistAPI.deleteTherapist);

export default router;
