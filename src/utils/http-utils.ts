enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  DELETED = 204,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500
}

class AppError extends Error {
  readonly statusCode: HttpStatus;

  constructor(status: HttpStatus, message: string) {
    super(message);
    this.statusCode = status;
  }
}

export { AppError, HttpStatus };
