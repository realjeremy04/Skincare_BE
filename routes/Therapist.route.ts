import express from "express";
import TherapistAPI from "$controllers/Therapist.controller";

import { validateRequest } from "$root/middleware/validateRequest";
import { therapistIdValidation, therapistValidation, serviceIdValidation } from "$root/validators/therapist.validator";


const router = express.Router();

router.get("/", TherapistAPI.getAllTherapists);
router.get("/:therapistId", therapistIdValidation, validateRequest, TherapistAPI.getTherapist);
router.post("/", therapistValidation, validateRequest, TherapistAPI.createTherapist);
router.get("/by-service/:serviceId", serviceIdValidation, validateRequest, TherapistAPI.getTherapistsByServiceId);
router.put("/:therapistId", therapistIdValidation, therapistValidation, validateRequest, TherapistAPI.updateTherapist);
router.delete("/:therapistId", therapistIdValidation, validateRequest, TherapistAPI.deleteTherapist);

export default router;
