import { config as envConfig } from 'dotenv';
import cors from 'cors';

import { HttpServerAdapter } from '../adapters';
import routes from './routes';

envConfig();
const server = new HttpServerAdapter();
server.useMiddleware(cors());
server.useRoute('/api', routes);
server.listen(Number(process.env.PORT));
