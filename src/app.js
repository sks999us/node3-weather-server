const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()



app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

app.get('', (req,res) => {
    res.render('index',{
        title: "Index title",
        name: "Salil"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        aboutText: " About weather project version 1.0.0",
    title: "About title",
    name: " Salil"
})
})

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: "No Address provided"
        })

    }

    geocode(req.query.address,(error,{latitude, longitude, location}={}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.weather_descriptions,
                location,
                address: req.query.address
            })


        })


        
    })

})

app.get('/help', (req,res) => {
    res.render('help',{
        help:"This page give weather about a place that you select",
        title: "Help title",
        name: " Salil "
    })
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Error Page",
        errorMsg: "Help not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
    title: "Error Page",
    errorMsg: "Help not found"
})
})