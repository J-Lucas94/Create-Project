const express = require('express')
const router = express.Router()

const PermissoesController = require('../controller/PermissoesController')

router.post('/registrar', PermissoesController.registrar)
router.get('/deletar/:id', PermissoesController.deletar)

module.exports = router