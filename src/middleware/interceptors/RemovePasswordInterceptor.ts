import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { IUser } from '../../data-layer/entity/User';
import { ILoginResponse } from '../../service-layer/interfaces/IAuthResponse';
import { IUserResponse, IUsersResponse } from '../../service-layer/interfaces/IUserResponse';

@Interceptor()
export class RemovePasswordInterceptor implements InterceptorInterface {
    intercept(action: Action, content: any) {
        if (content.hasOwnProperty('user')) {
            delete content.user.hashPass;
        }

        if (content.hasOwnProperty('data')) {
            if (content.data instanceof Array) {
                for(let user of content.data) {
                    delete user.hashPass;
                }
            } else {
                delete content.data.hashPass;
            }
        }

        if (content.hasOwnProperty('hashPass')) {
            delete content.hashPass;
        }

        if (content instanceof Array) {
            for (let user of content) {
                delete user.hashPass;
            }
        }

        return content;
    }
}
