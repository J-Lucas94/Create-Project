const Permissoes = require('../models/Permissoes')

module.exports = class PermissoesController {

    static async registrar(req, res){

        let permissoes = {
            nome: req.body.nome,
            descricao: req.body.descricao
        }

        try {
            
            let permissao = await Permissoes.create(permissoes)

            if(permissao){
                return res.json({permissao: permissao})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){
        try {

            let permissao = await Permissoes.findOne({where: {id: req.params.id}})

            if(permissao){
                await Permissoes.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Permissão apagada com sucesso !"})
            }else{
                return res.status(400).json({message: "Permissão não encontrada !"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}