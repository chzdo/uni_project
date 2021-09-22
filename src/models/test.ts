import { testModelInstance } from "../../types/sequelize";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import { logger } from "../../utils/winston";
const testSchema = {
 id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
 },

 firstName: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 otherName: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 dob: {
  type: DataTypes.DATE,
 },
 address: {
  type: DataTypes.STRING,
 },
 isDeleted: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
 },
};

export function createModel(sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<testModelInstance> {
 const testModels = sequelize.define<testModelInstance>("testModels", testSchema, {
  tableName: "testModels",
  freezeTableName: true,
 });
 testModels
  .sync({ alter: true })
  .then((e) => logger.info("[Test Model Sync] Complete"))
  .catch((e) => logger.error("[Test Model Sync] " + e.message));

 return testModels;
}

/**
const TestModel: = 

TestModel.sync({ alter: true })
 .then((e) => logger.info("[Test Model Sync] Complete"))
 .catch((e) => logger.error("[Test Model Sync] " + e.message));
console.log("i got to the model");
export { TestModel };

**/
