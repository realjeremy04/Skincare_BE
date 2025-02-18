import FeedbackAPI from "$root/controllers/Feedback.controller";
import { Router } from "express";

const router = Router();

router.get("/", FeedbackAPI.getAllFeedback);
router.post("/", FeedbackAPI.createFeedback);
router.get("/:id", FeedbackAPI.getFeedback);
router.delete("/:id", FeedbackAPI.deleteFeedback);
router.put("/:id", FeedbackAPI.updateFeedback);

export default router;
