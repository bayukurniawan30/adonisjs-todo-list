import User from '#models/user';
import { userAuthValidator } from '#validators/auth';
import hash from '@adonisjs/core/services/hash';
export default class AuthController {
    async login({ request, response }) {
        const data = request.all();
        const payload = await userAuthValidator.validate(data);
        const email = payload.email;
        const password = payload.password;
        const user = await User.findBy('email', email);
        if (!user) {
            response.abort({ message: 'Invalid credentials' });
        }
        await hash.verify(user.password, password);
        const token = await User.accessTokens.create(user);
        const result = JSON.stringify({
            user,
            token,
        });
        response.send(result);
    }
    async me({ auth, response }) {
        const authenticateUser = await auth.use('api').authenticate();
        const user = await User.query().where('id', authenticateUser.id).first();
        response.send(user);
    }
    async logout({ auth, response }) {
        const user = await auth.use('api').authenticate();
        const userData = await User.findBy('id', user?.id);
        const token = auth.user.currentAccessToken;
        await User.accessTokens.delete(userData, token.identifier);
        response.send({ message: 'Successfully logged out' });
    }
}
//# sourceMappingURL=auth_controller.js.map