import express from "express";
import TestController from "../controllers/TestController.js";
import { authenticateToken } from "../utils/auth.js";

const routes = express.Router();

routes.post("/login", TestController.login);
routes.post("/logout", TestController.logout);
routes.get("/rota1", authenticateToken, TestController.rota1);
routes.get("/rota2", authenticateToken, TestController.rota2);
routes.get("/rota3", authenticateToken, TestController.rota3);
routes.get("/rota4", authenticateToken, TestController.rota4);
routes.get("/rota5", authenticateToken, TestController.rota5);

export default routes;
