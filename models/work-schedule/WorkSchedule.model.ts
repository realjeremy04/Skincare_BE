import { Schema } from "mongoose";
import { IWorkSchedule } from "./IWorkSchedule";
import exp = require("constants");

const workScheduleSchema = new Schema<IWorkSchedule>({});

export default mongoose.model("WorkSchedule", workScheduleSchema);
