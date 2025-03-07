import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  uni: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
