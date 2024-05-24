import { Router } from 'express';
import userRoutes from './user.routes';
import bookRoutes from './book.routes';
import customerRoutes from './customer.routes';
import bookcustomerRoutes from './bookcustomer.routes';

const rootRouter: Router = Router();

rootRouter.use('/user', userRoutes);
rootRouter.use('/book', bookRoutes); 
rootRouter.use('/customer', customerRoutes); 
rootRouter.use('/bc', bookcustomerRoutes); 

export default rootRouter;