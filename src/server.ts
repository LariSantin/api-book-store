
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import { PORT } from './secrets';
import swaggerDocs from '../src/swagger.json';


const app = express();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use( "/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', rootRouter);

app.use(errorMiddleware);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server running!');
});