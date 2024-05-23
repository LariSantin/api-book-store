import { BadRequestsException } from "../exceptions/bad-requests";
import { ErroCode, ErroMessage } from "../exceptions/http.exception";
import { createBookDB, findBookByCode, findAll } from "../repositories/book.repository"


export const createBook = async (code:string, title:string, author:string, quantity:number, price:number) => {

    let bookExists = await findBookByCode(code);

    if(bookExists) {
        throw new BadRequestsException(ErroMessage.BOOK_ALREADY_EXISTS, ErroCode.BadRequest);
    }

    return await createBookDB(
        code,
        title,
        author,
        quantity,
        price
    )
}

export const listAllBooks = async () => {
    return await findAll();
}