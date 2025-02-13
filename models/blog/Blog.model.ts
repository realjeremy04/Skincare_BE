import { Schema } from "mongoose";
import { IBlog } from "./IBlog";

const blogSchema = new Schema<IBlog>({
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  content: [
    {
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      imageDescription: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Blog", blogSchema);
