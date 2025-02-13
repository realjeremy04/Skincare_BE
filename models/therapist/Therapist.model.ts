import mongoose, { Schema } from "mongoose";
import { ITherapist } from "./ITherapist";

const TherapistsSchema = new Schema<ITherapist>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  specialization: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  certification: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        issuedBy: {
          type: String,
          required: true,
        },
        issuedDate: {
          type: Date,
          required: true,
        },
      },
    ],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Therapist", TherapistsSchema);
