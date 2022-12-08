const express = require('express')
const router = express.Router()

const CanisController = require('../controller/canisController')

router.get('/registrar', CanisController.registrar)
router.post('/registrar', CanisController.registrarP)
router.get('/lista/:id?', CanisController.lista)
router.get('/editar/:id', CanisController.editar)
router.post('/editar/:id', CanisController.editarP)
router.get('/deletar/:id', CanisController.deletar)

module.exports = router