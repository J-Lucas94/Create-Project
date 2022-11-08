const express = require('express')
const router = express.Router()

const AgendaController = require('../controller/agendaProcController')

router.post('/registrar', AgendaController.registrar)
router.get('/lista/:id?', AgendaController.lista)
router.post('/editar/:id', AgendaController.editar)
router.get('/deletar/:id', AgendaController.deletar)

module.exports = router