import request from 'postman-request'

const geocode = (address, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoibWFub2ppdC1jaGFrcmFib3J0eSIsImEiOiJjbTlmbDVrODUxNWRlMmxwcXZpbXczcTg4In0.RYEO_9t3u1yAAgPJeMLkxg&country=IN&autocomplete=false&limit=1`

    request({url: geoCodeUrl, json: true}, (error, body, {features}) => {
        if(error)
        {
            callback('Unable to connect to location services', undefined)
        }
        else if(features.length === 0)
        {
            callback("Could not find the location that you are searching for, please provide a valid location")
        }
        else
        {
            callback(undefined, {
                latitude: features[0].geometry.coordinates[1],
                longitude: features[0].geometry.coordinates[0],
                location: features[0].properties.full_address
            })
        }
    })
}

export default geocode