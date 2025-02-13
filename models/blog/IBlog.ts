import { Types } from "mongoose";

export interface IBlog {
  staffId: Types.ObjectId;
  title: string;
  status: string;
  content: string;
  contentId: IContent[];
}

export interface IContent {
  image: string;
  imageDescription: string;
}
