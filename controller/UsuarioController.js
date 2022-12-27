const Usuario = require('../models/Usuario')
const bcryptjs = require("bcryptjs")
const passport = require('passport')

module.exports = class UsuarioController {


    static async home(req, res) {
        res.render('usuarios/home')
    }

    static async login(req, res) {
        res.render('usuarios/login')
    }

    static async loginPost(req, res, next) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res, next);
    }

    static registrar(req, res) {
        res.render('usuarios/registrar')
    }

    static async registrarPost(req, res) {

        var { nome, email, senha, confsenha, perfilSolicitante, perfilEntregador, perfilAdmin } = req.body

        if (senha !== confsenha) {
            res.status(400).json({ message: "As senhas não conferem !" })
            return
        }

        if (senha.length < 6) {
            res.status(401).json({ message: "Senha muito fraca !" })
            return
        }

        var checkUsuario = await Usuario.findOne({ where: { email: email } })

        if (checkUsuario) {
            res.status(400).json({ message: "O E-mail já está em uso !" })
            return
        }

        var salt = bcryptjs.genSaltSync(10)
        var hashedPassword = bcryptjs.hashSync(senha, salt)

        var usuario = {
            nome,
            email,
            senha: hashedPassword,
            perfilSolicitante,
            perfilEntregador,
            perfilAdmin
        }


        try {
            await Usuario.create(usuario)
            res.status(200).json({ message: "Cadastro realizado com sucesso !" })
            return
        } catch (error) {
            console.log(error)
        }

    }

    static async listaUsuarios(req, res) {

        var permissoes = {
            perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
            perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, nome: res.locals.user.nome
        }

        try {

            let usuarios = await Usuario.findAll({ raw: true })

            res.render('usuarios/listausuarios', { usuarios: usuarios, permissoes: permissoes })
        } catch (error) {
            console.log(error)
        }
    }

    static async editarUsuario(req, res) {
        var usuario = await Usuario.findOne({
            where: { id: req.params.id },
            raw: true
        })
        res.render("usuarios/editarusuario", { usuario: usuario })
    }

    static async usuario(req, res) {
        let usuario = await Usuario.findOne({ where: { id: req.params.id } })
        return res.json({ usuario: usuario })
    }

    static async editarUsuarioPost(req, res) {
        var { nome, email, perfilSolicitante, perfilEntregador, perfilAdmin } = req.body

        var usuario = {
            nome, email, perfilSolicitante,
            perfilEntregador, perfilAdmin
        }

        try {
            await Usuario.update(usuario, { where: { id: req.params.id } })
            res.status(200).json({ message: "Usuário atualizado com sucesso !" })
        } catch (error) {
            console.log(error)
        }

    }

    static async editarSenha(req, res) {
        var usuario = await Usuario.findOne({
            where: { id: req.params.id },
            raw: true
        })
        res.render('usuarios/editarsenha', { usuario: usuario })
    }

    static async editarSenhaPost(req, res) {
        var { senha, confsenha } = req.body

        if (senha !== confsenha) {
            return res.status(400).json({ message: "As senhas não conferem, tente novamente !" })
        }

        if (senha < 6) {
            return res.status(411).json({ message: "Senha muito fraca !" })
        }

        var salt = bcryptjs.genSaltSync(10)
        var hashedPassword = bcryptjs.hashSync(senha, salt)

        var usuario = {
            senha: hashedPassword
        }

        try {
            await Usuario.update(usuario, { where: { id: req.params.id } })
            res.status(200).json({ message: "Senha atualizadaa com sucesso !" })
        } catch (error) {
            console.log(error)
        }

    }

    static logout(req, res) {
        req.logout(req.user, (err) => {
            req.flash("success_msg", "Deslogado com sucesso !")
            res.redirect("/login")
        })
    }

    static async deletarusuario(req, res) {
        try {

            let usuario = Usuario.findOne({ where: { id: req.params.id } })

            if (usuario) {
                await Usuario.destroy({ where: { id: req.params.id } })
                req.flash("succes_msg", "Usuário apagado com sucesso !")
                res.redirect('/listausuarios')
            } else {
                req.flash("error_msg", "Usuário não encontrado")
            }
        } catch (error) {

            console.log(error)
        }
    }

}