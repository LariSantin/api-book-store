import { Request, Response, NextFunction } from 'express';
import { createBook, findById, listAll} from '../../controllers/book.controller';
import BookService from '../../services/book.service';

jest.mock('../../services/book.service');

describe('user controller test', () => {

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.MockedFunction<NextFunction>;

    let code = "123JE";
    let title = "Test Service"; 
    let author = "John Doe"; 
    let quantity = 10;
    let price = 10;

    beforeEach(() => {
        req = {
            body: {   
                code,
                title,
                author,
                quantity,
                price
               
          }
        } as Request;

        res = {
          send: jest.fn(),
          status: jest.fn(() => res).mockReturnValue({ send: jest.fn() }),
          json: jest.fn(),
        } as Partial<Response>;

        next = jest.fn();

    });

    test("test should return sucessful when book is created", async () => {
       
        (BookService.prototype.createBook as jest.Mock).mockResolvedValue(req.body);

        await createBook(req as Request, res as Response, next);

        expect(res.send).toHaveBeenCalledWith(req.body);

    });

    test("test should return exception when book is not created", async () => {
       
        (BookService.prototype.createBook as jest.Mock).mockRejectedValue(new Error("internal server error"));

        await createBook(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(new Error("internal server error"));

    });
});