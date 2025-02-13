import mongoose, { Schema } from "mongoose";
import { ISlots } from "$types/slots.interface";

const SlotSchema = new Schema<ISlots>({
  slotNum: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ISlots>("Slots", SlotSchema);
