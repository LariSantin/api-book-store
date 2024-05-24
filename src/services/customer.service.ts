import { BadRequestsException } from "../exceptions/bad-requests";
import { ErroCode, ErroMessage } from "../exceptions/http.exception";
import { createCustomer, findCustomerByCpf, findCustomerById } from "../repositories/customer.repository";


class CustomerService {

    async findById(id: string) {
        return await findCustomerById(id);
    }

    async createCustomer(cpf: string, name: string, birthday: Date, adress: string) {
       
        let customer = await findCustomerByCpf(cpf);

        if(customer) {
            throw new BadRequestsException(ErroMessage.CUSTOMER_ALREADY_EXISTS, ErroCode.BadRequest);
        }
        
        customer = await createCustomer(cpf, name, birthday, adress);

        return customer;
    }
}

export default CustomerService;