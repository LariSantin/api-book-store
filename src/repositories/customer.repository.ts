import { Book } from "@prisma/client";
import { prismaClient } from "../prisma";

export const createCustomer = async (cpf: string, name: string, birthday: Date, adress: string) => {
    return await prismaClient.customer.create({
        data:{
            cpf,
            name,
            birthday: new Date(birthday),
            adress
        }
    });
}

export const findCustomerByCpf = async(cpf:string) => {
    return await prismaClient.customer.findUnique({ where: { cpf: cpf } })
}

export const findCustomerById = async(id:string) => {
    return await prismaClient.customer.findUnique({ 
        where: { id: id },
        select: {
           id: true,
           adress:true,
           cpf:true,
           birthday:true,
           name:true,
           books: {
            select: {
                book: true
            }
           }
        }
    })
}