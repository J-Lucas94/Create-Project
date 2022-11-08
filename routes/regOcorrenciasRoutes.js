const express = require('express')
const router = express.Router()

const regOcorrenciasController = require('../controller/regOcorrenciasController')

router.post('/registrar', regOcorrenciasController.registrar)
router.get('/lista/:id?', regOcorrenciasController.lista)
router.post('/editar/:id', regOcorrenciasController.editar)
router.get('/deletar/:id', regOcorrenciasController.deletar)

module.exports = router