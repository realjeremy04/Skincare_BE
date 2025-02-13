import mongoose, { Schema } from "mongoose";
import { IService } from "$types/service.interface";

const serviceSchema = new Schema<IService>({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  images: {
    type: String,
  },
});

export default mongoose.model<IService>("Service", serviceSchema);
