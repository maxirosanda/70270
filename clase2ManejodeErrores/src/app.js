import express from 'express'
import usersRouter from './routes/users.js'
import errorHandle from './middlewares/errors.js'

const app = express()

app.use(express.json())
app.use('/users', usersRouter)
app.use(errorHandle)
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })

