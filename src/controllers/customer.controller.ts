import { Request, Response, NextFunction } from 'express';
import CustomerService from '../services/customer.service';

const customerService = new CustomerService();

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { cpf, name, birthday, adress }= req.body;

        let customer = await customerService.createCustomer(cpf, name, birthday, adress);
    
        return res.send(customer);
    } catch(err){
        next(err);
    }
   
}

export const findById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id }  = req.params;

        let customer = await customerService.findById(id);

        return res.send(customer);

    } catch (error) {
        next(error);
    }
}