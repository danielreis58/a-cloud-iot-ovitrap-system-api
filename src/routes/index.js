import express from "express";

import testRoute from "./testRoute.js";

const routes = express.Router();

routes.use(testRoute);

export default routes;
