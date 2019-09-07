import { getConnection, Repository } from 'typeorm';
import { User, IUser } from '../entity/User';
import { TokenService } from '../../business-layer/services/TokenService';

export class UserAgent {
    private userRepository: Repository<User>;
    
    constructor() {
        this.userRepository = getConnection().getRepository(User);
    }

    /**
     * Create a user
     * @param {IUser} requestBody - request body with user attributes
     * @return {Promise<User>}
     */
    async createUser(requestBody: IUser): Promise<User> {
        let user = new User();
        user.firstName = requestBody.firstName;
        user.lastName = requestBody.lastName;
        user.email = requestBody.email;
        user.password = requestBody.password;

        return await this.userRepository.save(user);
    }

    /**
     * Get a single user by id
     * @param {number} userId - id of a user
     * @return { Promise<User>}
     */
    async getUserById(userId: number | string): Promise<User> {
        return await this.userRepository.findOneOrFail(userId);
    }

    /**
     * Get a single user by email
     * @param email a users email
     * @return {Promise<User>}
     */
    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email: email});
    }

    /**
     * Get a user by jwt token
     * @param bearerToken - bearer token provided in request.
     * @return { Promise<User> }
     */
    async getUserByToken(bearerToken: string): Promise<User> {
        const payload: any = await TokenService.extractJwtPayload(bearerToken);
        return await this.getUserById(payload.user.id)
    }
}
