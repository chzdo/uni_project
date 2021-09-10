import Sequelize, { Op, Sequelize as Seq } from "sequelize";
import { options } from "../../../types";
import { processQueryOptions } from "./__query";

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

async function count(
 options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<{ rows: Sequelize.Model[]; count: number }> {
 const processedOptions = processCountQueryOptions(options);
 return await model.findAndCountAll(processedOptions);
}

async function update(
 attributes: Record<string, Array<string>>,
 options?: options,
 model?: Sequelize.ModelCtor<Sequelize.Model>
): Promise<Sequelize.Model[]> {
 const processedOptions = processQueryOptions(attributes, options);
 return await model.findAndCountAll;
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
export { create, findOne, findAll };
