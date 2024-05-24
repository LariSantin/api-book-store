import  { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { createCustomer, findById } from '../controllers/customer.controller';


const customerRoutes: Router= Router();

customerRoutes.post('/', authMiddleware, createCustomer);
customerRoutes.get('/findbyid/:id', authMiddleware,findById);

export default customerRoutes;