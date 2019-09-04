import { ExpressConfig } from './ExpressConfig';

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
}
