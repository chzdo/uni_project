import express from "express";
import cors from "cors";
import helmet from "helmet";
import { useMorgan } from "./utils/morgan";
import { router } from "./src/routes/index";
//import "./src/databaseEngine/mongoose";
import "./src/databaseEngine/sequelize";
//console.log("hello");
import { logger } from "./utils/winston";

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(useMorgan);

app.use("/", router);

app.listen(PORT, () => logger.info(`port running for user service at ${PORT}`));
