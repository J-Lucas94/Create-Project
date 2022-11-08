const express = require('express')
const router = express.Router()

const PermissoesFuncController = require('../controller/PermissoesFuncController')

router.post('/registrar', PermissoesFuncController.registrar)
router.get('/deletar/:id', PermissoesFuncController.deletar)

module.exports = router