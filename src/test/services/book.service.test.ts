import BookService from '../../services/book.service';
import { createBookDB, findAll, findBookByCode, findBookById } from '../../repositories/book.repository';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { ErroCode, ErroMessage } from '../../exceptions/http.exception';


jest.mock('../../repositories/book.repository', () => ({
    findBookByCode: jest.fn(),
    createBookDB: jest.fn(),
    findAll: jest.fn(),
    findBookById: jest.fn()
  }));
  
describe('book service test', () => {
    let bookService:BookService;

    beforeEach(async () => {
        bookService = new BookService();
        jest.clearAllMocks();
      });

      describe('create book', () => {
        test("test should return sucessful when book is created", async () => {

            const bookShouldBeCreated = {
                code:"123JE", 
                title:"Test Service", 
                author:"John Doe", 
                quantity: 10, 
                price:19
            };

            (findBookByCode as jest.Mock).mockResolvedValue(null);
            (createBookDB as jest.Mock).mockResolvedValue(bookShouldBeCreated);

            let result =  await bookService.createBook(bookShouldBeCreated.code, bookShouldBeCreated.title, 
                bookShouldBeCreated.author, bookShouldBeCreated.quantity, bookShouldBeCreated.price);


            expect(findBookByCode).toHaveBeenCalledWith(bookShouldBeCreated.code);
            expect(createBookDB).toHaveBeenCalledWith(bookShouldBeCreated.code, bookShouldBeCreated.title, 
                bookShouldBeCreated.author, bookShouldBeCreated.quantity, bookShouldBeCreated.price);

            expect(result).toEqual(bookShouldBeCreated);
        });

        test("test should return exception when book already exists", async () => {

            const bookExists = {
                code:"123JE", 
                title:"Test Service", 
                author:"John Doe", 
                quantity: 10, 
                price:19
            };

            (findBookByCode as jest.Mock).mockResolvedValue(bookExists);
          
                
            await expect(bookService.createBook(bookExists.code, bookExists.title, bookExists.author, bookExists.quantity, bookExists.price))
                .rejects
                .toThrow(new BadRequestsException(ErroMessage.BOOK_ALREADY_EXISTS, ErroCode.BadRequest));

            expect(findBookByCode).toHaveBeenCalledWith(bookExists.code);
            expect(createBookDB).toHaveBeenCalledTimes(0);
        });
    });

    describe('list books', () => { 

        test('test should return all books', async () => {

            let books = [
                {
                    code:"7895", 
                    title:"Test Service 1", 
                    author:"John Doe", 
                    quantity: 10, 
                    price:19
                },
                {
                    code:"4521", 
                    title:"Test Service 2", 
                    author:"John Doe", 
                    quantity: 10, 
                    price: 41
                }
            ];

            (findAll as jest.Mock).mockResolvedValue(books);

            let result = await bookService.listAll();

            expect(result).toEqual(books)
        });       


        test('test should return one book by id', async () => {

            let book = {
                    id: "808d9273-58db-4e56-a8d9-e2efa1cd8adc",
                    code:"12211", 
                    title:"Test Service", 
                    author:"John Doe", 
                    quantity: 10, 
                    price:19
                };

            (findBookById as jest.Mock).mockResolvedValue(book);

            let result = await bookService.findById(book.id);

            expect(result).toEqual(book)
        });       

    });


})

