const express = require('express')
const router = express.Router()

const ProcController = require('../controller/ProcController')

router.post('/registrar', ProcController.registrar)
router.post('/editar/:id', ProcController.editar)
router.get('/deletar/:id', ProcController.deletar)
router.get('/lista/:id?', ProcController.lista)

module.exports = router