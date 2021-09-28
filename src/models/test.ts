import { Schema, model } from "mongoose";

interface Test extends Document {
 id: number;
 name: string;
 age: number;
 address: string;
 isActive?: boolean;
 isDeleted: boolean;
 createdOn: Date;
}

const TestSchema = new Schema<Test>({
 id: {
  type: Number,
  required: true,
  uinque: true,
 },
 name: {
  type: String,
  required: true,
 },
 age: {
  type: Number,
  required: true,
 },
 address: {
  type: String,
  required: true,
 },
 isActive: {
  type: Boolean,
  required: true,
  default: true,
 },
 isDeleted: {
  type: Boolean,
  required: true,
  default: false,
 },
 createdOn: {
  type: Date,
  required: true,
  default: new Date(),
 },
});

export default model<Test>("TestModel", TestSchema);
