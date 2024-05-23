import { NextFunction, Request, Response } from 'express';
import { HttpException } from "../exceptions/http.exception";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}