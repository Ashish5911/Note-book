
// import * as dotenv from 'dotenv'
// dotenv.config()
require('dotenv').config()
const express = require('express');
const connectTomongoose = require('./db');
var cors = require('cors') 

connectTomongoose();
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello mongo from Ashish!')
// })
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`)
})