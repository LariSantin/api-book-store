import  { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { sale } from '../controllers/bookcustomer.controller';


const bookcustomerRoutes: Router= Router();

bookcustomerRoutes.post('/sale', authMiddleware, sale);

export default bookcustomerRoutes;