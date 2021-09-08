import { testModelInstance } from "../../../types/sequelize";
import { logger } from "../../../utils/winston";
import TestModel from "./test";

async function testModel(): Promise<void> {
 const a: testModelInstance = await TestModel.findOne({
  where: {
   firstName: "",
  },
 });
 logger.info(a);
}
testModel();
