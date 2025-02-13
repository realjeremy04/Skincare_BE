import mongoose, { Schema } from "mongoose";
import { IFeedback } from "./IFeedback";

const feedbackSchema = new Schema<IFeedback>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  therapistId: {
    type: Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  images: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Feedback", feedbackSchema);
