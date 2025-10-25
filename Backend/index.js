const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config({ path: "./.env.local" });



connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

//  Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/status',require('./routes/status'))

app.get('/', (res, req) => {
  res.send({
    activestatus: true,
    error: false,
  })
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`)
})
