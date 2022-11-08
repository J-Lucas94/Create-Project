const express = require('express')
const router = express.Router()

const precosController = require('../controller/precosController')

router.post('/registrar', precosController.registrar)
router.get('/lista/:id?', precosController.lista)
router.post('/editar/:id', precosController.editar)
router.get('/deletar/:id', precosController.deletar)

module.exports = router