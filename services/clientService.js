import client from "../models/clients.js";
import mongoose from "mongoose"


const Client = mongoose.model("Client", client)

class clientService {

    Create(nome, rg, email, senha, confSenha) {
        const newClient = new Client({
            nome: nome,
            rg: rg,
            email: email, 
            senha: senha,
            confSenha: confSenha
        })
        newClient.save()
    }
    
    GetAll() {
        const clients = Client.find()
        return clients
    }

    GetOne(id) {
        const client = Client.findOne({_id: id})
        return client
    }

    Delete(id) {
        Client.findByIdAndDelete(id).then(() => {
            console.log(`Aluna com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, nome, rg, email, senha, confSenha ) {
        Client.findByIdAndUpdate(id, {
            nome: nome,
            rg: rg,
            email : email,
            senha: senha,
            confSenha: confSenha 
        }).then(() => {
            console.log(`Dados da aluna com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new clientService()

