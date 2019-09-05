import { ExpressConfig } from './ExpressConfig';
import { DatabaseConnector } from '../../data-layer/adapter/DatabaseConnector';
import { EurekaService } from './EurekaService';
import { Eureka } from 'eureka-js-client';

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
                console.log(`Server started on port ${this.port}`);
            }
        });
    }

    /**
     * Connect to the database
     */
    private async connectToDatabase() {
        await console.log('Creating database connection...');
        return await DatabaseConnector.connect();
    }

    /**
     * Connect to eureka service
     */
    private async connectToEureka() {
        const client: Eureka = EurekaService.getClient();

        await console.log('Connecting to eureka...');
        return await client.start();
    }
}
