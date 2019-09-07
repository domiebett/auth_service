import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { JsonController, Post, Body, Req, Res } from 'routing-controllers';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';
import { User, IUser } from '../../data-layer/entity/User';
import { Request, Response } from 'express';
import { AuthorizationError } from '../../business-layer/exceptions';

@JsonController('/auth')
export class AuthController {
    constructor(private userAgent: UserAgent) { }

    @Post('/register')
    async register(@Body() requestBody: IUser, @Req() req: Request, @Res() res: Response) {
        const user: User = await this.userAgent.createUser(requestBody);
        return { message: 'Registration successfull' };
    }

    @Post('/login')
    async login(@Body() requestBody, @Res() res: Response) {
        const user: User = await this.userAgent.getUserByEmail(requestBody.email);

        if (user && await user.isValidPassword(requestBody.password)) {
            const body = {id: user.id };
            const token = await jwt.sign({ user: body }, process.env.APP_SECRET);
            return { user, token };
        } else {
            throw new AuthorizationError('Email or password is wrong');
        }
    }
}
