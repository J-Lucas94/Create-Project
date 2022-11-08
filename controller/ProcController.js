const Procedimentos = require('../models/Procedimentos')

module.exports = class ProcController {

    static async registrar(req, res) {

        let proc = {
            descricao: req.body.descricao
        }

        try {

            let procedimento = await Procedimentos.create(proc)

            if (procedimento) {
                return res.status(200).json({ message: "Procedimento registrado com sucesso !" })
            } else {
                return res.status(400).json({ messgae: "Não foi possivel registrar o procedimento ! " })
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res) {

        try {


            if (req.params.id) {
                let procedimento = await Procedimentos.findOne({ where: { id: req.params.id } })
                return res.json({ procedimento: procedimento })

            } else {

                let procedimentos = await Procedimentos.findAll({ raw: true })
                return res.json({ procedimentos: procedimentos })
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res) {

        let procedimentos = {
            descricao: req.body.descricao
        }

        try {

            let procedimento = await Procedimentos.findOne({ where: { id: req.params.id } })

            if (procedimento) {
                await Procedimentos.update(procedimentos, { where: { id: req.params.id } })
                return res.status(200).json({ message: "Procedimento atualizado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Procedimento não encontrado !" })
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res) {
        try {

            let procedimento = await Procedimentos.findOne({ where: { id: req.params.id } })

            if (procedimento) {
                await Procedimentos.destroy({ where: { id: req.params.id } })
                return res.status(200).json({ message: "Procedimento deletado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Procedimento não encontrado !" })
            }

        } catch (error) {
            console.log(error)
        }
    }

}