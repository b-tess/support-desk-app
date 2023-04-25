import e from 'express'
import { registerUser, loginUser } from '../controllers/usersController.js'

const userRouter = e.Router()

userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)

export default userRouter
