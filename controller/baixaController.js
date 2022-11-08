const Baixa = require('../models/Baixa')

module.exports = class baixaController {

    static async registrar(req, res) {

        let baixas = {
            id_motBaixa: req.body.id_motBaixa,
            id_admissao: req.body.id_admissao,

        }

        try {
            let baixa = await Baixa.create(baixas)

            if (baixa) {
                return res.status(200).json({ message: "Baixa registrada com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar a Baixa !" })
            }
        } catch (error) {
            console.log(error)
        }


    }

    static async lista(req, res) {
        try {

            
            if (req.params.id) {
                let baixa = await Baixa.findOne({where: {id: req.params.id}})
                return res.json({ baixa: baixa })
            }else{
                let baixas = await Baixa.findAll({ raw: true })
                return res.json({baixas: baixas})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){

        let baixas = {
            id_motBaixa: req.body.id_motBaixa,
            id_admissao: req.body.id_admissao,

        }

        try {
            
            let baixa = await Baixa.findOne({where: {id: req.params.id}})

            if(baixa){
                await Baixa.update(baixas, {where: {id: req.params.id}})
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
          
            let baixa = await Baixa.findOne({where: {id: req.params.id}})

            if(baixa){
                await Baixa.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Baixa deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Baixa não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

}