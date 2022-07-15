const { Router } = require('express')
const userController = require('../controllers/user')
const petController = require('../controllers/pet')

const router = Router()

router.get('/user', userController.findUsers)
router.post('/user', userController.createUser)
router.post('/pet', petController.createPet)
router.post('/pet/sell', petController.sellPet)

module.exports = router