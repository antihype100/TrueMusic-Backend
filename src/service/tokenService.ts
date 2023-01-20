import jwt from 'jsonwebtoken';

interface IUserDto {
  email: string;
  userName: string;
  role: string;
}

export class TokenService {
  generateToken = (userDto: IUserDto) => {
    const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15s' });
    const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET!, { expiresIn: '1h' });

    return {
      accessToken,
      refreshToken,
    };
  };

  validateAccessToken = (token: string) => {
    try {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    } catch (e) {
      return null;
    }
  };

  validateRefreshToken = (token: string) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      return userData as IUserDto;
    } catch (e) {
      return null;
    }
  };
}

export const tokenService = new TokenService();
