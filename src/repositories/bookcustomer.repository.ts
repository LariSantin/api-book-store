import { prismaClient } from "../prisma";

export const createBookCustomer = async (bookId:string, customerId:string, quantity: number) => {
    return await prismaClient.booksCustomers.create({
        data:{
           bookId,
           customerId,
           qtBookSold: quantity
        }
    });
}

export const findBookCustomer = async (bookId:string, customerId:string) => {
    return await prismaClient.booksCustomers.findFirst({
        where: {
            bookId,
            customerId
        }
    })
}


export const updateBookCustomerQtBookSold = async (bookId:string, customerId:string, quantity: number) => {
    return await prismaClient.booksCustomers.update({
        where: {
            bookId_customerId: {bookId, customerId}
        },
        data:{
           qtBookSold: quantity
        }
    });
}
