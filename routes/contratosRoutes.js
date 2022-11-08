const express = require('express')
const router = express.Router()

const contratosController = require('../controller/contratosController')

router.post('/registrar', contratosController.registrar)
router.get('/lista/:id?', contratosController.lista)
router.post('/editar/:id', contratosController.editar)
router.get('/deletar/:id', contratosController.deletar)

module.exports = router
