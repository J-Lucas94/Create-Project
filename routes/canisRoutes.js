const express = require('express')
const router = express.Router()

const CanisController = require('../controller/canisController')

router.post('/registrar', CanisController.registrar)
router.get('/lista/:id?', CanisController.lista)
router.post('/editar/:id', CanisController.editar)
router.get('/deletar/:id', CanisController.deletar)

module.exports = router