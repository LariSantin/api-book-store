import { BadRequestsException } from "../exceptions/bad-requests";
import { ErroCode, ErroMessage } from "../exceptions/http.exception";
import { findBookById, updateQuantityBook } from "../repositories/book.repository";
import { createBookCustomer, findBookCustomer, updateBookCustomerQtBookSold } from "../repositories/bookcustomer.repository";
import { findCustomerById } from "../repositories/customer.repository";

class BookCustomerService {


    async registerSale(idBook: string, idCustomer: string, quantity: number){

        let book = await findBookById(idBook);

        if(!book){
            throw new BadRequestsException(ErroMessage.BOOK_NOT_FOUND, ErroCode.BadRequest);
        }

        let customer = await findCustomerById(idCustomer);
        
        if(!customer){
            throw new BadRequestsException(ErroMessage.CUSTOMER_NOT_FOUND, ErroCode.BadRequest);
        }

        if(quantity > 0) {
            let newQuantity = book.quantity - quantity;

            if(newQuantity < 0){
                throw new BadRequestsException(ErroMessage.BOOK_SOLD_OUT, ErroCode.BadRequest)
            }

            let bookcustomer = await findBookCustomer(book.id, customer.id);

            if(bookcustomer){
               bookcustomer = await updateBookCustomerQtBookSold(book.id, customer.id, (quantity + bookcustomer.qtBookSold));
            } else {
                bookcustomer = await createBookCustomer(book.id, customer.id, quantity);
            }

            await updateQuantityBook(book.id, newQuantity);

            return bookcustomer;
        }

        throw new BadRequestsException(ErroMessage.INVALIDY_QUANTITY, ErroCode.BadRequest);
    }
}

export default BookCustomerService;