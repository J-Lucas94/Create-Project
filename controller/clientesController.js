const Clientes = require('../models/Clientes')

module.exports = class ClientesController {

    static async registrar(req, res) {
        try {

            let cliente = {
                nome: req.body.nome,
                email: req.body.email,
                cep: req.body.cep,
                uf: req.body.uf,
                municipio: req.body.municipio,
                pais: req.body.pais
            }
    
            let clientes = await Clientes.create(cliente)
    
            if (clientes) {
                return res.status(200).json({ message: "Cliente registrado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar o cliente !" })
            }
            
        } catch (error) {
            console.log(error)
        }

        
    }

    static async lista(req, res) {

        try {

            
            if (req.params.id) {
                let cliente = await Clientes.findOne({where: {id: req.params.id}})
                return res.json({cliente: cliente})
            }else{
                
                let clientes = await Clientes.findAll({ raw: true })
                return res.json({ clientes: clientes })
            }
        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res) {

        let clientes = {
            nome: req.body.nome,
            email: req.body.email,
            cep: req.body.cep,
            uf: req.body.uf,
            municipio: req.body.municipio,
            pais: req.body.pais
        }

        try {
            
            let cliente = await Clientes.findOne({ where: { id: req.params.id } })
    
            if (cliente) {
                await Clientes.update(clientes, { where: { id: req.params.id } })
                return res.status(200).json({ message: "Cliente atualizado com sucesso !" })
    
            } else {
    
                return res.status(400).json({ message: "Cliente não encontrado !" })
            }

        } catch (error) {
         console.log(error)   
        }
    }

    static async deletar(req, res) {
        
        try {

            let cliente = await Clientes.findOne({ where: { id: req.params.id } })

        if (cliente) {
            await Clientes.destroy({ where: { id: req.params.id } })
            return res.status(200).json({ message: "Cliente deletado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Cliente não encontrado !" })
        }
            
        } catch (error) {
            console.log(error)
        }

        
    }

}