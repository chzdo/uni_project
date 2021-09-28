import { errResponseObjectType, successResponseObjectType } from "../../types";

import { count, create, find, findOne, hardDelete, update, softDelete } from "../controller/__config";
import {
 processDeleteResponse,
 processError,
 processFailedResponse,
 processResponse,
 processUpdateResponse,
} from "../response/__config";
import { addUser } from "../validators/test";
import TestModel from "../models/test";
import { Request } from "express";

const service = "test service";

async function addNewUSer(body: Record<string, unknown>): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { error } = addUser.validate(body);
  if (error) return processFailedResponse(422, error.message, service);

  const testCount = await count({ name: body.name }, TestModel);

  if (testCount > 0) return processFailedResponse(400, "User already exist", service);
  const response = await create(body, TestModel);

  return processResponse(201, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}
async function getTestById(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { params, query } = req;
  const response = await findOne(TestModel, { params, query });
  if (response == null) return processFailedResponse(404, "not found", service);
  return processResponse(200, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function getAll(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { params, query } = req;
  const response = await find(TestModel, { params, query });
  if (response.length === 0) return processFailedResponse(404, "not found", service);
  return processResponse(200, response);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function editUser(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { params, query, body } = req;
  const response = await update(TestModel, { params, query, body });
  if (!response) return processFailedResponse(400, "not found", service);
  return processUpdateResponse(response, body, service);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

async function deleteUser(req: Request): Promise<errResponseObjectType | successResponseObjectType> {
 try {
  const { params, query } = req;
  const response = await hardDelete(TestModel, { params, query });
  return processDeleteResponse(response, service);
 } catch (e: unknown) {
  return processError(e, service);
 }
}

/**


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
export { addNewUSer, getTestById, getAll, deleteUser, editUser };
