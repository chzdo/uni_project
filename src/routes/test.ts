import express from "express";
import { Request, Response, NextFunction } from "express";
import { hardDelete } from "../controller/__config";
import { addNewUSer, deleteUser, editUser, getAll, getTestById } from "../services/test";

const routerTest = express.Router();

routerTest.post("/", async function (req: Request, res: Response, next: NextFunction) {
 const result = await addNewUSer(req.body);
 next(result);
});

routerTest.get("/", async function (req: Request, res: Response, next: NextFunction) {
 const result = await getAll(req);
 next(result);
});

routerTest.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
 const result = await getTestById(req);
 next(result);
});

routerTest.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
 const result = await editUser(req);
 next(result);
});

routerTest.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
 const result = await deleteUser(req);
 next(result);
});

export default routerTest;
