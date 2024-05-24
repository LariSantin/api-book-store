import  { Router } from 'express';
import { findById, listAll, createBook } from '../controllers/book.controller';
import authMiddleware from '../middlewares/auth';


const bookRoutes: Router= Router();

bookRoutes.post('/', authMiddleware, createBook);
bookRoutes.get('/all', authMiddleware, listAll);
bookRoutes.get('/findbyid/:id', authMiddleware, findById);

export default bookRoutes;