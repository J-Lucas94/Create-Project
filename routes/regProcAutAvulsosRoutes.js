const express = require('express')
const router = express.Router()

const RegProcAutAvulsosController = require('../controller/regProcAutAvulsosController')

router.post('/registrar', RegProcAutAvulsosController.registrar)
router.get('/lista', RegProcAutAvulsosController.lista)
router.post('/editar/:id', RegProcAutAvulsosController.editar)
router.get('/deletar/:id', RegProcAutAvulsosController.deletar)

module.exports = router