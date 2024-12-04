import express from 'express'
import { getUser, login, signup } from '../controllers/userController'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/:id', getUser)

module.exports = router;