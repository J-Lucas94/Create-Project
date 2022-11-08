const Chips = require('../models/Chips')

module.exports = class ChipsController {
    static async registrar(req, res) {

        try {

            let chips = {
                codigo: req.body.codigo,
                status: req.body.status
            }

            let chip = await Chips.create(chips)

            if (chip) {
                return res.status(200).json({ message: "Chip registrado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar o Chip" })
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res) {
        try {

            if(req.params.id){
                let chip = await Chips.findOne({where: {id: req.params.id}})
                return res.json({chip: chip})
            }else{
                let chips = await Chips.findAll({ raw: true })
                return res.json({ chips: chips })
            }


        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res) {
        let chips = {
            codigo: req.body.codigo,
            status: req.body.status
        }

        try {
            let chip = await Chips.findOne({ where: { id: req.params.id } })

            if (chip) {
                await Chips.update(chips, {where: {id: req.params.id}})
                return res.status(200).json({message: "Chip atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Chip não encontrado !"})
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){

        try {
        let chip = await Chips.findOne({where: {id: req.params.id}})

        if(chip){
           await Chips.destroy({where: {id: req.params.id}})
            return res.status(200).json({message: "Chip deletado com sucesso !"})
        }else{
            return res.status(400).json({message: "Chip não encontrado !"})
        }
        } catch (error) {
            console.log(error)
        }

    }

}