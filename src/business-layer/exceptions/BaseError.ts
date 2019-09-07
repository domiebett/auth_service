import { HttpError } from 'routing-controllers';

export class BaseError extends Error {
    public status: number;
    public error: boolean;

    constructor(message: string) {
        super(message);
        this.status = 500;
        this.error = true;
        if (process.env.NODE_ENV !== 'development') this.stack = null;
    }
}

export class BaseHttpError extends HttpError {
    public error: boolean;
    public status: number;

    constructor(status, message) {
        super(status, message);
        this.error = true;
        this.status = status;
        if (process.env.NODE_ENV !== 'development') this.stack = null;
    }
}
