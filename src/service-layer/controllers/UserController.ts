import { JsonController, Get, Res } from 'routing-controllers';
import { Response } from 'express';

@JsonController('/users')
class UserController {
    constructor() { }

    @Get('/me')
    async getAll(@Res() res: Response) {
        res.status(200).send('Things are okay');
    }
}
