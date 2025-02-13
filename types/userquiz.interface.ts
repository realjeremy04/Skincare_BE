import { Types } from "mongoose";

export interface IUserQuiz {
  accountId: Types.ObjectId;
  scoreBandId: Types.ObjectId;
  totalPoint: Number;
  questionResult: IQuestionResult[];
}

interface IQuestionResult {
  questionId: Types.ObjectId;
  answerId: [Types.ObjectId];
}
