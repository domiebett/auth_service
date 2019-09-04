import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { useExpressServer, useContainer as routeUseContainer } from 'routing-controllers';
import { useContainer as ormUseContainer } from 'typeorm';
import { Container } from 'typedi';

export class ExpressConfig {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());

        this.setUpExpressServer();
    }

    /**
     * Set up express server
     * @return { express.Application }
     */
    setUpExpressServer() {
        routeUseContainer(Container);
        ormUseContainer(Container);

        const controllersPath = path.resolve('build', 'service-layer/controllers');
        
        return useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true
        });
    }
}
