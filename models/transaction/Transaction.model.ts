import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./ITransaction";

const transactionSchema = new Schema<ITransaction>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  paymentMethodId: {
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
