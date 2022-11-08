const express = require('express')
const router = express.Router()

const motBaixaController = require('../controller/motBaixaController')


router.post('/registrar', motBaixaController.registrar)
router.post('/editar/:id', motBaixaController.editar)
router.get('/deletar/:id', motBaixaController.deletar)
router.get('/lista/:id?', motBaixaController.lista)

module.exports = router