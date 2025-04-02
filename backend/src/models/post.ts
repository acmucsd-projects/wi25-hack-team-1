import { InferSchemaType, Schema, model, Types } from "mongoose";

const luggageSchema = new Schema({
  carryOn: { type: Number, required: true },
  checked: { type: Number, required: true },
});

const postSchema = new Schema(
  {
    // Reference to the User model, so we can populate certain fields on the post.
    // Ex: firstName, lastName, university, email, etc.
    creatorId: { type: Types.ObjectId, ref: "User", required: true },
    flightDay: { type: Date, required: true },
    time: { type: Date, required: true }, // Desired time to BE at Airport.
    airport: { type: String, required: true },
    luggage: { type: luggageSchema, required: true },
    numPassengers: { type: Number, required: true },
    fulfilled: { type: Boolean, default: false }, // Has this ride been matched?
  },
  { timestamps: true },
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
