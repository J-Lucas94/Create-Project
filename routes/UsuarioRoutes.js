const express = require('express')
const router = express.Router()

const UsuarioController = require('../controller/UsuarioController')
const { eAdmin } = require('../helpers/eAdmin')


router.get('/', UsuarioController.home)
router.get('/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)
router.post('/login', UsuarioController.loginPost)
router.get('/registrar', UsuarioController.registrar)
router.post('/registrar', UsuarioController.registrarPost)
router.get('/listausuarios', UsuarioController.listaUsuarios)
router.get('/editar/:id', UsuarioController.editarSenha)
router.post('/editar/:id', UsuarioController.editarSenhaPost)
router.get('/editarusuario/:id', UsuarioController.editarUsuario)
router.post('/editarusuario/:id', UsuarioController.editarUsuarioPost)
router.get('/deletar/:id', UsuarioController.deletarusuario)
router.get('/usuario/:id', UsuarioController.usuario)
module.exports = router

