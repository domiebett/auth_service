import { JsonController, Get, Res, Req, Param, Authorized, CurrentUser } from 'routing-controllers';
import { Response, Request } from 'express';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';
import { User, IUser } from '../../data-layer/entity/User';

@JsonController('/users')
export class UserController {
    constructor(private userAgent: UserAgent) { }

    @Authorized()
    @Get('/me')
    async getCurrentUser(@CurrentUser() currentUser: IUser, @Req() req: Request, @Res() res: Response) {
        const user = await this.userAgent.getUserById(currentUser.id);
        return { data: user };
    }
}
