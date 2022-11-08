const Canis = require('../models/Canis')

module.exports = class CanisController {

    static async registrar(req, res) {
        let canis = {
            nome: req.body.nome
        }

        try {

            let canil = await Canis.create(canis)

            if (canil) {
                return res.status(200).json({ message: "Canil registrado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar o Canil !" })
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res) {

        try {

            if(req.params.id){
                
                let canil = await Canis.findOne({where: {id: req.params.id}})
                return res.json({canil: canil})

            }else{
                let canis = await Canis.findAll({ raw: true })
                
                return res.json({ canis })
            }


        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res) {
        let canis = { nome: req.body.nome }

        try {
            let canil = await Canis.findOne({ where: { id: req.params.id } })

            if (canil) {
                await Canis.update(canis, { where: { id: req.params.id } })
                return res.status(200).json({ message: "Canil Atualizado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Canil não encontrado !" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res) {

        try {

            let canil = await Canis.findOne({ where: { id: req.params.id } })

            if (canil) {

                let deletar = await Canis.destroy({ where: { id: req.params.id } })

                if (deletar) {
                    return res.status(200).json({ message: "Canil deletado com sucesso !" })
                } else {
                    return res.status(400).json({ message: "Não possivel deletar o Canil !" })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}