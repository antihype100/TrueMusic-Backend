export class ApiError extends Error {
  status: number;
  errors: [] | undefined;
  constructor(status: number, message: string, errors?: []) {
    super(message);
    this.errors = errors;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
}
