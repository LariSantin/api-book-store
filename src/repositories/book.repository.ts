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
    return await prismaClient.book.findFirst({ where: { code: code } })
}

export const findAll = async() => {
    return await prismaClient.book.findMany();
}

export const findBookById = async(id:string) => {
    return await prismaClient.book.findUnique({ where: { id : id } });
}

export const updateQuantityBook = async (id: string, newquantity: number) => {
    return await prismaClient.book.update({
        where: {
            id
        },
        data: {
            quantity: newquantity
        }
    });
}


export const updatePriceBook = async (id: string, newPrice: number) => {
    return await prismaClient.book.update({
        where: {
            id
        },
        data: {
            price: newPrice
        }
    });
}
