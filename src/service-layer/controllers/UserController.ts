import { JsonController, Get, Res } from 'routing-controllers';
import { Response } from 'express';

@JsonController('/users')
export class UserController {
    constructor() { }

    @Get()
    async getAll(@Res() res: Response) {
        return res.status(200).send('Things are okay');
    }
}
