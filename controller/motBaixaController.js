const MotivosBaixa = require('../models/MotivosBaixa')

module.exports = class motBaixaController {

    static async registrar(req, res){
        let motBaixa = {
            descricao: req.body.descricao
        }

        try {
                        
            let baixa = await MotivosBaixa.create(motBaixa)

            if(baixa){
                return res.status(200).json({message: "Baixa registrada com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar a baixa"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        
        if(req.params.id){
            let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}})
            return res.json({baixa: baixa})
            
        }else{
            let baixas = await MotivosBaixa.findAll({raw: true})
            return res.json({baixas: baixas})
        }
    }

    static async editar(req, res ){
        let motBaixa = {
            descricao: req.body.descricao
        }

        try {
           let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}}) 

           if(baixa){
            await MotivosBaixa.update(motBaixa, {where: {id:req.params.id}})
            return res.status(200).json({message: "Baixa atualizada com sucesso !"})
           }else{
            return res.status(400).json({message: "Baixa não encontrada !"})
           }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){
        try {
            
            let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}})

            if(baixa){
                await MotivosBaixa.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Baixa deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Baixa não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }
}