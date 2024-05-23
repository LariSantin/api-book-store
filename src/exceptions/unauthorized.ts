import { ErroCode, HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
    constructor(message:string, errorCode:ErroCode){
        super(message, errorCode, 401);
    }
}