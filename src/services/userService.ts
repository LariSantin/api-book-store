import { createUserDB, findUser } from "../repositories/userRepository";
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';



export const createUser = async (email: string, password: string, name: string) => {

    let user = await findUser(email);

    if(user){
        throw Error('User already exists!');
    }

    user = await createUserDB(
        email,
        hashSync(password, 10),
        name
    );


    return user;
}


export const loginUser = async (email: string, password: string) => {

    const JWT_SECRET = 'akkgfderthb5479mznxcweiuio46767';

    let user = await findUser(email);

    if(!user){
        throw Error('User does not exists!');
    }

    if(!compareSync(password, user.password)){
        throw Error('Incorrect password.');
    }
 
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    return {user, token};
}