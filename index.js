const express = require('express')
const ejs = require('ejs')
var cookieParser = require('cookie-parser')
const fs = require('fs')

let app = express()
app.enable('trust proxy')

const port = 20002
const avatarURL = "https://cdn.discordapp.com/avatars/329353232570908682/7520f342b875b14860ff1ffa5532805f.webp?size=256"
const defaultStartColour = "c33764"
const defaultEndColour = "1d2671"

app.use(express.static('public'))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log("[Pterodactyl] Ready")
    console.log(`Now Listening on port ${port}`)
})

app.get('/', function (req, res) {
    const page = require(`./views/pages/index.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})

app.get('/extra', function (req, res) {
    const page = require(`./views/pages/extra.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})

app.get('/test', function (req, res) {
    const page = require(`./views/pages/test.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})

app.get('/rgb', function (req, res) {
    const page = require(`./views/pages/rgb.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})

app.get('/projects', function (req, res) {
    const page = require(`./views/pages/projects.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})

app.get('/projects/:project', function (req, res) {
    var colourData = getColourData(req)
    if(fs.existsSync(`./views/pages/projects/${req.params.project}.json`)){
        const page = require(`./views/pages/projects/${req.params.project}.json`)
        page.avatarURL = avatarURL
        page.colourData = colourData
        page.dismissed = req.cookies["Commission"] == "dismissed"
        res.render('pages/page', page)
    }else{
        const page = require('./views/pages/404.json')
        page.avatarURL = avatarURL
        page.colourData = colourData
        page.dismissed = req.cookies["Commission"] == "dismissed"
        res.render('pages/page', page)
    }
    
})

function getColourData(req){
    let startColour = defaultStartColour
    let endColour = defaultEndColour

    if (req.query.startColour){
        startColour = req.query.startColour.toLocaleLowerCase()
    }

    if (req.query.endColour){
        endColour = req.query.endColour.toLocaleLowerCase()
    }

    var colourData = {}
    colourData.startColour = startColour
    colourData.endColour = endColour

    if ((req.query.endColour == undefined) && (req.query.startColour == undefined)){
        colourData.different = false
    }else{
        colourData.different = true
    }

    return colourData
}

app.get('*', function (req, res) {
    const page = require('./views/pages/404.json')
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    page.dismissed = req.cookies["Commission"] == "dismissed"
    res.render('pages/page', page)
})