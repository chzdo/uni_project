import { Sequelize } from "sequelize";
import { logger } from "../../utils/winston";

const SQlize = new Sequelize("template", "root", "", {
 host: "localhost",
 dialect: "mysql",
});

SQlize.authenticate()
 .then((e) => logger.info("[sequelize database connected]"))
 .catch((e) => logger.info("[sequelize database connection failed] " + e.message));

export default SQlize;
