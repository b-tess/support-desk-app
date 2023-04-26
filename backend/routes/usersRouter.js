import e from 'express'
import {
    registerUser,
    loginUser,
    getCurrentUser,
} from '../controllers/usersController.js'
import authorized from '../middleware/authorized.js'

const userRouter = e.Router()

userRouter.post('/', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', authorized, getCurrentUser)

export default userRouter
