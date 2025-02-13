import { Types } from "mongoose";

export interface IWorkSchedule {
  therapistId: Types.ObjectId;
  date: Date;
  shift: IShift[];
}

interface IShift {
  appointmentId: Types.ObjectId;
  slotsId: Types.ObjectId;
  isAvailable: boolean;
}
