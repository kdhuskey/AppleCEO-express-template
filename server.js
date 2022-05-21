const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')

const hostname = 'localhost'
const port = 3000

const app = express()
const server = http.createServer(app)

//template engine config
app.engine('html', es6Renderer) //register es6Renderer as the html  template engine
app.set('views', 'templates')  //set 'views' setting to look in 'templates' folder
app.set('view engine', 'html') //set default 'view engine' to the one registered for html

app.use(express.static('./public'))


app.get('/', function(req, res){
    res.render('home')
})





 



//tell server to start listening 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })