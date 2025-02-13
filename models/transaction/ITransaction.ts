import { Types } from "mongoose";

export interface ITransaction {
  customerId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  paymentMethodId: Types.ObjectId;
  status: string;
}
