import express from "express";
import { handle404, handleError } from "../middlewares/routeHandler";
import routerTest from "./sequelize";
const router = express.Router();
router.use("/sequelize", routerTest);
router.use(handle404);
router.use(handleError);
export { router };
