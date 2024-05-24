import { Request, Response, NextFunction } from 'express';
import BookService from '../services/book.service';

const bookService = new BookService();

export const createBook = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { code, title, author, quantity, price }= req.body;

        let book = await bookService.createBook(code, title, author, quantity, price);
    
        return res.send(book);
    } catch(err){
        next(err);
    }
   
}

export const listAll = async(req: Request, res: Response, next: NextFunction) => {
    try{

        let all = await bookService.listAll();

        return res.send(all);

    } catch(err){
        next(err);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) =>  {
    try{

        const { id } = req.params;
        let book =  await bookService.findById(id);
        return res.send(book);
    } catch(err){
        next(err);
    }
}