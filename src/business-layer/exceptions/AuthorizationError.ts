import { BaseHttpError } from "./BaseError";

export class AuthorizationError extends BaseHttpError {
    constructor(message) {
        super(401, message);
        this.name = 'AuthorizationError';
        this.status = 401;
    }
}
