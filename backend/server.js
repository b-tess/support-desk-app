import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()
import e from 'express'
import 'express-async-errors'
import 'colors'
import dbConnect from './dbConnect/dbConnect.js'
import homeRouter from './routes/homeRouter.js'
import usersRouter from './routes/usersRouter.js'
import ticketsRouter from './routes/ticketsRouter.js'
import errorLog from './middleware/errorLog.js'

const PORT = process.env.PORT || 3000

const app = e()

app.use(e.json())
app.use('/api/users', usersRouter)
app.use('/api/tickets', ticketsRouter)

//Serve the frontend
if (process.env.NODE_ENV === 'production') {
    //Set build folder as static
    app.use(e.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    })
} else {
    app.use('/', homeRouter)
}

app.use(errorLog)

//Connect to database before listening
dbConnect().then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
})
