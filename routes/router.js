const { Router } = require('express')
const express = require('express')
const { eAdmin } = require('../helpers/eAdmin')
const router = express.Router()

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
const Usuarios = require('../models/Usuario')
const db = require('../db/db')
const Sequelize = require('sequelize')


router.get('/admissoes', async (req, res) => {

    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })
    let contratos = await Contratos.findAll({ raw: true })
    let chips = await Banco.Chips.findAll({ raw: true })
    let canis = await Banco.Canis.findAll({ raw: true })
    let vias = await Banco.ViasAdmissao.findAll({ raw: true })

    res.render('admissoes/admissoes', {
        clientes, clientes, usuarios: usuarios, contratos: contratos,
        chips: chips, canis: canis, vias: vias
    })

})

router.post('/registraradmissoes', async (req, res) => {

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

        if (admissao) {
            return res.status(200).json({ message: "Admissão registrada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar a Admissão" })
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/listaadmissoes', async (req, res) => {
    try {

        let admissoes = await Admissoes.findAll({ raw: true })
        return res.render('admissoes/lista', { admissoes: admissoes })
    } catch (error) {
        console.log(error)
    }
})

router.get('/admissao/:id', async (req, res) => {
    try {
        let admissao = await Admissoes.findOne({ where: { id: req.params.id } })
        return res.json({ admissao: admissao })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editaradmissao/:id', async (req, res) => {

    try {
        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
        let clientes = await Banco.Clientes.findAll({ raw: true })
        let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
        let usuarios = await Usuarios.findAll({ raw: true })
        let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })
        let contratos = await Contratos.findAll({ raw: true })
        let chip = await Banco.Chips.findOne({ where: { id: req.params.id }, raw: true })
        let chips = await Banco.Chips.findAll({ raw: true })
        let canil = await Banco.Canis.findOne({ where: { id: req.params.id }, raw: true })
        let canis = await Banco.Canis.findAll({ raw: true })
        let via = await Banco.ViasAdmissao.findOne({ where: { id: req.params.id }, raw: true })
        let vias = await Banco.ViasAdmissao.findAll({ raw: true })
        let admissao = await Admissoes.findOne({ where: { id: req.params.id }, raw: true })

        res.render('admissoes/editar', {
            admissao: admissao, cliente: cliente, clientes: clientes, usuario: usuario,
            usuarios: usuarios, contrato: contrato, contratos: contratos, chip: chip, chips: chips,
            canil: canil, canis: canis, via: via, vias: vias
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/editaradmissao/:id', async (req, res) => {
    let admissoes = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_chip: req.body.id_chip,
        id_canil: req.body.id_canil,
        id_via: req.body.id_via
    }

    try {
        let admissao = await Admissoes.findOne({ where: { id: req.params.id } })

        if (admissao) {
            await Admissoes.update(admissoes, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Admissão atualizada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Admissão não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/deletaradmissao/:id', async (req, res) => {
    try {

        let admissao = await Admissoes.findOne({ where: { id: req.params.id } })

        if (admissao) {
            await Admissoes.destroy({ where: { id: req.params.id } })
            req.flash('success_msg', "Admissão apagada com sucesso !")
            return res.redirect('/canil/listaadmissoes')
        } else {
            return res.status(400).json({ message: "Admissão não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})


// ######## AGENDA DE PROCEDIMENTO #########//

router.get('/agendas', async (req, res)=>{
    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })
    let contratos = await Contratos.findAll({ raw: true })
    let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
    let admissoes = await Admissoes.findAll({ raw: true })

    res.render('agenda/agenda', {
        clientes, clientes, usuarios: usuarios, contratos: contratos,
        procedimentos: procedimentos, admissoes: admissoes
    })
})

    router.post('/registraragenda', async(req, res)=>{

    let agendas = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }

    try {

        let agenda = await AgendaProc.create(agendas)

        if (agenda) {
            return res.status(200).json({ message: "Agenda registrada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar a Agenda !" })
        }

    } catch (error) {
        console.log(error)
    }
})

    router.get('/listaagenda', async(req, res)=> {

    try {
            let agendas = await AgendaProc.findAll({ raw: true })
            return res.render('agenda/lista', { agendas: agendas })
        

    } catch (error) {
        console.log(error)
    }
})

router.get('/agenda/:id', async(req, res)=>{
    try {
        let agenda = await AgendaProc.findOne({ where: { id: req.params.id } })
            return res.json({ agenda: agenda })
    } catch (error) {
        console.log(error)
    }
})

    router.get('/editaragenda/:id', async (req, res)=>{

        try {
            let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
            let clientes = await Banco.Clientes.findAll({ raw: true })
            let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
            let usuarios = await Usuarios.findAll({ raw: true })
            let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })
            let contratos = await Contratos.findAll({ raw: true })
            let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id }, raw: true })
            let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
            let admissao = await Admissoes.findOne({ where: { id: req.params.id }, raw: true })
            let admissoes = await Admissoes.findAll({ raw: true })
            let agenda = await AgendaProc.findOne({ where: { id: req.params.id }, raw: true })
    
            res.render('agenda/editar', {
                agenda: agenda, admissao: admissao, admissoes: admissoes,  cliente: cliente, clientes: clientes, usuario: usuario,
                usuarios: usuarios, contrato: contrato, contratos: contratos, procedimento: procedimento, procedimentos: procedimentos,
            })
        }catch(error){
                console.log(error)
            }

    })

    router.post('/editaragenda/:id', async (req, res)=>{

    let agendas = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }
    try {

        let agenda = await AgendaProc.findOne({ where: { id: req.params.id } })

        if (agenda) {
            await AgendaProc.update(agendas, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Agenda atualizada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Agenda não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }

})

    router.get('/deletaragenda/:id', async (req, res)=>{
    try {

        let agenda = await AgendaProc.findOne({ where: { id: req.params.id } })

        if (agenda) {
            await AgendaProc.destroy({ where: { id: req.params.id } })
            req.flash( "success_msg", "Agenda apagada com sucesso !" )
            return res.redirect('/canil/listaagenda')
        } else {
            return res.status(400).json({ message: "Agenda não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})

// ######## Baixa #########//

router.get('/baixas', async (req, res)=>{
    let usuarios = await Usuarios.findAll({ raw: true })
    let admissoes = await Admissoes.findAll({ raw: true })
    let motBaixas = await Banco.MotivosBaixa.findAll({ raw: true })

    res.render('baixa/baixa', {
        motBaixas, motBaixas, usuarios: usuarios, admissoes: admissoes
    })
})

    router.post('/registrarbaixa', async(req, res)=>{

    let baixas = {
        id_motBaixa: req.body.id_motBaixa,
        id_admissao: req.body.id_admissao,
    }

    try {

        let baixa = await Baixa.create(baixas)

        if (baixa) {
            return res.status(200).json({ message: "Baixa registrada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar a Ocorrencia !" })
        }

    } catch (error) {
        console.log(error)
    }
})

    router.get('/listabaixas', async(req, res)=> {

    try {
            let baixas = await Baixa.findAll({ raw: true })
            return res.render('baixa/lista', { baixas: baixas })
        

    } catch (error) {
        console.log(error)
    }
})

router.get('/baixa/:id', async(req, res)=>{
    try {
        let baixa = await Baixa.findOne({ where: { id: req.params.id } })
            return res.json({ baixa: baixa })
    } catch (error) {
        console.log(error)
    }
})

    router.get('/editarbaixa/:id', async (req, res)=>{

        try {
            let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
            let usuarios = await Usuarios.findAll({ raw: true })
            let motBaixa = await Banco.MotivosBaixa.findOne({ where: { id: req.params.id }, raw: true })
            let motBaixas = await Banco.MotivosBaixa.findAll({ raw: true })
            let admissao = await Admissoes.findOne({ where: { id: req.params.id }, raw: true })
            let admissoes = await Admissoes.findAll({ raw: true })
            let baixa = await Baixa.findOne({ where: { id: req.params.id }, raw: true })
    
            res.render('baixa/editar', {
                baixa: baixa, admissao: admissao, admissoes: admissoes, usuario: usuario,
                usuarios: usuarios, motBaixa, motBaixas
            })
        }catch(error){
                console.log(error)
            }

    })

    router.post('/editarbaixa/:id', async (req, res)=>{

    let baixas = {
        id_motBaixa: req.body.id_motBaixa,
        id_admissao: req.body.id_admissao,
    }
    try {

        let baixa = await Baixa.findOne({ where: { id: req.params.id } })

        if (baixa) {
            await Baixa.update(baixas, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Baixa atualizada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Baixa não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }

})

    router.get('/deletarbaixa/:id', async (req, res)=>{
    try {

        let baixa = await Baixa.findOne({ where: { id: req.params.id } })

        if (baixa) {
            await Baixa.destroy({ where: { id: req.params.id } })
            req.flash( "success_msg", "Baixa apagada com sucesso !" )
            return res.redirect('/canil/listabaixas')
        } else {
            return res.status(400).json({ message: "Baixa não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})

//###### CANIS ######//

router.get('/canis', (req, res) => {
    res.render('canis/canis')
})

router.post('/registrarcanis', async (req, res) => {
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
})

router.get('/listacanis', async (req, res) => {

    try {
        let canis = await Banco.Canis.findAll({ raw: true })
        return res.render('canis/lista', { canis: canis })
    } catch (error) {
        console.log(error)
    }
})


router.get('/canil/:id', async (req, res) => {

    try {
        let canil = await Banco.Canis.findOne({ where: { id: req.params.id }, raw: true })
        return res.json({ canil: canil })
    } catch (error) {
        console.log(error)
    }

})

router.get('/editarcanil/:id', async (req, res) => {

    let canil = await Banco.Canis.findOne({ where: { id: req.params.id }, raw: true })

    if (canil) {
        return res.render('canis/editar', { canil: canil })
    }

})

router.post('/editarcanil/:id', async (req, res) => {
    let canis = { nome: req.body.nome }

    try {
        let canil = await Banco.Canis.findOne({ where: { id: req.params.id } })

        if (canil) {
            await Banco.Canis.update(canis, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Canil Atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Canil não encontrado !" })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/deletarcanil/:id', async (req, res) => {

    try {

        let canil = await Banco.Canis.findOne({ where: { id: req.params.id } })

        if (canil) {

            let deletar = await Banco.Canis.destroy({ where: { id: req.params.id } })

            if (deletar) {
                req.flash("success_msg", "Canil apagado com sucesso !")
                return res.redirect('/canil/listacanis')
            } else {
                req.flash("error_msg", "Error: Não foi apagar o Canil !")
                return res.redirect('/canil/listacanis')
            }
        }
    } catch (error) {
        console.log(error)
    }
})

//###### CHIPS ######//

router.get('/chips', (req, res) => {
    res.render('chips/chips')
})

router.post('/registrarchip', async (req, res) => {

    try {

        let chips = {
            codigo: req.body.codigo,
            status: req.body.status
        }

        let chip = await Banco.Chips.create(chips)

        if (chip) {
            return res.status(200).json({ message: "Chip registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o Chip" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/listachips', async (req, res) => {
    try {
        let chips = await Banco.Chips.findAll({ raw: true })
        return res.render('chips/lista', { chips: chips })
    } catch (error) {
        console.log(error)
    }
})

router.get('/chip/:id', async (req, res) => {
    try {
        let chip = await Banco.Chips.findOne({ where: { id: req.params.id } })
        return res.json({ chip: chip })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarchip/:id', async (req, res) => {
    try {
        var chip = await Banco.Chips.findOne({ where: { id: req.params.id }, raw: true })
        return res.render('chips/editar', { chip: chip })
    } catch (error) {
        console.log(error)
    }
})

router.post('/editarchip/:id', async (req, res) => {
    let chips = {
        codigo: req.body.codigo,
        status: req.body.status
    }

    try {
        let chip = await Banco.Chips.findOne({ where: { id: req.params.id } })

        if (chip) {
            await Banco.Chips.update(chips, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Chip atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Chip não encontrado !" })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/deletarchip/:id', async (req, res) => {

    try {
        let chip = await Banco.Chips.findOne({ where: { id: req.params.id } })

        if (chip) {
            await Banco.Chips.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Chip apagado com sucesso !")
            return res.redirect('/canil/listachips')
        } else {
            return res.status(400).json({ message: "Chip não encontrado !" })
        }
    } catch (error) {
        console.log(error)
    }

})


//###### CLIENTES ######//


router.get('/clientes', (req, res) => {
    res.render('clientes/clientes')
})

router.post('/registrarcliente', async (req, res) => {
    try {

        let cliente = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            cep: req.body.cep,
            uf: req.body.uf,
            municipio: req.body.municipio,
            bairro: req.body.bairro,
            endereco: req.body.endereco
        }

        let clientes = await Banco.Clientes.create(cliente)

        if (clientes) {
            return res.status(200).json({ message: "Cliente registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o cliente !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/listaclientes', async (req, res) => {

    try {
        if (req.params.id) {
            let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id } })
            return res.render('clientes/lista', { cliente: cliente })
        } else {

            let clientes = await Banco.Clientes.findAll({ raw: true })
            return res.render('clientes/lista', { clientes: clientes })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/cliente/:id', async (req, res) => {
    try {
        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id } })
        return res.json({ cliente: cliente })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarcliente/:id', async (req, res) => {
    try {
        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
        res.render('clientes/editar', { cliente, cliente })

    } catch (error) {
        console.log(error)
    }
})

router.post('/editarcliente/:id', async (req, res) => {

    let clientes = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        cep: req.body.cep,
        uf: req.body.uf,
        municipio: req.body.municipio,
        bairro: req.body.bairro,
        endereco: req.body.endereco
    }

    try {

        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id } })

        if (cliente) {
            await Banco.Clientes.update(clientes, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Cliente atualizado com sucesso !" })

        } else {

            return res.status(400).json({ message: "Cliente não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})


router.get('/deletarcliente/:id', async (req, res) => {

    try {

        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id } })

        if (cliente) {
            await Banco.Clientes.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Cliente apagado com sucesso !")
            return res.redirect('/canil/listaclientes')
        }

    } catch (error) {
        console.log(error)
    }
})

//###### CONTRATOS ######//

router.get('/contratos', async (req, res) => {

    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })

    res.render('contratos/contratos', { clientes, clientes, usuarios: usuarios })

})

router.post('/registrarcontratos', async (req, res) => {
    let contratos = {
        id_cliente: req.body.id_cliente,
        id_usuario: req.body.id_usuario
    }

    try {
        let contrato = await Contratos.create(contratos)

        if (contrato) {
            return res.status(200).json({ message: "Contrato registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o Contrato !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/listacontratos', async (req, res) => {
    try {

        if (req.params.id) {
            let contrato = await Contratos.findOne({ where: { id: req.params.id } })
            return res.render('/contratos/lista', { contrato: contrato })

        } else {
            let contratos = await Contratos.findAll({ raw: true })
            return res.render('contratos/lista', { contratos: contratos })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/contrato/:id', async (req, res) => {
    try {
        let contrato = await Contratos.findOne({ where: { id: req.params.id } })
        return res.json({ contrato: contrato })
    } catch (error) {
        console.log(error)
    }
})


router.get('/editarcontrato/:id', async (req, res) => {
    try {
        let clientes = await Banco.Clientes.findAll({ raw: true })
        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
        let usuarios = await Usuarios.findAll({ raw: true })
        let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
        let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })

        return res.render('contratos/editar', { contrato: contrato, clientes: clientes, usuarios: usuarios, cliente, usuario })
    } catch (error) {
        console.log(error)
    }
    res.render('contratos/editar')
})

router.post('/editarcontrato/:id', async (req, res) => {

    let contratos = {
        id_cliente: req.body.id_cliente,
        id_usuario: req.body.id_usuario
    }

    try {
        let contrato = await Contratos.findOne({ where: { id: req.params.id } })

        if (contrato) {
            await Contratos.update(contratos, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Contrato atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Contrato não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/deletarcontrato/:id', async (req, res) => {
    try {

        let contrato = await Contratos.findOne({ where: { id: req.params.id } })

        if (contrato) {
            await Contratos.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Contrato apagado com sucesso !")
            res.redirect('/canil/listacontratos')
        } else {
            return res.status(400).json({ message: "Contrato não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})

//###### MOTIVOS BAIXA ######//

router.get('/motivos', (req, res) => {
    res.render('motivos/motivos')
})

router.post('/registrarmotivo', async (req, res) => {
    let motBaixa = {
        descricao: req.body.descricao
    }

    try {

        let baixa = await Banco.MotivosBaixa.create(motBaixa)

        if (baixa) {
            return res.status(200).json({ message: "Motivo de Baixa registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o Motivo" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/listamotivos', async (req, res) => {

    if (req.params.id) {
        

    } else {
        let motBaixas = await Banco.MotivosBaixa.findAll({ raw: true })
        return res.render('motivos/lista', { motBaixas: motBaixas })
    }
})

router.get('/motivo/:id', async (req, res)=>{
    try {
        let motBaixa = await Banco.MotivosBaixa.findOne({ where: { id: req.params.id } })
        return res.json({motBaixa: motBaixa})
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarmotivo/:id', async (req, res) => {
    try {

        let motBaixa = await Banco.MotivosBaixa.findOne({ where: { id: req.params.id }, raw: true })
        res.render('motivos/editar', { motBaixa: motBaixa })
    } catch (error) {
        console.log(error)
    }
})

router.post('/editarmotivo/:id', async (req, res) => {
    let motBaixa = {
        descricao: req.body.descricao
    }

    try {
        let baixa = await Banco.MotivosBaixa.findOne({ where: { id: req.params.id } })

        if (baixa) {
            await Banco.MotivosBaixa.update(motBaixa, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Motivo baixa atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Motivo baixa não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/deletarmotivo/:id', async (req, res) => {
    try {

        let baixa = await Banco.MotivosBaixa.findOne({ where: { id: req.params.id } })

        if (baixa) {
            await Banco.MotivosBaixa.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Motivo apagado com sucesso !")
            res.redirect('/canil/listamotivos')
        } else {
            return res.status(400).json({ message: "Baixa não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})

//###### PREÇO POR PROCEDIMENTO ######//

router.get('/precos', async (req, res) => {

    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })
    let contratos = await Contratos.findAll({ raw: true })
    let procedimentos = await Banco.Procedimentos.findAll({ raw: true })

    res.render('precos/precos', {
        clientes, clientes, usuarios: usuarios, contratos: contratos,
        procedimentos: procedimentos
    })
})

router.post('/registrarpreco', async (req, res) => {
    let precos = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc
    }

    try {

        let preco = await PrecosProc.create(precos)

        if (preco) {
            return res.status(200).json({ message: "Preço registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o Preço" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/listaprecos', async (req, res) => {
    try {

        if (req.params.id) {

        } else {
            let precos = await PrecosProc.findAll({ raw: true })
            return res.render('precos/lista', { precos: precos })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/preco:id', async (req, res) => {
    try {
        let preco = await PrecosProc.findOne({ where: { id: req.params.id } })
        return res.json({ preco: preco })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarpreco/:id', async (req, res) => {

    try {
        let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
        let clientes = await Banco.Clientes.findAll({ raw: true })
        let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
        let usuarios = await Usuarios.findAll({ raw: true })
        let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })
        let contratos = await Contratos.findAll({ raw: true })
        let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id }, raw: true })
        let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
        let preco = await PrecosProc.findOne({ where: { id: req.params.id }, raw: true })

        res.render('precos/editar', {
            preco: preco, cliente: cliente, clientes: clientes, usuario: usuario,
            usuarios: usuarios, contrato: contrato, contratos: contratos, procedimento: procedimento, procedimentos: procedimentos,
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/editarpreco/:id', async (req, res) => {
    let precos = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc
    }

    try {

        let preco = await PrecosProc.findOne({ where: { id: req.params.id } })

        if (preco) {
            await PrecosProc.update(precos, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Preço atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Preço não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})

    router.get('/deletarpreco/:id', async (req, res)=>{

    try {

        let preco = await PrecosProc.findOne({ where: { id: req.params.id } })

        if (preco) {
            await PrecosProc.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Preço apagado com sucesso !")
            return res.redirect('/canil/listaprecos')
        } else {
            return res.json({ message: "Preço não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }

})

//###### PROCEDIMENTOS ######//

router.get('/procedimentos', (req, res) => {
    res.render('procedimentos/procedimentos')
})

router.post('/registrarproc', async (req, res) => {

    let proc = {
        descricao: req.body.descricao
    }

    try {

        let procedimento = await Banco.Procedimentos.create(proc)

        if (procedimento) {
            return res.status(200).json({ message: "Procedimento registrado com sucesso !" })
        } else {
            return res.status(400).json({ messgae: "Não foi possivel registrar o procedimento ! " })
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/listaprocedimentos', async (req, res) => {

    try {
        let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
        return res.render('procedimentos/lista', { procedimentos: procedimentos })
    } catch (error) {
        console.log(error)
    }
})

router.get('/procedimento/:id', async (req, res) => {
    try {
        let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id } })
        return res.json({ procedimento: procedimento })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarproc/:id', async (req, res) => {
    try {
        let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id }, raw: true })
        res.render('procedimentos/editar', { procedimento: procedimento })
    } catch (error) {
        console.log(error)
    }


})

router.post('/editarproc/:id', async (req, res) => {

    let procedimentos = {
        descricao: req.body.descricao
    }

    try {

        let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id } })

        if (procedimento) {
            await Banco.Procedimentos.update(procedimentos, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Procedimento atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Procedimento não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/deletarproc/:id', async (req, res) => {
    try {

        let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id } })

        if (procedimento) {
            await Banco.Procedimentos.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Procedimento apagado com sucesso !")
            res.redirect('/canil/listaprocedimentos')
        } else {
            return res.status(400).json({ message: "Procedimento não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }
})

//###### REGISTRO DE OCORRENCIAS ######//

router.get('/ocorrencias', async (req, res)=>{
    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })
    let contratos = await Contratos.findAll({ raw: true })
    let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
    let admissoes = await Admissoes.findAll({ raw: true })

    res.render('ocorrencia/ocorrencia', {
        clientes, clientes, usuarios: usuarios, contratos: contratos,
        procedimentos: procedimentos, admissoes: admissoes
    })
})

    router.post('/registrarocorrencia', async(req, res)=>{

    let ocorrencias = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }

    try {

        let ocorrencia = await RegOcorrencias.create(ocorrencias)

        if (ocorrencia) {
            return res.status(200).json({ message: "Ocorrencia registrada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar a Ocorrencia !" })
        }

    } catch (error) {
        console.log(error)
    }
})

    router.get('/listaocorrencias', async(req, res)=> {

    try {
            let ocorrencias = await RegOcorrencias.findAll({ raw: true })
            return res.render('ocorrencia/lista', { ocorrencias: ocorrencias })
        

    } catch (error) {
        console.log(error)
    }
})

router.get('/ocorrencia/:id', async(req, res)=>{
    try {
        let ocorrencia = await RegOcorrencias.findOne({ where: { id: req.params.id } })
            return res.json({ ocorrencia: ocorrencia })
    } catch (error) {
        console.log(error)
    }
})

    router.get('/editarocorrencia/:id', async (req, res)=>{

        try {
            let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
            let clientes = await Banco.Clientes.findAll({ raw: true })
            let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
            let usuarios = await Usuarios.findAll({ raw: true })
            let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })
            let contratos = await Contratos.findAll({ raw: true })
            let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id }, raw: true })
            let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
            let admissao = await Admissoes.findOne({ where: { id: req.params.id }, raw: true })
            let admissoes = await Admissoes.findAll({ raw: true })
            let ocorrencia = await RegOcorrencias.findOne({ where: { id: req.params.id }, raw: true })
    
            res.render('ocorrencia/editar', {
                ocorrencia: ocorrencia, admissao: admissao, admissoes: admissoes,  cliente: cliente, clientes: clientes, usuario: usuario,
                usuarios: usuarios, contrato: contrato, contratos: contratos, procedimento: procedimento, procedimentos: procedimentos,
            })
        }catch(error){
                console.log(error)
            }

    })

    router.post('/editarocorrencia/:id', async (req, res)=>{

    let ocorrencias = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }
    try {

        let ocorrencia = await RegOcorrencias.findOne({ where: { id: req.params.id } })

        if (ocorrencia) {
            await RegOcorrencias.update(ocorrencias, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Ocorrencia atualizada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Ocorrencia não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }

})

    router.get('/deletarocorrencia/:id', async (req, res)=>{
    try {

        let ocorrencia = await RegOcorrencias.findOne({ where: { id: req.params.id } })

        if (ocorrencia) {
            await RegOcorrencias.destroy({ where: { id: req.params.id } })
            req.flash( "success_msg", "Ocorrência apagada com sucesso !" )
            return res.redirect('/canil/listaocorrencias')
        } else {
            return res.status(400).json({ message: "Ocorrencia não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})



//###### REGISTRO DE PROCEDIMENTO AUTOMATICOS OU AVULSOS ######//

router.get('/procAut', async (req, res)=>{
    let clientes = await Banco.Clientes.findAll({ raw: true })
    let usuarios = await Usuarios.findAll({ raw: true })
    let contratos = await Contratos.findAll({ raw: true })
    let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
    let admissoes = await Admissoes.findAll({ raw: true })

    res.render('procAut/procAut', {
        clientes, clientes, usuarios: usuarios, contratos: contratos,
        procedimentos: procedimentos, admissoes: admissoes
    })
})

    router.post('/registrarprocAut', async(req, res)=>{

    let procAuts = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }

    try {

        let ocorrencia = await RegProcAutAvulsos.create(procAuts)

        if (ocorrencia) {
            return res.status(200).json({ message: "Procedimento registrado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar o Procedimento !" })
        }

    } catch (error) {
        console.log(error)
    }
})

    router.get('/listaprocAut', async(req, res)=> {

    try {
            let procAuts = await RegProcAutAvulsos.findAll({ raw: true })
            return res.render('procAut/lista', { procAuts: procAuts })
        

    } catch (error) {
        console.log(error)
    }
})

router.get('/procAut/:id', async(req, res)=>{
    try {
        let procAut = await RegProcAutAvulsos.findOne({ where: { id: req.params.id } })
            return res.json({ procAut: procAut })
    } catch (error) {
        console.log(error)
    }
})

    router.get('/editarprocAut/:id', async (req, res)=>{

        try {
            let cliente = await Banco.Clientes.findOne({ where: { id: req.params.id }, raw: true })
            let clientes = await Banco.Clientes.findAll({ raw: true })
            let usuario = await Usuarios.findAll({ where: { id: req.params.id }, raw: true })
            let usuarios = await Usuarios.findAll({ raw: true })
            let contrato = await Contratos.findOne({ where: { id: req.params.id }, raw: true })
            let contratos = await Contratos.findAll({ raw: true })
            let procedimento = await Banco.Procedimentos.findOne({ where: { id: req.params.id }, raw: true })
            let procedimentos = await Banco.Procedimentos.findAll({ raw: true })
            let admissao = await Admissoes.findOne({ where: { id: req.params.id }, raw: true })
            let admissoes = await Admissoes.findAll({ raw: true })
            let procAut = await RegProcAutAvulsos.findOne({ where: { id: req.params.id }, raw: true })
    
            res.render('procAut/editar', {
                procAut: procAut, admissao: admissao, admissoes: admissoes,  cliente: cliente, clientes: clientes, usuario: usuario,
                usuarios: usuarios, contrato: contrato, contratos: contratos, procedimento: procedimento, procedimentos: procedimentos,
            })
        }catch(error){
                console.log(error)
            }

    })

    router.post('/editarprocAut/:id', async (req, res)=>{

    let procAuts = {
        id_usuario: req.body.id_usuario,
        id_cliente: req.body.id_cliente,
        id_contrato: req.body.id_contrato,
        id_proc: req.body.id_proc,
        id_admissao: req.body.id_admissao,
    }
    try {

        let procAut = await RegProcAutAvulsos.findOne({ where: { id: req.params.id } })

        if (procAut) {
            await RegProcAutAvulsos.update(procAuts, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Procedimento atualizado com sucesso !" })
        } else {
            return res.status(400).json({ message: "Procedimento não encontrado !" })
        }

    } catch (error) {
        console.log(error)
    }

})

    router.get('/deletarprocAut/:id', async (req, res)=>{
    try {

        let procAut = await RegProcAutAvulsos.findOne({ where: { id: req.params.id } })

        if (procAut) {
            await RegProcAutAvulsos.destroy({ where: { id: req.params.id } })
            req.flash( "success_msg", "Procedimento apagado com sucesso !" )
            return res.redirect('/canil/listaprocAut')
        } else {
            return res.status(400).json({ message: "Ocorrencia não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})



//###### VIAS DE ADMISSÃO ######//

router.get('/vias', (req, res) => {
    res.render('vias/vias')
})

router.post('/registrarvia', async (req, res) => {
    let vias = {
        descricao: req.body.descricao
    }

    try {

        let registrar = await Banco.ViasAdmissao.create(vias)

        if (registrar) {
            return res.status(200).json({ message: "Via registrada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Não foi possivel registrar a Via !" })
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/listavias', async (req, res) => {

    try {
        let vias = await Banco.ViasAdmissao.findAll({ raw: true })
        return res.render('vias/lista', { vias: vias })
    } catch (error) {
        console.log(error)
    }
})

router.get('/via/:id', async (req, res) => {
    try {
        let via = await Banco.ViasAdmissao.findOne({ where: { id: req.params.id } })
        return res.json({ via: via })
    } catch (error) {
        console.log(error)
    }
})

router.get('/editarvia/:id', async (req, res) => {
    try {
        let via = await Banco.ViasAdmissao.findOne({ where: { id: req.params.id }, raw: true })
        return res.render('vias/editar', { via: via })

    } catch (error) {
        console.log(error)
    }
})

router.post('/editarvia/:id', async (req, res) => {
    let vias = {
        descricao: req.body.descricao
    }

    try {
        let via = await Banco.ViasAdmissao.findOne({ where: { id: req.params.id } })

        if (via) {
            await Banco.ViasAdmissao.update(vias, { where: { id: req.params.id } })
            return res.status(200).json({ message: "Via atualizada com sucesso !" })
        } else {
            return res.status(400).json({ message: "Via não encontrada" })
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/deletarvia/:id', async (req, res) => {
    try {

        let via = await Banco.ViasAdmissao.findOne({ where: { id: req.params.id } })

        if (via) {
            await Banco.ViasAdmissao.destroy({ where: { id: req.params.id } })
            req.flash("success_msg", "Via apagada com sucesso !")
            res.redirect('/canil/listavias')
        } else {
            return res.status(400).json({ message: "Via não encontrada !" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/query',async(req,res)=>{
    var admissao = await db.query(`
    SELECT Con.id id_contrato,Con.id_cliente,Cli.nome nome_cliente,Adm.createdAt criado_em,Chi.codigo codigo_chip
    FROM Contratos Con
        INNER JOIN Admissoes Adm on Adm.id_contrato=Con.id
        INNER JOIN Chips Chi on Chi.id=Adm.id_chip
        INNER JOIN Clientes Cli on Cli.id=Con.id_cliente
    --WHERE Con.id="7"
    `,{type:Sequelize.QueryTypes.SELECT})

    res.json({admissao:admissao})
})

module.exports = router