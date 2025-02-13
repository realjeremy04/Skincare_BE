import mongoose, { Schema } from "mongoose";
import { IAnswer } from "$types/answer.interface";

const AnswerSchema = new Schema<IAnswer>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IAnswer>("Answer", AnswerSchema);
