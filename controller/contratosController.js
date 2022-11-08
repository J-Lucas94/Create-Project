const Contratos = require('../models/Contratos')

module.exports = class contratosController {

    static async registrar(req, res){
        let contratos = {
            id_cliente: req.body.id_cliente,
            id_usuario: req.body.id_usuario
        }

        try {
            let contrato = await Contratos.create(contratos)

            if(contrato){
                return res.status(200).json({message: "Contrato registrado com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar o Contrato !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        try {
            
            if(req.params.id){
                let contrato = await Contratos.findOne({where: {id: req.params.id}})
                return res.json({contrato: contrato})

            }else{
                let contratos = await Contratos.findAll({raw: true})
                return res.json({contratos: contratos})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){

        let contratos = {
            id_cliente: req.body.id_cliente
        }

        try {
            let contrato = await Contratos.findOne({where: {id: req.params.id}})

            if(contrato){
                await Contratos.update(contratos, {where: {id: req.params.id}})
                return res.status(200).json({message: "Contrato atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Contrato não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let contrato = await Contratos.findOne({where: {id: req.params.id}})

            if(contrato){
                await Contratos.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Contrato deletado com sucesso !"})
            }else{
                return res.status(400).json({message: "Contrato não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }

    }
}