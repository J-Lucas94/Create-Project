const AgendaProc = require('../models/AgendaProc')

module.exports = class AgendaController {

    static async registrar(req, res){

        let agendas = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao
        }
        
        try {
            
            let agenda = await AgendaProc.create(agendas)

            if(agenda){
                return res.status(200).json({message: "Agenda criada com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel criar a Agenda !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res){
        try {
            
            
            if(req.params.id){
                let agenda = await AgendaProc.findOne({where: {id: req.params.id}})
                return res.json({agenda: agenda})

            }else{
                let agendas = await AgendaProc.findAll({raw: true})
                return res.json({agendas: agendas})
                
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res){

        let agendas = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao
        }

        try {
            
            let agenda = await AgendaProc.findOne({where: {id: req.params.id}})

            if(agenda){
                await AgendaProc.update(agendas,{where: {id: req.params.id}})
                return res.status(200).json({message: "Agenda atualizada com sucesso !"})
            }else{
                return res.status(400).json({message: "Agenda não encontrada !"})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){

        try {
            
            let agenda = await AgendaProc.findOne({where: {id: req.params.id}})

            if(agenda){
                await AgendaProc.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Agenda apagada com sucesso !"})
            }else{
                return res.status(400).json({message: "Agenda não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

}