import express from "express";
import { Request, Response, NextFunction } from "express";
import { addNewUSer, getTestById } from "../services/test";

const routerTest = express.Router();

routerTest.post("/", async function (req: Request, res: Response, next: NextFunction) {
 const result = await addNewUSer(req.body);
 next(result);
});

routerTest.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
 const result = await getTestById(req.query);
 next(result);
});

export default routerTest;
