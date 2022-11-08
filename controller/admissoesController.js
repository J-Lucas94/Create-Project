const Admissoes = require('../models/Admissoes')

module.exports = class AdmissoesController {

    static async registrar(req, res){

        let admissoes = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_chip: req.body.id_chip,
            id_canil: req.body.id_canil,
            id_via: req.body.id_via
        }

        try {
           let admissao = await Admissoes.create(admissoes)
           
           if(admissao){
            return res.status(200).json({message: "Admissão registrada com sucesso !"})
           }else{
            return res.status(400).json({message: "Não foi possivel registrar a Admissão"})
           }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res){
        try {
           
           

            if(req.params.id){
                let admissao = await Admissoes.findOne({where: {id: req.params.id}})
                return res.json({admissao: admissao})
            }else{
                let admissoes = await Admissoes.findAll({raw: true})
                return res.json({admissoes: admissoes})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){
        let admissoes = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_chip: req.body.id_chip,
            id_canil: req.body.id_canil,
            id_via: req.body.id_via
        }

        try {
           let admissao = await Admissoes.findOne({where: {id: req.params.id}}) 

           if(admissao){
            await Admissoes.update(admissoes, {where: {id: req.params.id}})
            return res.status(200).json({message: "Admissão atualizada com sucesso !"})
           }else{
            return res.status(400).json({message: "Admissão não encontrada !"})
           }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let admissao = await Admissoes.findOne({where: {id: req.params.id}})

            if(admissao){
               await Admissoes.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Admissão deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Admissão não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

}