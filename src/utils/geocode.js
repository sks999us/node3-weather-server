
request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmNzOTk5dXMiLCJhIjoiY2tibjk1YmNmMHgwajJ2bzZ1aWQ4ajQ0OCJ9.qBaboPJXGEc6xVRZy5wEKg'
    request({ url, json: true},(error, {body}={}) => {

        if (error){
            //console.log("Error occured....")
            callback("Hard Error")
        } else if(body.features.length === 0) {
            //console.log("Bad address response NO RESULTS" )
            callback("Bad address response NO RESULTS")
        } else {
            const data = body.features[0].center
            const longitude = data[0]
            const  latitude = data[1]
            //console.log('latitude  = ' + latitude)
            //console.log('longitude = ' + longitude)
            callback(undefined, {
                'latitude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    
    })

}




module.exports = geocode