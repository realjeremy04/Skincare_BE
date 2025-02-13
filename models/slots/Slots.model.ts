import mongoose, { Schema } from "mongoose";
import { ISlot } from "./ISlots";

const SlotSchema = new Schema<ISlot>({
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

export default mongoose.model("Slots", SlotSchema);
