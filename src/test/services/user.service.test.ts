import UserService from '../../services/user.service';
import { createUserDB, findUser } from '../../repositories/user.repository';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { ErroCode, ErroMessage } from '../../exceptions/http.exception';

jest.mock('../../repositories/user.repository', () => ({
  createUserDB: jest.fn(),
  findUser: jest.fn()
}));

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
        jest.clearAllMocks();
      });

    test("test should return sucessful when user is created", async () => {

        const userShouldBeCreate = {
            email: "john@hotmail.com", 
            password: "hashedPassword",
            name: "John Doe"
        };

        (findUser as jest.Mock).mockResolvedValue(null);
        (createUserDB as jest.Mock).mockResolvedValue(userShouldBeCreate);
        (hashSync as jest.Mock).mockReturnValue('hashedPassword'); 

        let result =  await userService.createUser(userShouldBeCreate.email, userShouldBeCreate.password, userShouldBeCreate.name);


        expect(findUser).toHaveBeenCalledWith(userShouldBeCreate.email);
        expect(createUserDB).toHaveBeenCalledWith(userShouldBeCreate.email, userShouldBeCreate.password, userShouldBeCreate.name);

        expect(result).toEqual(userShouldBeCreate);
    });

    test("test should return exception when user already exists", async () => {

        const userShouldBeCreate = {
            email: "john@hotmail.com", 
            password: "hashedPassword",
            name: "John Doe"
        };

        (findUser as jest.Mock).mockResolvedValue(userShouldBeCreate);

        await expect(userService.createUser(userShouldBeCreate.email, userShouldBeCreate.password, userShouldBeCreate.name))
        .rejects
        .toThrow(new BadRequestsException(ErroMessage.USER_ALREADY_EXISTS, ErroCode.BadRequest));


        expect(findUser).toHaveBeenCalledWith(userShouldBeCreate.email);
        expect(createUserDB).not.toHaveBeenCalled();
    });

    test("test should return sucessful when credentials correct", async () => {

        const userLogin = {
            email: "john@hotmail.com", 
            password: "hashedPassword"
        };

        (findUser as jest.Mock).mockResolvedValue(userLogin);
        (compareSync as jest.Mock).mockReturnValue(true); 
        (sign as jest.Mock).mockReturnValue('tokencreated'); 

        let result =  await userService.loginUser(userLogin.email, userLogin.password);

        expect(findUser).toHaveBeenCalledWith(userLogin.email);

        expect(result).toEqual({ 'user': userLogin, 'token': 'tokencreated' });
    });

    test("test should return exception when login user isn't exists ", async () => {

        const userlogin = {
            email: "johnwrong@hotmail.com", 
            password: "hashedPassword"
        };

        (findUser as jest.Mock).mockResolvedValue(null);

        await expect(userService.loginUser(userlogin.email, userlogin.password))
        .rejects
        .toThrow(new BadRequestsException(ErroMessage.USER_NOT_FOUND, ErroCode.BadRequest));
    });

    test("test should return exception when login user password is incorrect ", async () => {

      const userlogin = {
          email: "john@hotmail.com", 
          password: "hashedPasswordwrong"
      };

      (findUser as jest.Mock).mockResolvedValue(userlogin);
      (compareSync as jest.Mock).mockReturnValue(false); 

      await expect(userService.loginUser(userlogin.email, userlogin.password))
      .rejects
      .toThrow(new BadRequestsException(ErroMessage.INCORRECT_PASSWORD, ErroCode.BadRequest));
  });



})

