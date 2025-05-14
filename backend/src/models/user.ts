import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  uni: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  photoURL: { type: String, required: false }, //Google profile picture
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
