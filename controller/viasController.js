const ViasAdmissao = require('../models/ViasAdmissoes')

module.exports = class ViaController {

    static async registrar(req, res) {
        let vias = {
            descricao: req.body.descricao
        }

        try {

            let registrar = await ViasAdmissao.create(vias)

            if (registrar) {
                return res.status(200).json({ message: "Via registrada com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar a Via !" })
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res) {

        try {

            
            if (req.params.id) {
                let via = await ViasAdmissao.findOne({where: {id:req.params.id}})
                return res.json({via: via})

            }else{
                
                let vias = await ViasAdmissao.findAll({ raw: true })
                return res.json({ vias: vias })
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){
        let vias = {
            descricao: req.body.descricao
        }

        try {
            let via = await ViasAdmissao.findOne({where: {id: req.params.id}})

            if(via){
               await ViasAdmissao.update(vias, {where: {id: req.params.id}})
               return res.status(200).json({message: "Via atualizada com sucesso !"})
            }else{
                return res.status(400).json({message: "Via não encontrada"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let via = await ViasAdmissao.findOne({where: {id: req.params.id}})

            if(via){
                await ViasAdmissao.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Via deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Via não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

}