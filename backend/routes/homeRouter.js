import e from 'express'

const homeRouter = e.Router()

homeRouter.get('/', (req, res) => {
    //res.status(200).json({})
    res.json({ message: 'Welcome to our customer query service.' })
})

export default homeRouter
