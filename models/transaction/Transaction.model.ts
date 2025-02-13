import { Schema } from "mongoose";
import { ITransaction } from "./ITransaction";

const transactionSchema = new Schema<ITransaction>({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  paymentMethodId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
