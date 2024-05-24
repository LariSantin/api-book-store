import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

const userService = new UserService();

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password, name } = req.body;

        let user = await userService.createUser(email, password, name);
    
        return res.send(user);
    } catch(err){
        next(err);
    }
   
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password } = req.body;

        const {user, token} = await userService.loginUser(email, password);

        return res.json({user, token});
    } catch(err){
        next(err);
    }
}