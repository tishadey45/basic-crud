const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Basic CRUD server is running')
})

app.listen(port, () => {
  console.log(`Basic CRUD app listening on port ${port}`)
})
