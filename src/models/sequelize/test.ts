import { DataTypes } from "sequelize";
import sequelize from "../../databaseEngine/sequelize";
import { testModelInstance } from "../../../types/sequelize";
import { logger } from "../../../utils/winston";
import * as Sequel from "sequelize";

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
let TestModel: Sequel.ModelCtor<testModelInstance>;
try {
 TestModel = sequelize.define<testModelInstance>("testModels", testSchema, {
  tableName: "testModels",
  freezeTableName: true,
 });
} catch (e) {
 logger.error(e);
}

TestModel.sync({ alter: true })
 .then((e) => logger.info("[Test Model Sync] Complete"))
 .catch((e) => logger.error("[Test Model Sync] " + e.message));

export { TestModel };
