import clientModel from "../models/clients.js";

class clientService {

    findClient(email, senha) {
        try {

            const Client = clientModel.findOne({ email: email }, { senha: senha},{email: 1, senha: 1 });
            return Client
        } catch (error) {
            throw error;
        }

    }

}
export default new clientService()

