import path from 'path'
import express from "express"
import hbs from "hbs"

const __dirname = path.resolve()
//console.log("Path.resolve: " + __dirname)
 
const publicDirectoryPath = path.join(__dirname, '/public')
//console.log("public dir: " + publicDirectoryPath)

const viewPath= path.join(__dirname, '/templates/views')
//console.log("viewPath: " + viewPath)
const partialsPath= path.join(__dirname, '/templates/partials')
//console.log("partialsPath: " + partialsPath)

const app = express()
const port = process.env.PORT || 3000

//This is to serve all pages from public
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
console.log('viewPATH ' + viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page Header',
        name: 'Nicholas Ngo'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page Header ',
        name: 'Nicholas Ngo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page Header',
        name: 'Nicholas Ngo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to search'
        })
    }
    const target_address = req.query.address

    res.send({
        forcast: 'It is snowing',
        location: req.query.address 
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term' 
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicholas Ngo',
        errorMessage: 'Help Artical NOT FOUND !!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicholas Ngo',
        errorMessage: 'Page NOT FOUND !!!'
    })
})

 app.listen(port, () => {
     console.log('Server is up on port: ' + port)
 })