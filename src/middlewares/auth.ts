import { NextFunction, Request, Response } from 'express';
import { ErroCode, ErroMessage, HttpException } from "../exceptions/http.exception";
import { UnauthorizedException } from '../exceptions/unauthorized';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '../prisma';
import { identity, merge } from 'lodash';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!;

    if(!token) {
        next(new UnauthorizedException(ErroMessage.UNAUTHORIZED, ErroCode.Unauthorized))
    }

    try {

        const payload = jwt.verify(token, JWT_SECRET) as any;

        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } })

        if(!user){
            next(new UnauthorizedException(ErroMessage.UNAUTHORIZED, ErroCode.Unauthorized));
        }

         merge(req, { identity: user});

         return next();

    } catch(error) {
        next(new UnauthorizedException(ErroMessage.UNAUTHORIZED, ErroCode.Unauthorized));
    }    
}

export default authMiddleware