import { ErroCode, HttpException } from "./http.exception";

export class BadRequestsException extends HttpException {
    constructor(message:string, errorCode:ErroCode){
        super(message, errorCode, 400);
    }
}