const express = require('express')
const router = express.Router()

const ViaController = require('../controller/viasController')

router.post('/registrar', ViaController.registrar)
router.post('/editar/:id', ViaController.editar)
router.get('/deletar/:id', ViaController.deletar)
router.get('/lista/:id?', ViaController.lista)

module.exports = router