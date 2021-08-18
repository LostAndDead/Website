const express = require('express')
const ejs = require('ejs')
const fs = require('fs')

let app = express()
app.enable('trust proxy')

const port = 20002
const avatarURL = "https://cdn.discordapp.com/avatars/329353232570908682/7520f342b875b14860ff1ffa5532805f.webp?size=256"
const defaultStartColour = "c33764"
const defaultEndColour = "1d2671"

const projects = [
    {
        title: "League Bot",
        path: "league-bot",
        description: [
            "A Discord bot designed for tracking competitive leagues for any kind of game.", 
            "Self hostable and customisable as much as you wish.",
            "",
            "Was initaly designed for my Dad and his many VR golfing endevors but has since been adapted to work with most games."
        ],
        icon: "fas fa-trophy",
        links: [
            {
                title: "Source Code",
                link: "https://github.com/LostAndDead/League-Bot",
                icon: "fab fa-github"
            }
        ],
        closed: false
    },{
        title: "Mighty CocoBot",
        path: "mighty-coco-bot",
        description: [
            "A Discord bot designed for the Walkabout Mini Golf server for tracking high scores",
            "and starting hourly matches for people to join.",
            "This was my first project for a massivly public system. It went rather well and is still running good."
        ],
        icon: "fas fa-robot",
        links: [
            {
                title: "Walkabout Mini Golf",
                link: "https://www.mightycoconut.com/minigolf",
                icon: "fas fa-gamepad"
            },
            {
                title: "Source Code",
                link: "https://github.com/LostAndDead/Mighty-CocoBot",
                icon: "fab fa-github"
            }
        ],
        closed: false
    },{
        title: "Custom Capes",
        path: "custom-capes",
        description: [
            "Custom Capes was a project I worked on to allow everyone and anyone to get a custom cape in Minecraft", 
            "it was closed due to many well established rivals already existing and a lack of motivation.",
            "All source code has since been purged from our systems and the internet"
        ],
        icon: "fas fa-wind",
        links: [ ],
        closed: true
    }
]

app.use(express.static('public'))

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
    res.render('pages/page', page)
})

app.get('/extra', function (req, res) {
    const page = require(`./views/pages/extra.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    res.render('pages/page', page)
})

app.get('/test', function (req, res) {
    const page = require(`./views/pages/test.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    res.render('pages/page', page)
})

app.get('/rgb', function (req, res) {
    const page = require(`./views/pages/rgb.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    res.render('pages/page', page)
})

app.get('/projects', function (req, res) {
    const page = require(`./views/pages/projects.json`)
    var colourData = getColourData(req)
    page.avatarURL = avatarURL
    page.colourData = colourData
    res.render('pages/page', page)
})

app.get('/projects/:project', function (req, res) {
    var colourData = getColourData(req)
    if(fs.existsSync(`./views/pages/projects/${req.params.project}.json`)){
        const page = require(`./views/pages/projects/${req.params.project}.json`)
        page.avatarURL = avatarURL
        page.colourData = colourData
        res.render('pages/page', page)
    }else{
        const page = require('./views/pages/404.json')
        page.avatarURL = avatarURL
        page.colourData = colourData
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
    res.render('pages/page', page)
})