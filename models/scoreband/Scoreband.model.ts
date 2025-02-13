import mongoose, { Schema } from "mongoose";
import { IScoreband } from "./IScoreband";
import exp = require("constants");

const ScorebandSchema = new Schema<IScoreband>({
  roadmap: {
    type: [
      {
        serviceId: {
          type: Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        estimate: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  minPoint: {
    type: Number,
    required: true,
  },
  maxPoint: {
    type: Number,
    required: true,
  },
  typeOfSkin: {
    type: String,
    required: true,
  },
  skinExplanation: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Scoreband", ScorebandSchema);
