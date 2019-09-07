import * as jwt from 'jsonwebtoken';
import { AuthorizationError } from '../exceptions';

export class TokenService {
    constructor() { }

    static async extractJwtPayload(bearerToken: string) {
        try {
            const token = await TokenService.retrieveToken(bearerToken);
            return await jwt.verify(token, process.env.APP_SECRET);
        } catch (error) {
            throw new AuthorizationError('Invalid Token Signature');
        }
    }

    static async retrieveToken(bearerToken: string) {
        const splitToken = await bearerToken.split(' ');
        if (splitToken && splitToken.length < 2) {
            throw new AuthorizationError('Invalid Token: please ensure your token begins with Bearer')
        }

        return splitToken[1];
    }
}
