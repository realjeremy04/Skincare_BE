import { Types } from "mongoose";

export interface IBlog {
  staffId: Types.ObjectId;
  title: string;
  status: string;
  content: IContent[];
}

export interface IContent {
  content: string;
  image: string;
  imageDescription: string;
}
