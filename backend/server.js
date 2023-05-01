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

//Connect to database
dbConnect()

const app = e()

app.use(e.json())
app.use('/', homeRouter)
app.use('/api/users', usersRouter)
app.use('/api/tickets', ticketsRouter)
app.use(errorLog)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
