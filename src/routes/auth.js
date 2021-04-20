import express from 'express';
import authController from '../controllers/auth.js';

const routes = express.Router();

routes.post('/login', authController.login);
routes.post('/logout', authController.logout);

export default routes;
