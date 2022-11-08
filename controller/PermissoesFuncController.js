const PermissoesFunc = require('../models/PermissoesFuncoes')

module.exports = class PermissoesFuncController {

    static async registrar(req, res){

        let permissoes = {
            funcoes_id: req.body.funcoes_id,
            permissoes_id: req.body.permissoes_id
        }

        try {
            
            let permissao = await PermissoesFunc.create(permissoes)

            if(permissao){
                return res.json({permissao: permissao})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){
        try {

            let permissao = await PermissoesFunc.findOne({where: {id: req.params.id}})

            if(permissao){
                await PermissoesFunc.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Permissão apagada com sucesso !"})
            }else{
                return res.status(400).json({message: "Permissão não encontrada !"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}