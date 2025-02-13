import mongoose, { Schema } from "mongoose";
import { IAccount } from "./IAccount";

const AccountSchema = new Schema<IAccount>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Account", AccountSchema);
