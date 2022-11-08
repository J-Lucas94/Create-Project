const RegProcAutAvulsos = require('../models/RegProcAutAvulsos')

module.exports = class RegProcAutAvulsosController {

   static async registrar(req, res){

    let avulsos = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,

    }

    try {

        let avulso = await RegProcAutAvulsos.create(avulsos)

        if(avulso){
            return res.status(200).json({message: "Registro realizado com sucesso !"})
        }else{
            return res.status(400).json({message: "Não foi possivel registrar"})
        }

    } catch (error) {
        console.log(error)
    }

   }

   static async lista(req, res){

    try {
        
        let avulsos = await RegProcAutAvulsos.findAll({raw: true})

        if(avulsos){
            return res.json({avulsos: avulsos})
        }

    } catch (error) {
        console.log(error)
    }

   }

   static async editar(req, res){

    let avulsos = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }

    try {
       
        let avulso = await RegProcAutAvulsos.findOne({where: {id: req.params.id}})

        if(avulso){
            await RegProcAutAvulsos.update(avulsos, {where: {id: req.params.id}})
            return res.status(200).json({message: "Registro atualizado com sucesso !"})
        }else{
            return res.status(400).json({message: "Registro não encontrado !"})
        }

    } catch (error) {
        console.log(error)
    }
   }

   static async deletar(req, res){

    try {
        
        let avulso = await RegProcAutAvulsos.findOne({where: {id: req.params.id}})

        if(avulso){
            await RegProcAutAvulsos.destroy({where: {id: req.params.id}})
            return res.status(200).json({message: "Registro deletado com sucesso !"})
        }else{
            return res.status(400).json({message: "Registro não encontrado !"})
        }

    } catch (error) {
        console.log(error)
    }

   }
    
}