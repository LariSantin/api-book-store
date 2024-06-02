import UserService from '../../services/user.service';
import * as userRepository from '../../repositories/user.repository';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

jest.mock('../../repositories/user.repository');

jest.mock('bcrypt', () => ({
    hashSync: jest.fn(),
    compareSync: jest.fn()
  }));

  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
  }));

describe('user service test', () => {
    let userService:UserService;

    beforeEach(() => {
        userService = new UserService();
      });

    test("test should return sucessful when user is created", async () => {

        const userShouldBeCreate = {
            email: "john@hotmail.com", 
            password: "hashedPassword",
            name: "John Doe"
        };

        (userRepository.findUser as jest.Mock).mockResolvedValue(null);
        (userRepository.createUserDB as jest.Mock).mockResolvedValue(userShouldBeCreate);
        (hashSync as jest.Mock).mockReturnValue('hashedPassword'); 

        let result =  await userService.createUser(userShouldBeCreate.email, userShouldBeCreate.password, userShouldBeCreate.name);


        expect(userRepository.findUser).toHaveBeenCalledWith(userShouldBeCreate.email);
        expect(userRepository.createUserDB).toHaveBeenCalledWith(userShouldBeCreate.email, userShouldBeCreate.password, userShouldBeCreate.name);

        expect(result).toEqual(userShouldBeCreate);
    });

    test("test should return sucessful when credentials correct", async () => {

        const userLogin = {
            email: "john@hotmail.com", 
            password: "hashedPassword"
        };

        (userRepository.findUser as jest.Mock).mockResolvedValue(userLogin);
        (compareSync as jest.Mock).mockReturnValue(true); 
        (sign as jest.Mock).mockReturnValue('tokencreated'); 

        let result =  await userService.loginUser(userLogin.email, userLogin.password);

        expect(userRepository.findUser).toHaveBeenCalledWith(userLogin.email);

        expect(result).toEqual({ 'user': userLogin, 'token': 'tokencreated' });
    });

})

