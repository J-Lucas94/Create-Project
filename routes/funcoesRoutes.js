const express = require('express')
const router = express.Router()

const RolesController = require('../controller/FuncoesController')

router.post('/registrar', RolesController.registrar)
router.get('/deletar/:id', RolesController.deletar)

module.exports = router