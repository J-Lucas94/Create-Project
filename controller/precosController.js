const PrecosProc = require('../models/PrecosProc')

module.exports = class precosController {

    static async registrar(req, res){
        let precos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc
        }

        try {
          
           let preco = await PrecosProc.create(precos)

           if(preco){
            return res.status(200).json({message: "Preço registrado com sucesso !"})
           }else{
            return res.status(400).json({message: "Não foi possivel registrar o Preço"})
           }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        try {
            
            
            if(req.params.id){
                let preco = await PrecosProc.findOne({where: {id: req.params.id}})
                return res.json({preco: preco})
            }else{
                let precos = await PrecosProc.findAll({raw: true})
                return res.json({precos:precos})
                
         }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){
        let precos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc
        }

        try {
            
            let preco = await PrecosProc.findOne({where: {id: req.params.id}})

            if(preco){
                await PrecosProc.update(precos, {where: {id: req.params.id}})
                return res.status(200).json({message: "Preço atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Preço não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){

        try {
           
            let preco = await PrecosProc.findOne({where: {id: req.params.id}})

            if(preco){
               await PrecosProc.destroy({where: {id: req.params.id}})
               return res.json({message: "Preço deletado com sucesso !"})
            }else{
                return res.json({message: "Preço não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }

    }
}