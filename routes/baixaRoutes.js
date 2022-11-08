const express = require('express')
const router = express.Router()

const baixaController = require('../controller/baixaController')

router.post('/registrar', baixaController.registrar)
router.get('/lista/:id?', baixaController.lista)
router.post('/editar/:id', baixaController.editar)
router.get('/deletar/:id', baixaController.deletar)

module.exports = router