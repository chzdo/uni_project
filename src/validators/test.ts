import joi from "joi";

const addUser = joi
 .object({
  name: joi.string().required(),
  address: joi.string().required(),
  age: joi.number().required(),
 })
 .unknown();

export { addUser };
