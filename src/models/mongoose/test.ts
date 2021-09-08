import { Schema, model } from "mongoose";

const TestSchema = new Schema({
 name: {
  type: String,
  required: true,
 },
 age: {
  type: Number,
  required: true,
 },
 isActive: {
  type: Boolean,
  required: true,
  default: true,
 },
 createdOn: {
  type: Date,
  required: true,
  default: new Date(),
 },
});

export default model("TestModel", TestSchema);
