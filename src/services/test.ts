import { errResponseObjectType, successResponseObjectType } from "../../types";
import { testModelInstance } from "../../types/sequelize";
import { create, findOne, count } from "../controller/sequelize/__config";
import { TestModel } from "../models/sequelize";
import { processError, processFailedResponse, processResponse } from "../response/__config";
import { addUser } from "../validators/test";

const service = "test service";

async function addNewUSer(body: testModelInstance): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { error } = addUser.validate(body);
  if (error) return processFailedResponse(422, error.message, service);

  await count({ id: 1 }, TestModel);

  const response = await create(body, TestModel);
  return processResponse(201, response.toJSON());
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function getTestById(query: Record<string, unknown>): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const response = await findOne(
   {
    include: ["firstName", "id"],
    exclude: ["otherName", "address", "dob"],
   },
   {
    query,
   },
   TestModel
  );

  return processResponse(200, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}
/**
async function editUSer(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
   const { body, params, query } = req;
   const id: number = params.id;

   const { error } = editUser.validate(body);
   
  if (error) return processFailedResponse(422, error.message, service);
  const response = await create(body, TestModel);
  return processResponse(201, response.toJSON());
 } catch (e: unknown) {
  return processError(e, service);
 }
}

**/
export { addNewUSer, getTestById };
