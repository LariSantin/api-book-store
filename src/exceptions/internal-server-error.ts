import { ErroCode, HttpException } from "./http.exception";

export class InternalServerErrorException extends HttpException {
    constructor(message:string, errorCode:ErroCode){
        super(message, errorCode, 500);
    }
}