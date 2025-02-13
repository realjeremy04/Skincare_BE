import { Schema } from "mongoose";
import { IQuestion } from "./IQuestion";

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  answer: [
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      point: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Question", questionSchema);
