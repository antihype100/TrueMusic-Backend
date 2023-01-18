import bcrypt from "bcrypt";
import {User} from "../models/models.js";
import {tokenService} from "./tokenService.js";
import {ApiError} from "../exceptions/apiExceptions.js";

class AuthService {

    registration = async (userName: string, password: string, email: string) => {
            const candidate = await User.findOne({
                where: {
                    userName: userName
                }
            })
            if (candidate) {
                 throw ApiError.BadRequest('Пользователь с таким именем уже существует')
            }

            const payload = {
                userName: userName,
                email: email
            }
            const {refreshToken} = tokenService.generateToken(payload)
            const hashPassword = await bcrypt.hash(password, 10)
            await User.create({
                userName: userName,
                email: email,
                password: hashPassword,
                token: refreshToken,
                activateLink: 'fewfwe'
            })
    }
}

export const authService = new AuthService()