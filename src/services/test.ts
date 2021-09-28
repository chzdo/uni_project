import { errResponseObjectType, successResponseObjectType } from "../../types";
import { testModelInstance } from "../../types/sequelize";

import { create, findOne, count, update, findAll, hardDelete, softDelete } from "../controller/__config";

import { processError, processFailedResponse, processResponse } from "../response/__config";
import { addUser } from "../validators/test";
import { Request } from "express";

const { testModels } = globalThis.db;

const service = "test service";
async function addNewUser(body: testModelInstance): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { error } = addUser.validate(body);
  if (error) return processFailedResponse(422, error.message, service);

  const countUser: number = await count({ firstName: body.firstName }, testModels);

  if (countUser > 0) return processFailedResponse(400, "User already exist", service);

  const response = await create(body, testModels);

  return processResponse(201, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function getTestById(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { query, params } = req;

  const response = await findOne(
   {
    query,
    params,
   },
   testModels
  );

  if (response == null) return processFailedResponse(404, "Resource not found", service);
  return processResponse(200, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function editUser(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { body, params, query } = req;
  const countResponse = await count({ params, query }, testModels);

  if (countResponse == 0) return processFailedResponse(404, "User not found", service);
  const response = await update({ ...body }, { params, query }, testModels);
  return processResponse(200, "Record Updated");
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function getAllUsers(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { params, query } = req;

  const response = (await findAll({ params, query }, testModels)).map((value) => value.toJSON());

  return processResponse(200, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function deleteUser(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { body, params, query } = req;
  const countResponse = await count({ params, query }, testModels);

  if (countResponse == 0) return processFailedResponse(404, "User not found", service);
  await softDelete({ ...body }, { params, query }, testModels);

  return processResponse(200, "Record Hard Deleted");
 } catch (e: unknown) {
  return processError(e, service);
 }
}

export { addNewUser, getTestById, editUser, getAllUsers, deleteUser };
