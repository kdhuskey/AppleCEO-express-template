const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const ceos = require('./data')
const data = require('./data')

const hostname = 'localhost'
const port = 3001

const app = express()
const server = http.createServer(app)

//template engine config
app.engine('html', es6Renderer) //register es6Renderer as the html  template engine
app.set('views', 'templates')  //set 'views' setting to look in 'templates' folder
app.set('view engine', 'html') //set default 'view engine' to the one registered for html
const partials = {
    head: 'partials/head',
    foot: 'partials/foot'
}
//public static
app.use(express.static('./public'))


//routes......
app.get('/', function(req, res){
    res.render('home', {
        partials,
    })
})

app.get('/ceos', function(req, res){
    res.render('ceo-list',{
        partials,
        locals: {
            ceos
        }
    })
})

app.get('/ceos/:slug', function(req, res){
    const renderedSlug = ceos.find(s => s.slug === req.params.slug)
    // console.log(renderedSlug)
    if (!renderedSlug){
        res.status(404).send(`Error, could not find a ceo with slug of: ${req.params.slug} `)
        return
    }
    res.render('ceo-details', {
        partials,
        locals: {
            renderedSlug
        }
    })
})

  app.get("/search", (req, res) => {
    let search = req.query.name
    let name = ceos.find(s => s.name.toLowerCase().includes(search.toLowerCase()))
    if (!name){
        res.status(404).send(`There's never been a CEO at Apple with the name: ${search}`)
        return
    }
    res.render(`search`, {
        partials,
        locals: {
            name
            
        }
    });
  });


 



//tell server to start listening 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })