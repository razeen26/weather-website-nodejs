const request = require("postman-request")

const map_box_token = 'pk.eyJ1IjoicmF6ZWVuYW1hbiIsImEiOiJja3dvcnBsanowNXJmMnBwNnFmcGFpZDNzIn0.H6HXHvlXIG--7oyxy0dEHg';
const geocode = function(address,callback){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token="+map_box_token+"&limit=1"
    request({url:url , json:true}, function(error,response){
        if(error){
            callback("Unable to connect to location services!",undefined)
        }else if(response.body.features.length === 0){
            callback("Unable to find location.Try another search",undefined)
        }else{
            callback(undefined,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })

}



module.exports = geocode


