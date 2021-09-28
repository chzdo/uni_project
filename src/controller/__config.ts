import { options } from "../../types";
//import { processQueryOptions, processCountQueryOptions } from "./__query";
import mongoose from "mongoose";
import { processQueryOptions, processUpdateOptions } from "./__query";

async function create(body, model: mongoose.Model<any>): Promise<mongoose.Model<any>> {
 const id = (await count({}, model)) + 1;
 return await model.create({ ...body, id });
}

async function count(query, model?: mongoose.Model<any>): Promise<number> {
 return await model.countDocuments({ ...query });
}
async function findOne(model: mongoose.Model<any>, options: options): Promise<Record<string, any>> {
 const { query, project } = processQueryOptions(options);
 return await model.findOne(query).select(project);
}

async function find(model: mongoose.Model<any>, options: options): Promise<Record<string, any>> {
 const { query, limit, skip, sort, project } = processQueryOptions(options);
 return await model.find(query).select(project).sort(sort).skip(skip).limit(limit);
}

async function update(model: mongoose.Model<any>, options: options): Promise<Record<string, any>> {
 const { query, body } = processUpdateOptions(options);
 return await model.updateOne(query, body);
}

async function hardDelete(model: mongoose.Model<any>, options: options): Promise<Record<string, any>> {
 const { query, body } = processUpdateOptions(options);
 return await model.deleteOne(query);
}

async function softDelete(model: mongoose.Model<any>, options: options): Promise<Record<string, any>> {
 const { query, body } = processUpdateOptions(options);
 return await model.updateOne(query, {
  isDeleted: true,
 });
}

export { create, count, findOne, find, update, hardDelete, softDelete };
