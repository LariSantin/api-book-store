import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import customerRoutes from './customer.routes';
import bookcustomerRoutes from './bookcustomer.routes';

const rootRouter: Router = Router();

rootRouter.use('/users', userRoutes);
rootRouter.use('/books', bookRoutes); 
rootRouter.use('/customers', customerRoutes); 
rootRouter.use('/bc', bookcustomerRoutes); 

export default rootRouter;