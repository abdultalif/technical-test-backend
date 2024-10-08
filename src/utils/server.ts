import express, { Application, Response, Request } from 'express';
import { errorMiddleware } from '../middleware/error-middleware';
import '../utils/connectDB';
import router from '../router/index';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as swaggerDocument from '../../docs/swagger.json';

const createServer = () => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(router);
  app.use(errorMiddleware);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      sayhello: 'Hello World!',
      Swagger: {
        local: 'http://localhost:9000/api-docs',
        deployed: 'https://my-library-app-seven.vercel.app/api-docs',
      },
    });
  });
  return app;
};

export default createServer;
