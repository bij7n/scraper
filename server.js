var ogs = require('open-graph-scraper')
var express = require('express')
var app = express()

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.get('/', function (req, res) {
  if (req.query['url']) {
    var siteUrl = req.query['url']
    var options = {
      'url': siteUrl,
      'headers': {
        'accept-language': 'en',
      },
      'timeout': 4000,
    }

    ogs(options, function (err, results, response) {
      if (results.err) {
        res.json(results.err)
      } else {
        res.json(results)
        res.end()
      }
    })
  } else {
    res.json('hi')
  }
})

var port = process.env.PORT || 5000
app.listen(port)

console.log('Express server listening on port %d', port)
