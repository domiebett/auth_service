import { BaseHttpError } from './BaseError';

export class NotFoundError extends BaseHttpError {
    constructor(message: string) {
        super(404, message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}
