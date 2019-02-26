let bodyParser = require('body-parser')
let express = require('express')
let fs = require('fs')
let executor = require('./executor')
let cors = require('cors')

const app = express()
const port = process.env.PORT || 3000


app.use(cors());
app.use(bodyParser.json());

app.post('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (!req.body.code || !req.body.timeoutMs || !req.body.language) {
    res.status(400)
    res.end(JSON.stringify({
      error: 'no code, timeout or language specified'
    }))
  } else {
    res.status(200)
    executor.execute(req.body.code, req.body.language, req.body.stdin, req.body.timeoutMs,
      (result) => {
		    res.end(JSON.stringify(result));
      }
    )
  }
})

app.listen(port, function () {
	console.log('Container service running on port ' + port)
})
