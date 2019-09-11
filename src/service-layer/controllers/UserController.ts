import { JsonController, Get, Res, Req, Param, Authorized, CurrentUser } from 'routing-controllers';
import { Response, Request } from 'express';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';
import { User } from '../../data-layer/entity/User';

@JsonController('/users')
export class UserController {
    constructor(private userAgent: UserAgent) { }

    @Authorized()
    @Get('/me')
    async getCurrentUser(@Req() req: Request, @Res() res: Response) {
        const userId: any = req.headers['user-id'];
        const user = await this.userAgent.getUserById(userId);
        return { data: user };
    }
}
