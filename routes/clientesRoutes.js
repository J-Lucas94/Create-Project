const express = require('express')
const router = express.Router()

const ClientesController = require('../controller/clientesController')

router.post('/registrar', ClientesController.registrar)
router.get('/lista/:id?', ClientesController.lista)
router.post('/editar/:id', ClientesController.editar)
router.get('/deletar/:id', ClientesController.deletar)

module.exports = router