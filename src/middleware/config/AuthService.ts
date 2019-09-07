import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { User } from '../../data-layer/entity/User';
import { UserAgent } from '../../data-layer/data-agents/UserAgent';

const localStrategy = passportLocal.Strategy;

class AuthService {
    private userAgent: UserAgent;

    constructor() {
        this.userAgent = new UserAgent();
    }

    async setUpAuthMiddleware() {
        await passport.use('login', new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await this.userAgent.getUserByEmail(email);
                
                if(!user) {
                    return done(null, false, { message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);
                if(!validate) {
                    return done(null, false, { message: 'Wrong password'});
                }

                return done(null, user, { message: 'Logged in successfully'});
            } catch(error) {
                return done(error);
            }
        }))
    }
}
