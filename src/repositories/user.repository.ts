import { ErroCode, ErroMessage } from "../exceptions/http.exception"
import { InternalServerErrorException } from "../exceptions/internal-server-error"
import { prismaClient } from "../prisma"



export const findUser  = async (email: string) => {
    try {
        return await prismaClient.user.findFirst({
            where: {email}
        })
    } catch {
        throw new InternalServerErrorException(ErroMessage.DATABASE_INTERNAL_ERROR, ErroCode.InternalServerError)
    }
    
}

export const createUserDB = async (email: string, password: string, name:string) => {
    try {
        return await prismaClient.user.create({
            data: {
                name,
                email,
                password
            }
        });
        
    } catch (error:any) {
        throw new InternalServerErrorException(ErroMessage.DATABASE_INTERNAL_ERROR, ErroCode.InternalServerError)
    }
}