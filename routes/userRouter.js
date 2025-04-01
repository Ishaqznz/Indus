const exp = require('constants')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const referralController = require('../controllers/referralController')
const taskController = require('../controllers/taskController')

const auth = require('../middlewares/userAuth')

router.get('/', auth.userAuth, referralController.checkReferral, userController.loadHome)
router.put('/join-twitter', taskController.joinTwitter)
router.put('/join-telegram', taskController.joinTelegam)

module.exports = router