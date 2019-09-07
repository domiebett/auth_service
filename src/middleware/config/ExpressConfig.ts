import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as health from 'express-ping';
import { useExpressServer, useContainer as routeUseContainer, Action } from 'routing-controllers';
import { useContainer as ormUseContainer } from 'typeorm';
import { Container } from 'typedi';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';

export class ExpressConfig {
    public app: express.Application;
    private userAgent: UserAgent;

    constructor() {
        this.userAgent = new UserAgent();

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(health.ping());

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
        const interceptorsPath = path.resolve('build', 'middleware/interceptors');
        
        return useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true,
            interceptors: [interceptorsPath + '/*.js'],
            authorizationChecker: async (action: Action) => {
                const token = action.request.headers['authorization'];
                const user = await this.userAgent.getUserByToken(token);
                if (user && user.email) return true;
                return false;
            },
            currentUserChecker: async (action: Action) => {
                const token = action.request.headers['authorization'];
                return await this.userAgent.getUserByToken(token);
            }
        });
    }
}
