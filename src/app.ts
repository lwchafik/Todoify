import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use("/tasks", require('./routes/tasksRoute'))
app.use('/users', require('./routes/userRoute'))

// starting server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})