import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from '../services/user.service';


export const signup = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password, name } = req.body;

        let user = await createUser(email, password, name);
    
        res.send(user);
    } catch(err){
        next(err);
    }
   
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {email, password } = req.body;

        const {user, token} = await loginUser(email, password);

        res.json({user, token});
    } catch(err){
        next(err);
    }
}