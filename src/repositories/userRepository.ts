import { prismaClient } from "../prisma"



export const findUser  = async (email: string) => {
    return await prismaClient.user.findFirst({
        where: {email}
    })
}

export const createUserDB = async (email: string, password: string, name:string) => {
    return await prismaClient.user.create({
        data: {
            name,
            email,
            password
        }
    });
}