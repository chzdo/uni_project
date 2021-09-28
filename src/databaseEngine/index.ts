import mongoose from "mongoose";
import { logger } from "../../utils/winston";

// eslint-disable-next-line no-undef
const { DEV_DB_URI, DB_URI } = process.env;

mongoose
 .connect(DB_URI || DEV_DB_URI)
 .then((e) => logger.info("[mongoose database connected]"))
 .catch((e) => logger.info("[mongoose database connection failed with] " + e.message));
