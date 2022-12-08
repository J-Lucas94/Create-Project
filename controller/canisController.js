const { raw } = require('body-parser')
const Banco = require('../models/Banco')

module.exports = class CanisController {


    static registrar(req, res){
        res.render('canis/canis')
    }

    static async registrarP(req, res) {
        let canis = {
            nome: req.body.nome
        }

        try {

            let canil = await Banco.Canis.create(canis)

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
                
                let canil = await Banco.Canis.findOne({where: {id: req.params.id},raw: true})
                return res.render('canis/lista', {canil: canil})

            }else{
                let canis = await Banco.Canis.findAll({ raw: true })
                
                return res.render('canis/lista', {canis: canis})
            }


        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){

        let canil = await Banco.Canis.findOne({where: {id: req.params.id}, raw: true})
        console.log(canil)

        if(canil){
           return res.render('canis/editar', {canil: canil})
        }

    }

    static async editarP(req, res) {
        let canis = { nome: req.body.nome }

        try {
            let canil = await Banco.Canis.findOne({ where: { id: req.params.id }})

            if (canil) {
                await Banco.Canis.update(canis, { where: { id: req.params.id } })
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

            let canil = await Banco.Canis.findOne({ where: { id: req.params.id } })

            if (canil) {

                let deletar = await Banco.Canis.destroy({ where: { id: req.params.id } })

                if (deletar) {
                    req.flash("success_msg", "Canil apagado com sucesso !")
                    return res.redirect('/canis/lista')
                } else {
                    req.flash("error_msg", "Error: Não foi apagar o Canil !")
                    return res.redirect('/canis/lista')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}