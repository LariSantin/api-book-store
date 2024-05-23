import  { Router } from 'express';
import { listAll, registerBook } from '../controllers/book.controller';
import authMiddleware from '../middlewares/auth';


const bookRoutes: Router= Router();

bookRoutes.post('/create', authMiddleware, registerBook);
bookRoutes.get('/all', authMiddleware, listAll);

export default bookRoutes;