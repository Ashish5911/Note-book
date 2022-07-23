const connectTomongoose = require('./db');
const express = require('express');

connectTomongoose();
const app = express()
const port = 4000

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello mongo from Ashish!')
// })
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`)
})