import FeedbackAPI from "$root/controllers/Feedback.controller";
import uploadMiddleware from "$root/middleware/upload";
import { auth } from "$root/middleware/auth";
import { Router } from "express";

const router = Router();

router.get("/", FeedbackAPI.getAllFeedback);
router.post("/", auth, uploadMiddleware, FeedbackAPI.createFeedback);
router.get("/:id", FeedbackAPI.getFeedback);
router.delete("/:id", FeedbackAPI.deleteFeedback);
router.put("/:id", FeedbackAPI.updateFeedback);

export default router;
