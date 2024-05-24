import { BadRequestsException } from "../exceptions/bad-requests";
import { ErroCode, ErroMessage } from "../exceptions/http.exception";
import { createBookDB, findBookByCode, findAll, findBookById } from "../repositories/book.repository";

class BookService{ 
   
    async createBook (code:string, title:string, author:string, quantity:number, price:number) {

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
    
    async listAll() {
        return await findAll();
    }
    
    async findById(id:string) {
        return await findBookById(id);
    }
}

export default BookService;


