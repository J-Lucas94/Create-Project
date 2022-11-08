const FuncaoUsuario = require('../models/FuncaoUsuario')

module.exports = class PermissoesFuncController {

    static async registrar(req, res){

        let funcoes = {
            funcoes_id: req.body.funcoes_id,
            user_id: req.body.user_id
        }

        try {
            
            let funcao = await FuncaoUsuario.create(funcoes)

            if(funcao){
                return res.json({funcao: funcao})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){
        try {

            let funcao = await FuncaoUsuario.findOne({where: {id: req.params.id}})

            if(funcao){
                await FuncaoUsuario.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Permissão apagada com sucesso !"})
            }else{
                return res.status(400).json({message: "Permissão não encontrada !"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}