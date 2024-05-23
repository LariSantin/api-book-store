import { Request, Response, NextFunction } from 'express';
import { createBook, listAllBooks } from '../services/book.service';


export const registerBook = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { code, title, author, quantity, price }= req.body;

        let book = await createBook(code, title, author, quantity, price);
    
        res.send(book);
    } catch(err){
        next(err);
    }
   
}

export const listAll = async(req: Request, res: Response, next: NextFunction) => {
    try{

        return await listAllBooks();

    } catch(err){
        next(err);
    }
}