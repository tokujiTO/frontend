// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()
app.use(express.json())

//GET http://localhost:3000/
app.get('/hey', (req, res) => {
  res.send('hey')
})

app.listen(3000, () => console.log('Server is running on port 3000'))
