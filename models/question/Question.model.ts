import mongoose, { Schema } from "mongoose";
import { IQuestion } from "./IQuestion";

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  answerId: {
    type: [Schema.Types.ObjectId],
    ref: "Answer",
    required: true,
  },
});

export default mongoose.model<IQuestion>("Question", questionSchema);
