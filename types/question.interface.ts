import { Types } from "mongoose";

export interface IQuestion {
  question: string;
  answerId: [Types.ObjectId];
}
