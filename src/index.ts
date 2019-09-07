import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DatabaseConnector } from './data-layer/adapter/DatabaseConnector';
import { Application } from './middleware/config/Application';

async function bootstrap() {
    dotenv.config();
    await DatabaseConnector.connect();
    return new Application();
}

export const application = bootstrap();
