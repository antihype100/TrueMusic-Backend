import jwt from 'jsonwebtoken';

interface IUserDto {
    email: string,
    userName: string
    role: string
}

export class TokenService {
    generateToken = (userDto: IUserDto) => {
        console.log(userDto);
        // @ts-ignore
        const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
        // @ts-ignore
        const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, { expiresIn: '1h' });

        return {
            accessToken,
            refreshToken,
        };
    };

    validateAccessToken = (token: string) => {
        try {
            // @ts-ignore
            jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken = (token: string) => {
        try {
            // @ts-ignore
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    };
}

export const tokenService = new TokenService();
