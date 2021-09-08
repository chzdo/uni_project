import { DataTypes } from "sequelize/types";
import SQlize from "../../databaseEngine/sequelize";
import { testModelInstance } from "../../../types/sequelize";

const testSchema = {
 firstName: {
  type: DataTypes.STRING,
 },
 age: {
  type: DataTypes.SMALLINT,
 },
 createdOn: {
  type: DataTypes.DATE,
 },
 isActive: {
  type: DataTypes.BOOLEAN,
 },
};

export default SQlize.define<testModelInstance>("TestModel", testSchema);
