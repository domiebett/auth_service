import { ExpressConfig } from './ExpressConfig';
import { DatabaseConnector } from '../../data-layer/adapter/DatabaseConnector';
import { EurekaService } from './EurekaService';
import { Eureka } from 'eureka-js-client';
import { logger } from '@bit/domiebett.budget_app.logging';

export class Application {
    private express: ExpressConfig;
    private port: number;

    constructor() {
        this.express = new ExpressConfig();
        this.port = parseInt(process.env.APP_PORT);

        this.setUpApplication();
    }

    /**
     * Set up application
     */
    private async setUpApplication() {
        await this.setUpServer();
        await this.connectToDatabase();
        await this.connectToEureka();
    }

    /**
     * Serve express app
     * @return {express.Application} - served express app server
     */
    private async setUpServer() {
        return await this.express.app.listen(this.port, (error: any) => {
            if (error) {
                return process.exit(1);
            } else {
                logger.info(`Server started on port ${this.port}.`);
            }
        });
    }

    /**
     * Connect to the database
     */
    private async connectToDatabase() {
        await logger.info('Creating database conneciton...');
        return await DatabaseConnector.connect();
    }

    /**
     * Connect to eureka service
     */
    private async connectToEureka() {
        return EurekaService.start();
    }
}
