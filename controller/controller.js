const Admissoes = require('../models/Admissoes')
const AgendaProc = require('../models/AgendaProc')
const Baixa = require('../models/Baixa')
const Banco = require('../models/Banco')
const Chips = require('../models/Chips')
const Clientes = require('../models/Clientes')
const Contratos = require('../models/Contratos')
const MotivosBaixa = require('../models/MotivosBaixa')
const PrecosProc = require('../models/PrecosProc')
const Procedimentos = require('../models/Procedimentos')
const RegOcorrencias = require('../models/RegOcorrencias')
const RegProcAutAvulsos = require('../models/RegProcAutAvulsos')
const ViasAdmissao = require('../models/ViasAdmissoes')

module.exports = class AdmissoesController {

    static async registrar(req, res){

        let admissoes = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_chip: req.body.id_chip,
            id_canil: req.body.id_canil,
            id_via: req.body.id_via
        }

        try {
           let admissao = await Admissoes.create(admissoes)
           
           if(admissao){
            return res.status(200).json({message: "Admissão registrada com sucesso !"})
           }else{
            return res.status(400).json({message: "Não foi possivel registrar a Admissão"})
           }

        } catch (error) {
            console.log(error)
        }

    }

    static async lista(req, res){
        try {
           
           

            if(req.params.id){
                let admissao = await Admissoes.findOne({where: {id: req.params.id}})
                return res.json({admissao: admissao})
            }else{
                let admissoes = await Admissoes.findAll({raw: true})
                return res.json({admissoes: admissoes})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){
        let admissoes = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_chip: req.body.id_chip,
            id_canil: req.body.id_canil,
            id_via: req.body.id_via
        }

        try {
           let admissao = await Admissoes.findOne({where: {id: req.params.id}}) 

           if(admissao){
            await Admissoes.update(admissoes, {where: {id: req.params.id}})
            return res.status(200).json({message: "Admissão atualizada com sucesso !"})
           }else{
            return res.status(400).json({message: "Admissão não encontrada !"})
           }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let admissao = await Admissoes.findOne({where: {id: req.params.id}})

            if(admissao){
               await Admissoes.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Admissão deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Admissão não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

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

    static async registrar(req, res) {
        try {

            let cliente = {
                nome: req.body.nome,
                email: req.body.email,
                cep: req.body.cep,
                uf: req.body.uf,
                municipio: req.body.municipio,
                pais: req.body.pais
            }
    
            let clientes = await Clientes.create(cliente)
    
            if (clientes) {
                return res.status(200).json({ message: "Cliente registrado com sucesso !" })
            } else {
                return res.status(400).json({ message: "Não foi possivel registrar o cliente !" })
            }
            
        } catch (error) {
            console.log(error)
        }

        
    }

    static async lista(req, res) {

        try {

            
            if (req.params.id) {
                let cliente = await Clientes.findOne({where: {id: req.params.id}})
                return res.json({cliente: cliente})
            }else{
                
                let clientes = await Clientes.findAll({ raw: true })
                return res.json({ clientes: clientes })
            }
        } catch (error) {
            console.log(error)
        }

    }

    static async editar(req, res) {

        let clientes = {
            nome: req.body.nome,
            email: req.body.email,
            cep: req.body.cep,
            uf: req.body.uf,
            municipio: req.body.municipio,
            pais: req.body.pais
        }

        try {
            
            let cliente = await Clientes.findOne({ where: { id: req.params.id } })
    
            if (cliente) {
                await Clientes.update(clientes, { where: { id: req.params.id } })
                return res.status(200).json({ message: "Cliente atualizado com sucesso !" })
    
            } else {
    
                return res.status(400).json({ message: "Cliente não encontrado !" })
            }

        } catch (error) {
         console.log(error)   
        }
    }

    static async deletar(req, res) {
        
        try {

            let cliente = await Clientes.findOne({ where: { id: req.params.id } })

        if (cliente) {
            await Clientes.destroy({ where: { id: req.params.id } })
            return res.status(200).json({ message: "Cliente deletado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Cliente não encontrado !" })
        }
            
        } catch (error) {
            console.log(error)
        }
    }

    static async registrar(req, res){
        let contratos = {
            id_cliente: req.body.id_cliente,
            id_usuario: req.body.id_usuario
        }

        try {
            let contrato = await Contratos.create(contratos)

            if(contrato){
                return res.status(200).json({message: "Contrato registrado com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar o Contrato !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        try {
            
            if(req.params.id){
                let contrato = await Contratos.findOne({where: {id: req.params.id}})
                return res.json({contrato: contrato})

            }else{
                let contratos = await Contratos.findAll({raw: true})
                return res.json({contratos: contratos})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){

        let contratos = {
            id_cliente: req.body.id_cliente
        }

        try {
            let contrato = await Contratos.findOne({where: {id: req.params.id}})

            if(contrato){
                await Contratos.update(contratos, {where: {id: req.params.id}})
                return res.status(200).json({message: "Contrato atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Contrato não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let contrato = await Contratos.findOne({where: {id: req.params.id}})

            if(contrato){
                await Contratos.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Contrato deletado com sucesso !"})
            }else{
                return res.status(400).json({message: "Contrato não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async registrar(req, res){
        let motBaixa = {
            descricao: req.body.descricao
        }

        try {
                        
            let baixa = await MotivosBaixa.create(motBaixa)

            if(baixa){
                return res.status(200).json({message: "Baixa registrada com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar a baixa"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        
        if(req.params.id){
            let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}})
            return res.json({baixa: baixa})
            
        }else{
            let baixas = await MotivosBaixa.findAll({raw: true})
            return res.json({baixas: baixas})
        }
    }

    static async editar(req, res ){
        let motBaixa = {
            descricao: req.body.descricao
        }

        try {
           let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}}) 

           if(baixa){
            await MotivosBaixa.update(motBaixa, {where: {id:req.params.id}})
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
            
            let baixa = await MotivosBaixa.findOne({where: {id: req.params.id}})

            if(baixa){
                await MotivosBaixa.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Baixa deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Baixa não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    
    static async registrar(req, res){
        let precos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc
        }

        try {
          
           let preco = await PrecosProc.create(precos)

           if(preco){
            return res.status(200).json({message: "Preço registrado com sucesso !"})
           }else{
            return res.status(400).json({message: "Não foi possivel registrar o Preço"})
           }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){
        try {
            
            
            if(req.params.id){
                let preco = await PrecosProc.findOne({where: {id: req.params.id}})
                return res.json({preco: preco})
            }else{
                let precos = await PrecosProc.findAll({raw: true})
                return res.json({precos:precos})
                
         }

        } catch (error) {
            console.log(error)
        }
    }

    static async editar(req, res){
        let precos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc
        }

        try {
            
            let preco = await PrecosProc.findOne({where: {id: req.params.id}})

            if(preco){
                await PrecosProc.update(precos, {where: {id: req.params.id}})
                return res.status(200).json({message: "Preço atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Preço não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async deletar(req, res){

        try {
           
            let preco = await PrecosProc.findOne({where: {id: req.params.id}})

            if(preco){
               await PrecosProc.destroy({where: {id: req.params.id}})
               return res.json({message: "Preço deletado com sucesso !"})
            }else{
                return res.json({message: "Preço não encontrado !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

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

    static async registrar(req, res){

        let ocorrencias = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
        }

        try {
            
            let ocorrencia = await RegOcorrencias.create(ocorrencias)

            if(ocorrencia){
                return res.status(200).json({message: "Ocorrencia registrada com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar a Ocorrencia !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res){

        try {

            
            if(req.params.id){
                let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})
                return res.json({ocorrencia: ocorrencia})
            }else{                
                let ocorrencias = await RegOcorrencias.findAll({raw: true})
                return res.json({ocorrencias: ocorrencias})
            }

        } catch (error) {
            console.log(error)
        }

    }

    

    static async editar(req, res){

        let ocorrencias = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
        }

        try {

            let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})

            if(ocorrencia){
                await RegOcorrencias.update(ocorrencias, {where: {id: req.params.id}})
                return res.status(200).json({message: "Ocorrencia atualizada com sucesso !"})
            }else{
                return res.status(400).json({message: "Ocorrencia não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }

    }

    static async deletar(req, res){
        try {
            
            let ocorrencia = await RegOcorrencias.findOne({where: {id: req.params.id}})

            if(ocorrencia){
                await RegOcorrencias.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Ocorrencia deletada com sucesso !"})
            }else{
                return res.status(400).json({message: "Ocorrencia não encontrada !"})
            }

        } catch (error) {
            console.log(error)
        }
    }

    static async registrar(req, res){

        let avulsos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
    
        }
    
        try {
    
            let avulso = await RegProcAutAvulsos.create(avulsos)
    
            if(avulso){
                return res.status(200).json({message: "Registro realizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Não foi possivel registrar"})
            }
    
        } catch (error) {
            console.log(error)
        }
    
       }
    
       static async lista(req, res){
    
        try {
            
            let avulsos = await RegProcAutAvulsos.findAll({raw: true})
    
            if(avulsos){
                return res.json({avulsos: avulsos})
            }
    
        } catch (error) {
            console.log(error)
        }
    
       }
    
       static async editar(req, res){
    
        let avulsos = {
            id_usuario: req.body.id_usuario,
            id_cliente: req.body.id_cliente,
            id_contrato: req.body.id_contrato,
            id_proc: req.body.id_proc,
            id_admissao: req.body.id_admissao,
        }
    
        try {
           
            let avulso = await RegProcAutAvulsos.findOne({where: {id: req.params.id}})
    
            if(avulso){
                await RegProcAutAvulsos.update(avulsos, {where: {id: req.params.id}})
                return res.status(200).json({message: "Registro atualizado com sucesso !"})
            }else{
                return res.status(400).json({message: "Registro não encontrado !"})
            }
    
        } catch (error) {
            console.log(error)
        }
       }
    
       static async deletar(req, res){
    
        try {
            
            let avulso = await RegProcAutAvulsos.findOne({where: {id: req.params.id}})
    
            if(avulso){
                await RegProcAutAvulsos.destroy({where: {id: req.params.id}})
                return res.status(200).json({message: "Registro deletado com sucesso !"})
            }else{
                return res.status(400).json({message: "Registro não encontrado !"})
            }
    
        } catch (error) {
            console.log(error)
        }
    
       }

    //    static async registrar(req, res) {
    //     let vias = {
    //         descricao: req.body.descricao
    //     }

    //     try {

    //         let registrar = await ViasAdmissao.create(vias)

    //         if (registrar) {
    //             return res.status(200).json({ message: "Via registrada com sucesso !" })
    //         } else {
    //             return res.status(400).json({ message: "Não foi possivel registrar a Via !" })
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

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