export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;

    constructor(message:string, errorCode: ErroCode, statusCode:number) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

export enum ErroCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    PartialContent = 206,
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    UnprocessableEntity = 422,
    TooManyRequests = 429,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTiemout = 504
}

export enum ErroMessage {
    USER_NOT_FOUND = 'User does not exists',
    USER_ALREADY_EXISTS = 'User has already been registered!',
    INCORRECT_PASSWORD = 'Password incorrect',
    UNAUTHORIZED = 'Unauthorized',
    BOOK_ALREADY_EXISTS = 'Book has already been registered!',
    CUSTOMER_ALREADY_EXISTS = 'Customer has already been registered!',
    BOOK_NOT_FOUND = 'Book does not exists',
    CUSTOMER_NOT_FOUND = 'Customer does not exists',
    BOOK_SOLD_OUT = 'Book out of stock',
    INVALIDY_QUANTITY= 'Invalidy quantity'
}