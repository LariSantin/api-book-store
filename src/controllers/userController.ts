import { Request, Response } from 'express';
import { createUser, loginUser } from '../services/userService';


export const signup = async (req: Request, res: Response) => {

    const {email, password, name } = req.body;

    let user = await createUser(email, password, name);

    res.send(user);
}

export const login = async (req: Request, res: Response) => {

    const {email, password } = req.body;

    const {user, token} = await loginUser(email, password);

    res.json({user, token});
}