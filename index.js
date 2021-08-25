import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import snacksRouter from './routes/snacks.js'

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("Connected to the database"))

const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use('/snacks', snacksRouter)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
