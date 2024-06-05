import { createUserDB, findUser } from "../repositories/user.repository";
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErroCode, ErroMessage } from "../exceptions/http.exception";
import { JWT_SECRET } from "../secrets";

class UserService {
    async createUser(email: string, password: string, name: string) {

        let user = await findUser(email);
    
        if(user){
            throw new BadRequestsException(ErroMessage.USER_ALREADY_EXISTS, ErroCode.BadRequest);
        }
    
        user = await createUserDB(
            email,
            hashSync(password, 10),
            name
        );
    
    
        return user;
    }
    
    
    async loginUser(email: string, password: string) {
    
        let user = await findUser(email);
    
        if(!user){
            throw new BadRequestsException(ErroMessage.USER_NOT_FOUND, ErroCode.BadRequest);
        }
    
        if(!compareSync(password, user.password)){
            throw new BadRequestsException(ErroMessage.INCORRECT_PASSWORD, ErroCode.BadRequest);
        }
     
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)
    
        return {user, token};
    }
}

export default UserService;
