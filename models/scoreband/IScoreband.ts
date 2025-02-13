import { Types } from "mongoose";

export interface IScoreband {
  roadmap: IRoadmap[];
  minPoint: Number;
  maxPoint: Number;
  typeOfSkin: string;
  skinExplanation: string;
}

interface IRoadmap {
  serviceId: Types.ObjectId;
  estimate: string;
}
