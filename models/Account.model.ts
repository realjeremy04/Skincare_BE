import mongoose, { Schema } from "mongoose";
import { IAccount } from "$types/account.interface";

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
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IAccount>("Account", AccountSchema);
