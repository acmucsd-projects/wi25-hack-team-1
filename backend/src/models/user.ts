import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  uid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  uni: { type: String, required: true},         // <TODO> Will need to be validated
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
