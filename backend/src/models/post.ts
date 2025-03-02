import { InferSchemaType, Schema, model } from "mongoose";
import { number } from "zod";

const luggageSchema = new Schema({
  carryOn: { type: number, required: true },
  checked: { type: number, required: true },
});

const postSchema = new Schema(
  {
    creatorId: { type: String, required: true },
    flightDay: { type: Date, required: true },
    time: { type: Date, required: true },
    airport: { type: String, required: true },
    luggage: { type: luggageSchema, required: true },
    numPassengers: { type: number, required: true },
  },
  { timestamps: true },
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
