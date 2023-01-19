import jwt from 'jsonwebtoken';

export class TokenService {
  generateToken = (payload: object) => {
    // @ts-ignore
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
    // @ts-ignore
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
    return {
      accessToken,
      refreshToken,
    };
  };
}

export const tokenService = new TokenService();
