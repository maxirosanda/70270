import express from 'express'
import usersRouter from './src/routes/usersRouter.js'

const app = express()
app.use(express.json())
app.use('/api/users', usersRouter)
app.listen(8080,() => {
  console.log('Server is running on port 8080')
})


