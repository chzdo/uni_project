import express from "express";
import { handle404, handleResponse } from "../middlewares/routeHandler";

import routerTest from "./sequelize";

const router = express.Router();
router.use("/", routerTest);
router.use(handle404);
router.use(handleResponse);
export { router };
