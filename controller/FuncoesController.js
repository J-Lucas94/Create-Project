const Funcoes = require('../models/Funcoes')

module.exports = class RolesController {

    static async registrar(req, res){

        let funcoes = {
            nome: req.body.nome,
            descricao: req.body.descricao
        }

        try {
            
            let funcao = await Funcoes.create(funcoes)

            if(funcao){
                return res.status(200).json({funcao: funcao})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){
        try {

            let funcao = await Funcoes.findOne({where: {id: req.params.id}})

            if(funcao){
                await Funcoes.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Funcão apagada com sucesso !"})
            }else{
                return res.status(400).json({message: "Função não encontrada !"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}