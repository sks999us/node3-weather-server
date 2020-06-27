request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=74216c1da5b35fbaefe5f8b64a4c30e6&query='+ latitude+','+longitude
    request({ url, json: true},(error, {body}={}) => {

        if (error){
            //console.log("Error occured....")
            callback("Error occured....")
        } else if(body.error) {
            //console.log("API bad response = " + response.body.error.code) 
            callback("API bad response = " + body.error.code)   
        } else {

            callback(undefined,body.current)
        }
        
    })

}




module.exports = forecast