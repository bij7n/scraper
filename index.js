const ogs = require('open-graph-scraper')
const express = require('express')
const app = express()

app.use(express.json({ extended: false }))

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.get('/', function (req, res) {
  if (req.query['url']) {
    const siteUrl = req.query['url']
    const options = {
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

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
