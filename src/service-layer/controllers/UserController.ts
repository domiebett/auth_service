import { JsonController, Get, Res, Req, Param, Authorized, CurrentUser } from 'routing-controllers';
import { Response } from 'express';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';
import { User } from '../../data-layer/entity/User';

@JsonController('/users')
@Authorized()
export class UserController {
    constructor(private userAgent: UserAgent) { }

    @Get('/me')
    async getUserById(@CurrentUser({ required: true }) user: User, @Res() res: Response) {
        return { data: user };
    }
}
