const express = require('express')
const router = express.Router()

const ChipsController = require('../controller/chipsController')

router.post('/registrar', ChipsController.registrar)
router.post('/editar/:id', ChipsController.editar)
router.get('/deletar/:id', ChipsController.deletar)
router.get('/lista/:id?', ChipsController.lista)

module.exports = router