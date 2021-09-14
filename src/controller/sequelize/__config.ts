import Sequelize, { Op, Sequelize as Seq } from "sequelize";
import { all } from "sequelize/types/lib/operators";
import { options } from "../../../types";
import { processQueryOptions, processCountQueryOptions } from "./__query";

async function create(body, model?: Sequelize.ModelCtor<Sequelize.Model>): Promise<Sequelize.Model> {
 return await model.create({ ...body });
}

async function createMany(body, model?: Sequelize.ModelCtor<Sequelize.Model>): Promise<Sequelize.Model[]> {
 return await model.bulkCreate([...body]);
}

async function findOne(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findOne(processedOptions);
}

async function findAll(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model[]> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findAll(processedOptions);
}

async function count(options, model?: Sequelize.ModelCtor<Sequelize.Model>): Promise<number> {
 const processedOptions = processCountQueryOptions(options);
 return await model.count(processedOptions);
}

async function update(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model[]> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findAll();
}

async function softDelete(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model[]> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findAll(processedOptions);
}

async function hardDelete(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model[]> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findAll(processedOptions);
}
export { create, findOne, findAll, count };
