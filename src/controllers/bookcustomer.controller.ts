import { Request, Response, NextFunction } from "express";
import BookCustomerService from "../services/bookcustomer.service";

const bookcustomerservice = new BookCustomerService();

export const sale = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { idBook, idCustomer, quantity } = req.body;

        let bookcustomer = await bookcustomerservice.registerSale(idBook, idCustomer, quantity);

        return res.send(bookcustomer);
       
    } catch (error) {
        next(error);
    }

}