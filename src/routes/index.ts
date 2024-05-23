import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';

const rootRouter: Router = Router();

rootRouter.use('/user', userRoutes);
rootRouter.use('/book', bookRoutes); 

export default rootRouter;