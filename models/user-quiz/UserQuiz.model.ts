import mongoose, { Schema } from "mongoose";
import { IUserQuiz } from "./IUserQuiz";

const userQuizSchema = new Schema<IUserQuiz>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  scoreBandId: {
    type: Schema.Types.ObjectId,
    ref: "Scoreband",
    required: true,
  },
  questionResult: {
    type: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answerId: {
          type: [Schema.Types.ObjectId],
          ref: "Answer",
          required: true,
        },
      },
    ],
    required: true,
  },
  totalPoint: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("UserQuiz", userQuizSchema);
