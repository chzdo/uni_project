import express from "express";
import { logger } from "../../utils/winston";
import { handle404, handleError } from "../middlewares/routeHandler";

const router = express.Router();

router.get("/", () => logger.info("indeex"));

router.use(handle404);
router.use(handleError);
export { router };
