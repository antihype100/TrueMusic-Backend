import bcrypt from 'bcrypt';
import {User} from '../models/models.js';
import {tokenService} from './tokenService.js';
import createError from 'http-errors';
import {UserDto} from '../dtos/userDto.js';

class AuthService {
    async registration(userName: string, password: string, email: string) {
        const candidate = await User.findOne({
            where: {
                userName: userName,
            },
        });
        if (candidate) {
            throw createError(400, 'Пользователь стаким именем или почтой уже существует');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({userName: userName, role: 'USER', email: email, password: hashPassword});
        const userDto = new UserDto(userData);
        const tokens = tokenService.generateToken({...userDto});

        return {...tokens, user: {...userDto}, isLogin: true};
    }

    async login(userName: string, password: string) {
        const candidate = await User.findOne({
            where: {
                userName: userName,
            },
        });
        if (!candidate) {
            throw createError(401, 'Пользователя не существует');
        }
        if (!(await bcrypt.compare(password, candidate.password))) {
            throw createError(401, 'Неверный пароль');
        }
        const userDto = new UserDto(candidate);
        const tokens = tokenService.generateToken({...userDto});

        return {...tokens, user: {...userDto}, isLogin: true};
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw createError(401, 'Пользователь не авторизован');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw createError(402, 'Пользователь не авторизован');
        }
        const {email, userName, role, id} = userData;
        const tokens = tokenService.generateToken({email, userName, role, id});
        return {...tokens, user: {email, userName, role}, isLogin: true};
    }
}

export const authService = new AuthService();
