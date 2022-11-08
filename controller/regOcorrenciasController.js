const RegOcorrencias = require('../models/RegOcorrencias')

module.exports = class regOcorrenciasController {

    static async registrar(req, res){

        let ocorrencias = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
        }

        try {
            
            let ocorrencia = await RegOcorrencias.create(ocorrencias)

            if(ocorrencia){
                return res.status(200).json({message: "Ocorrencia registrada com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar a Ocorrencia !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){

        try {

            
            if(req.params.id){
                let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})
                return res.json({ocorrencia: ocorrencia})
            }else{                
                let ocorrencias = await RegOcorrencias.findAll({raw: true})
                return res.json({ocorrencias: ocorrencias})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res){

        let ocorrencias = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
        }

        try {

            let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})

            if(ocorrencia){
                await RegOcorrencias.update(ocorrencias, {where: {id: req.params.id}})
                return res.status(200).json({message: "Ocorrencia atualizada com sucesso !"})
            }else{
                return res.status(400).json({message: "Ocorrencia não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})

            if(ocorrencia){
                await RegOcorrencias.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Ocorrencia deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Ocorrencia não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }
    }
    
        


}