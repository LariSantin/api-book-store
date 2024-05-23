import { prismaClient } from "../prisma";

export const createBookDB = async (code:string, title:string, author:string, quantity:number, price:number) => {

    return await prismaClient.book.create({
        data:{
            code,
            title,
            author,
            quantity,
            price
        }
    });
}

export const findBookByCode = async(code:string) => {
    return await prismaClient.book.findFirst({ where: { code } })
}

export const findAll = async() => {
    return await prismaClient.book.findMany();
}