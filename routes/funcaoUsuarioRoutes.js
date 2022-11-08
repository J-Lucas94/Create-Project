const express = require('express')
const router = express.Router()

const FuncaoUsuarioController = require('../controller/funcaoUsuarioController')

router.post('/registrar', FuncaoUsuarioController.registrar)
router.get('/deletar/:id', FuncaoUsuarioController.deletar)

module.exports = router