const express = require('express')
const router = express.Router()

const AdmissoesController = require('../controller/AdmissoesController')

router.post('/registrar', AdmissoesController.registrar)
router.get('/lista/:id?', AdmissoesController.lista)
router.post('/editar/:id', AdmissoesController.editar)
router.get('/deletar/:id', AdmissoesController.deletar)

module.exports = router