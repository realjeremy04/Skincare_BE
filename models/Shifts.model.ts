import mongoose, { Schema } from "mongoose";
import { IShifts } from "$types/shifts.interface";

const shiftsSchema = new Schema<IShifts>({
  slotsId: {
    type: Schema.Types.ObjectId,
    ref: "Slots",
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  therapistId: {
    type: Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IShifts>("Shifts", shiftsSchema);
